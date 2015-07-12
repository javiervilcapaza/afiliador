package com.jvjsoftware.afiliador.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Usuario;
import com.jvjsoftware.afiliador.service.PerfilService;
import com.jvjsoftware.afiliador.service.UsuarioService;



@Controller
@RequestMapping("seguridad/usuario/")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private PerfilService perfilService;
	
	
	
	private static final Logger log = LoggerFactory
			.getLogger(PerfilController.class);

	@RequestMapping(value = "lista")
	public String usuarioLista(Locale locale, Model model, HttpSession session,
			String info) {
		
		log.info("[Controller] UsuarioController -> lista de usuarios");

		List<Usuario> usuario = new ArrayList<Usuario>();

		usuario = usuarioService.listaUsuarios();

		model.addAttribute("usuarios", usuario);
		model.addAttribute("info", info);

		return "seguridad/usuarios";

	}

	@RequestMapping(value = "buscar")
	public String usuarioBusqueda(Locale locale, Model model,
			HttpSession session, String username, Integer estado) {

		List<Usuario> usuario = new ArrayList<Usuario>();
		if (!username.equals("") || estado != null) {
			usuario = usuarioService.busqueda(username, estado);
		}
		model.addAttribute("usuarios", usuario);

		return "seguridad/usuariosBusqueda";

	}

	@RequestMapping(value = "formulario")
	public String usuarioFormulario(Locale locale, Model model,
			HttpSession session, Integer idUsuario) {

		List<Perfil> perfiles = new ArrayList<Perfil>();

		perfiles = perfilService.listaPerfiles();

		if (idUsuario != null) {

			Usuario usuario = usuarioService.buscarPorId(idUsuario);

			List<String> perfilesAsignados = new ArrayList<String>();

			if (usuario.getPerfil() != null) {
				for (Perfil perfil : usuario.getPerfil()) {
					perfilesAsignados.add(perfil.getNombrePerfil());
				}
			}
			
			if (!perfilesAsignados.isEmpty()) {
				String perfil = perfilesAsignados.get(0);
				model.addAttribute("perfil", perfil);
			}
			
			model.addAttribute("usuario", usuario);
		}

		model.addAttribute("perfiles", perfiles);
		return "seguridad/usuarioFormulario";

	}

	@RequestMapping(value = "guarda")
	public @ResponseBody
	String usuarioGuarda(Locale locale, Model model, HttpSession session,
			String username, String clave, Integer estado, Integer perfil,
			Integer idUsuario, Integer idEmpleado) {

		Usuario usuario;

		if (idUsuario != null) {
			usuario = usuarioService.buscarPorId(idUsuario);
		} else {
			usuario = new Usuario();
			
			if(usuarioService.campoUnicoUsername(username)!=0){
				return "No se ha podido guardar";
			}
			Date fechaRegistro = new Date();
			usuario.setFechaRegistro(fechaRegistro);
		}

		Perfil perfilUsuario = new Perfil();
		perfilUsuario = perfilService.buscarPorId(perfil);
		List<Perfil> perfiles = new ArrayList<Perfil>();
		perfiles.add(perfilUsuario);

		usuario.setUsername(username);
		short est = estado.shortValue();
		usuario.setEstado(est);
		usuario.setPassword(clave);
		usuario.setPerfil(perfiles);

		usuarioService.guardaUsuario(usuario);


		
		
		
		return "Guardado Exitosamente";

	}
	
//	@RequestMapping(value = "/buscaEmpleado", method = RequestMethod.GET)
//	public @ResponseBody List<Map<String,Object>> estado(@RequestParam String term) {
//		return usuarioService.autocompleteEmpleado(term);
//	}

	@RequestMapping(value = "eliminar")
	public @ResponseBody
	Integer usuarioEliminar(Locale locale, Model model, HttpSession session,
			Integer idUsuario) {

		try {
			return usuarioService.eliminarUsuario(idUsuario);
		} catch (Exception e) {
			
			return -1;
		}

	}

	@RequestMapping(value = "cambiaEstado")
	public @ResponseBody
	String usuarioDesactivar(Locale locale, Model model, HttpSession session,
			Integer idUsuario, Integer estado) {

		Usuario usuario = usuarioService.buscarPorId(idUsuario);

		short est = estado.shortValue();
		usuario.setEstado(est);

		usuarioService.guardaUsuario(usuario);

		String estadoString;

		if (estado == 1) {
			estadoString = "Activado";
		} else {
			estadoString = "desactivado";
		}

		return "El usuario"+ usuario.getUsername() + ", fue " + estadoString;

	}

}