package com.jvjsoftware.afiliador.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ConstantException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.jvjsoftware.afiliador.domain.Afiliado;
import com.jvjsoftware.afiliador.domain.Persona;
import com.jvjsoftware.afiliador.domain.Usuario;
import com.jvjsoftware.afiliador.service.AfiliadoService;
import com.jvjsoftware.afiliador.service.UsuarioService;
import com.jvjsoftware.afiliador.service.UsuarioServiceImpl;
import com.jvjsoftware.afiliador.transfer.AfiliadoDTO;
import com.jvjsoftware.afiliador.transfer.AuditoriaDTO;
import com.jvjsoftware.afiliador.transfer.BuscaAfiliadoDTO;
import com.jvjsoftware.afiliador.transfer.PaginacionDTO;
import com.jvjsoftware.afiliador.utils.Config;
import com.jvjsoftware.afiliador.utils.Constantes;
import com.jvjsoftware.afiliador.utils.Encrypt;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */
@Controller
@RequestMapping("/afiliado/")
public class AfiliadoController {

	Logger log = Logger.getLogger(AfiliadoController.class.getName());

	@Autowired
	private AfiliadoService afiliadoService;

	@Autowired
	private UsuarioService usuarioService;

	@RequestMapping(value = "datosAfiliado")
	@ResponseBody
	public AfiliadoDTO datosAfiliado(Integer idAfiliado) {
		return afiliadoService.datosAfiliado(idAfiliado);
	}

	@ResponseBody
	@RequestMapping(value = "asociarUsuario")
	public AfiliadoDTO asociarUsuario(Usuario usuario, Integer idAfiliado) {
		return afiliadoService.asociarUsuario(usuario, idAfiliado);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "principal")
	public String principalAfiliado(Model model, String info) {
		log.info("[Controller] Afiliado Controller -> Principal");
		model.addAttribute("info", info);

		UserDetails userDetails = obtenerUsuarioSesion();
		Usuario usuario = usuarioService.session(userDetails.getUsername());
		Afiliado afiliadoSession = afiliadoService.buscarAfiliadoPorUsuario(usuario.getId());
		Map<String, Object> mapMultinivel = afiliadoService.listaAfiliadoMultinivel(afiliadoSession.getId(), 2);

		List<Usuario> usuarios = (List<Usuario>) mapMultinivel.get("afiliados");

		String idLink = "";

		try {
			idLink = Encrypt.encrypt("hola", afiliadoSession.getId().toString());
		} catch (Exception e) {
			log.info("Error al obtener el ID encriptado del afiliado: " + e.getMessage());
		}

		model.addAttribute("idLink", Config.getPropiedad("url.afiliarse").concat(idLink));
		model.addAttribute("afiliados", new Gson().toJsonTree(usuarios));
		model.addAttribute("totalNiveles", mapMultinivel.get("totalNiveles"));
		model.addAttribute("totalGanancias", mapMultinivel.get("totalGanancias"));
		model.addAttribute("totalProyeccion", mapMultinivel.get("totalProyeccion"));

		return "afiliado/principalAfiliado";
	}
	
	@RequestMapping(value = "lista")
	public String listaAfiliado(Model model, String info) {
		log.info("[Controller] Afiliado Controller -> Lista");
		model.addAttribute("info", info);

		UserDetails userDetails = obtenerUsuarioSesion();
		boolean esAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));

		if (esAdmin) {
			return "afiliado/listaAfiliado";
		} else {
			return "afiliado/listaAfiliadoUsuario";
		}
	}

	@RequestMapping(value = "listaJson")
	private @ResponseBody
	Map<String, Object> listaJson(PaginacionDTO paginacion, BuscaAfiliadoDTO busqueda) {

		log.info("[Controller] Afiliado Controller -> Lista Json");

		if (paginacion.getiDisplayLength() == null) {
			return null;
		}

		UserDetails userDetails = obtenerUsuarioSesion();
		boolean esAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));

		if (!esAdmin) {
			Usuario usuario = usuarioService.session(userDetails.getUsername());
			Afiliado afiliadoSession = afiliadoService.buscarAfiliadoPorUsuario(usuario.getId());
			busqueda.setAfiliadoPadre(afiliadoSession.getId());
		}

		List<Afiliado> listAfiliados = afiliadoService.listaJsonAfiliado(paginacion, busqueda);
		Number total = afiliadoService.totalListaJsonAfiliado(busqueda);

		Map<String, Object> datos = new HashMap<String, Object>();
		datos.put("sEcho", paginacion.getsEcho());
		datos.put("iTotalRecords", total);
		datos.put("iTotalDisplayRecords", total);

		List<String[]> listas = new ArrayList<String[]>();

		for (Afiliado afiliado : listAfiliados) {

			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
			String acciones = "<div class='btn-group'>";
			if (afiliado.getUsuario() == null) {
				acciones = "<button class='btn btn-primary btn-sm' onclick=\"asociarAfiliado('" + afiliado.getId() + "')\">Asociar Usuario</button>";
			}
			acciones += "<button class='btn btn-default btn-sm' onclick=\"editarAfiliado('" + afiliado.getId() + "')\">" + "editar</button>"
					+ "<button class='btn btn-danger btn-sm' onclick=\"eliminarAfiliado('" + afiliado.getId() + "')\">eliminar</button></div>";

			if (esAdmin) {
				String[] aaDato = { afiliado.getPersona().getDni(), afiliado.getPersona().getApellidos() + ", " + afiliado.getPersona().getNombres(),
						format.format(afiliado.getFechaCreacion()), botonEstado(afiliado), acciones };
				listas.add(aaDato);
			} else {
				String[] aaDato = { afiliado.getPersona().getDni(), afiliado.getPersona().getApellidos() + ", " + afiliado.getPersona().getNombres(),
						format.format(afiliado.getFechaCreacion())};
				listas.add(aaDato);
			}
		}

		datos.put("aaData", listas);
		datos.put("esAdmin", esAdmin);

		return datos;
	}
	
	
	@RequestMapping(value = "listaPuntos")
	public String listaAfiliadoPuntos(Model model, String info) {
		log.info("[Controller] Afiliado Controller -> Lista Puntos");
		model.addAttribute("info", info);
		
		return "afiliado/listaAfiliadoPuntos";
		
	}
	
	@RequestMapping(value = "listaPuntosJson")
	private @ResponseBody
	Map<String, Object> listaPuntosJson(PaginacionDTO paginacion, BuscaAfiliadoDTO busqueda) {

		log.info("[Controller] Afiliado Controller -> Lista Puntos Json");

		if (paginacion.getiDisplayLength() == null) {
			return null;
		}

		UserDetails userDetails = obtenerUsuarioSesion();
		boolean esAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));

		List<Afiliado> listAfiliados = afiliadoService.listaJsonAfiliado(paginacion, busqueda);
		Number total = afiliadoService.totalListaJsonAfiliado(busqueda);

		Map<String, Object> datos = new HashMap<String, Object>();
		datos.put("sEcho", paginacion.getsEcho());
		datos.put("iTotalRecords", total);
		datos.put("iTotalDisplayRecords", total);

		List<String[]> listas = new ArrayList<String[]>();

		for (Afiliado afiliado : listAfiliados) {

			SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
			String acciones = "<div class='btn-group'>";
			acciones += "<button class='btn btn-default btn-sm' onclick=\"puntos(" + afiliado.getId() + ",1)\"><i class='fa fa-fw fa-chevron-up'></i></button>"
					+ "<button class='btn btn-danger btn-sm' onclick=\"puntos(" + afiliado.getId() + ",0)\"><i class='fa fa-fw fa-chevron-down'></i></button></div>";
			
			
			String puntos = "<div id='"+afiliado.getId()+"'>"+afiliado.getPuntos().toString()+"</div>"; 

			String[] aaDato = { 
					afiliado.getPersona().getDni(), 
					afiliado.getPersona().getApellidos() + ", " + afiliado.getPersona().getNombres(),
					format.format(afiliado.getFechaCreacion()),
					puntos,
					acciones };
				listas.add(aaDato);
		}

		datos.put("aaData", listas);
		datos.put("esAdmin", esAdmin);

		return datos;
	}
	
	@RequestMapping(value="puntos")
	@ResponseBody
	public Integer guardaPuntos(Integer idAfiliado,Integer punto){
		Integer respuesta = 0;
		respuesta  = afiliadoService.puntos(idAfiliado, punto);
		return respuesta;
	}



	private String botonEstado(Afiliado afiliado) {
		StringBuffer estado = new StringBuffer();
		String btnEstado = "btn-default";
		String estadoInverso = Constantes.ESTADO_INACTIVO;
		String textoEstado = "Activo";

		if (afiliado.getEstado().equals(Constantes.ESTADO_INACTIVO)) {
			btnEstado = "btn-danger";
			estadoInverso = Constantes.ESTADO_ACTIVO;
			textoEstado = "Inactivo";
		}

		estado.append("<button class='btn ");
		estado.append(btnEstado);
		estado.append(" btn-sm' onclick=\"cambiaEstado('");
		estado.append(afiliado.getId().toString());
		estado.append("','");
		estado.append(estadoInverso);
		estado.append("')\">" + textoEstado + "</button>");
		return estado.toString();
	}

	@RequestMapping(value = "formularioAfiliado")
	public String formularioAfiliado(Model model, String info, Integer idAfiliado) {
		log.info("[Controller] Afiliado Controller -> Formulario Afiliado");

		UserDetails userDetails = obtenerUsuarioSesion();
		boolean esAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));

		if (idAfiliado != null) {
			model.addAttribute("afiliado", afiliadoService.buscaAfiliadoPorId(idAfiliado));
		}
		model.addAttribute("esAdmin", esAdmin);

		return "afiliado/formularioAfiliado";
	}

	@RequestMapping(value = "guardaAfiliado")
	public @ResponseBody
	Integer guardaFormulario(Afiliado afiliado, String fechaNacimiento, Integer idTipoIdentificacion) throws ParseException {
		log.info("[Controller] Afiliado Controller -> Guarda Afiliado");

		UserDetails userDetails = obtenerUsuarioSesion();

		AuditoriaDTO auditoriaDTO = new AuditoriaDTO();
		auditoriaDTO.setFechaCreacion(new Date());

		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		afiliado.getPersona().setFechaNacimiento(format.parse(fechaNacimiento));

		return afiliadoService.guarda(afiliado, auditoriaDTO, userDetails);
	}

	private UserDetails obtenerUsuarioSesion() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		return userDetails;
	}

	@RequestMapping(value = "cambiaEstado")
	public @ResponseBody
	String verAfiliado(Model model, String info, Integer id, String estado) {
		log.info("[Controller] Afiliado Controller -> Cambia Estado Afiliado");
		return afiliadoService.cambiaEstado(id, estado);
	}

	@RequestMapping(value = "/autocompleteAfiliado", method = RequestMethod.GET)
	public @ResponseBody
	List<Map<String, Object>> clienteAutocomplete(@RequestParam String term) {
		return afiliadoService.autocompletePrincipal(term);
	}
	
	@RequestMapping(value = "/restableceAfiliados")
	@ResponseBody
	public Integer restableceAfiliados(){
		return afiliadoService.restablecePuntos();
	}
}
