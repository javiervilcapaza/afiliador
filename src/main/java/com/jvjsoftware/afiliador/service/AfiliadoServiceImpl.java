package com.jvjsoftware.afiliador.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jvjsoftware.afiliador.dao.AfiliadoDAO;
import com.jvjsoftware.afiliador.dao.ConfiguracionDAO;
import com.jvjsoftware.afiliador.dao.PerfilDAO;
import com.jvjsoftware.afiliador.dao.PersonaDAO;
import com.jvjsoftware.afiliador.dao.UsuarioDAO;
import com.jvjsoftware.afiliador.domain.Afiliado;
import com.jvjsoftware.afiliador.domain.Configuracion;
import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Persona;
import com.jvjsoftware.afiliador.domain.Usuario;
import com.jvjsoftware.afiliador.transfer.AfiliadoDTO;
import com.jvjsoftware.afiliador.transfer.AuditoriaDTO;
import com.jvjsoftware.afiliador.transfer.BuscaAfiliadoDTO;
import com.jvjsoftware.afiliador.transfer.EnvioEmail;
import com.jvjsoftware.afiliador.transfer.PaginacionDTO;
import com.jvjsoftware.afiliador.utils.Config;
import com.jvjsoftware.afiliador.utils.Constantes;
import com.jvjsoftware.afiliador.utils.Multinivel;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */
@Service("AfiliadoService")
public class AfiliadoServiceImpl implements AfiliadoService {

	@Autowired
	private AfiliadoDAO afiliadoDAO;

	@Autowired
	private PersonaDAO personaDAO;

	@Autowired
	private UsuarioDAO usuarioDAO;

	@Autowired
	private PerfilDAO perfilDAO;

	@Autowired
	private EnviarEmail EnviarEmail;

	@Autowired
	private ConfiguracionDAO configuracionDAO;

	Logger log = Logger.getLogger(AfiliadoService.class.getName());

	@Override
	@Transactional
	public Integer guarda(Afiliado afiliado, AuditoriaDTO auditoriaBean, UserDetails userDetails) {
		Integer respuesta = 0;
		Persona persona;
		try {

			boolean esAdmin = false;

			if (userDetails != null) {
				esAdmin = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
			}

			if (!esAdmin) {
				Usuario usuario = usuarioDAO.buscaUsuario(userDetails.getUsername());
				Afiliado afiliadoSession = afiliadoDAO.buscarAfiliadoPorUsuario(usuario.getId());
				afiliado.setAfiliadoPadre(afiliadoSession.getId());
			}

			if (afiliado.getId() != null) {
				Afiliado afiliadoPorActualizar = afiliadoDAO.get(afiliado.getId());
				persona = afiliadoPorActualizar.getPersona();
				persona.setApellidos(afiliado.getPersona().getApellidos());
				persona.setDireccion(afiliado.getPersona().getDireccion());
				persona.setDni(afiliado.getPersona().getDni());
				persona.setSexo(afiliado.getPersona().getSexo());
				persona.setFechaNacimiento(afiliado.getPersona().getFechaNacimiento());
				persona.setEstadoCivil(afiliado.getPersona().getEstadoCivil());
				persona.setNombres(afiliado.getPersona().getNombres());
				persona.setTelefono(afiliado.getPersona().getTelefono());
				personaDAO.guardar(persona);
				afiliadoPorActualizar.setPersona(persona);
				afiliadoPorActualizar.setAfiliadoPadre(afiliado.getAfiliadoPadre());
				afiliadoPorActualizar.setFechaActualizacion(auditoriaBean.getFechaActualizacion());
				afiliadoPorActualizar.setUsuarioActualizacion(auditoriaBean.getUsuarioActualizacion());
				afiliadoPorActualizar.setEstado(afiliado.getEstado());
				afiliadoDAO.guardar(afiliadoPorActualizar);
			} else {
				persona = new Persona();
				persona.setApellidos(afiliado.getPersona().getApellidos());
				persona.setDireccion(afiliado.getPersona().getDireccion());
				persona.setDni(afiliado.getPersona().getDni());
				persona.setEstadoCivil(afiliado.getPersona().getEstadoCivil());
				persona.setNombres(afiliado.getPersona().getNombres());
				persona.setTelefono(afiliado.getPersona().getTelefono());
				persona.setSexo(afiliado.getPersona().getSexo());
				persona.setFechaNacimiento(afiliado.getPersona().getFechaNacimiento());
				personaDAO.guardar(persona);
				afiliado.setPersona(persona);
				afiliado.setFechaCreacion(auditoriaBean.getFechaCreacion());
				afiliado.setUsuarioCreacion(auditoriaBean.getUsuarioInsercion());
				afiliadoDAO.guardar(afiliado);
			}
			respuesta = 1;
		} catch (Exception e) {
			log.info("Error al guardar Afiliado: " + e.getMessage());
		}
		return respuesta;
	}

	@Override
	public List<Afiliado> listaAfiliados(Integer idAfiliado) {
		return afiliadoDAO.listaAfiliados(idAfiliado);
	}

	@Override
	public Map<String, Object> listaAfiliadoMultinivel(Integer idAfiliado, Integer nivel) {
		Map<String, Object> respuesta = new HashMap<String, Object>();
		List<Integer> listAfiliadoPadre = new ArrayList<Integer>();
		List<Integer> listAfiliadoPadreNuevo = new ArrayList<Integer>();
		List<Multinivel> listaAfiliadoMultinivel = new ArrayList<Multinivel>();
		List<Map<String, Object>> totalNiveles = new ArrayList<Map<String, Object>>();
		double totalGanancia = 0L;
		double totalProyeccion = 0L;
		Configuracion configuracion = configuracionDAO.get(Constantes.ID_CONFIGURACION);
		listAfiliadoPadre.add(idAfiliado);

		Integer i = 1;
		Integer id = 1;
		while (i <= nivel + 1) {
			listAfiliadoPadreNuevo.addAll(listAfiliadoPadre);
			// vaciamos la lista
			listAfiliadoPadre.clear();
			// seteamos la cantidad de afiliados de nivel
			respuesta.put("nivel-" + i.toString(), listAfiliadoPadre.size());

			if (i != 1) {
				Map<String, Object> totalNivel = new HashMap<String, Object>();
				totalNivel.put("nivel", i - 1);
				totalNivel.put("total", listAfiliadoPadreNuevo.size());
				totalGanancia += totalGanancias(listAfiliadoPadreNuevo, i - 1);
				if (i - 1 == 1) {
					totalProyeccion += listAfiliadoPadreNuevo.size() * configuracion.getComision1();
				}
				if (i - 1 == 2) {
					totalProyeccion += listAfiliadoPadreNuevo.size() * configuracion.getComision2();
				}

				totalNiveles.add(totalNivel);
			}

			for (Integer j : listAfiliadoPadreNuevo) {

				Afiliado afiliado = afiliadoDAO.get(j);
				Integer idParent = id;

				if (idAfiliado == afiliado.getId()) {
					idParent = 0;
				} else {
					idParent = afiliado.getAfiliadoPadre();
				}

				Multinivel multinivel = new Multinivel(afiliado.getId(), idParent, nombrePersonaMultinivel(afiliado));
				listaAfiliadoMultinivel.add(multinivel);
				List<Afiliado> listAfiliado = afiliadoDAO.listaAfiliados(j);

				for (Afiliado afiliadoDependiente : listAfiliado) {
					listAfiliadoPadre.add(afiliadoDependiente.getId());
				}
			}
			listAfiliadoPadreNuevo.clear();
			i++;
		}

		respuesta.put("configuracion", configuracion);
		respuesta.put("totalGanancias", totalGanancia);
		respuesta.put("totalProyeccion", totalProyeccion);
		respuesta.put("afiliados", listaAfiliadoMultinivel);
		respuesta.put("totalNiveles", totalNiveles);
		return respuesta;
	}

	private String nombrePersonaMultinivel(Afiliado afiliado) {
		String nombrePersona = "";

		Configuracion configuracion = configuracionDAO.get(1);
		Calendar fechaUltimaRestablecida = Calendar.getInstance();
		fechaUltimaRestablecida.setTime(configuracion.getUltimaFechaRestablecida());

		Calendar fechaRestablecida = Calendar.getInstance();
		if (afiliado.getFechaRestablece() == null) {
			fechaRestablecida.setTime(afiliado.getFechaCreacion());
		} else {
			fechaRestablecida.setTime(afiliado.getFechaRestablece());
		}

		if (fechaRestablecida.after(fechaUltimaRestablecida)) {
			nombrePersona = afiliado.getPersona().getNombres();
		} else if (fechaRestablecida.before(fechaUltimaRestablecida)) {
			nombrePersona = "<font color='red'>" + afiliado.getPersona().getNombres() + "</font>";
		} else if (!fechaRestablecida.after(fechaUltimaRestablecida) && !fechaRestablecida.before(fechaUltimaRestablecida)) {
			nombrePersona = afiliado.getPersona().getNombres();
		}

		/*
		 * if(afiliado.getFechaRestablece()!=null){ Calendar fechaRestablece =
		 * Calendar.getInstance();
		 * fechaRestablece.setTime(afiliado.getFechaRestablece()); Date hoy =
		 * new Date();
		 * 
		 * final long MILLSECS_PER_DAY = 24 * 60 * 60 * 1000; Integer
		 * diferenciaDias = (int) (hoy.getTime() -
		 * afiliado.getFechaRestablece().getTime() / MILLSECS_PER_DAY); Integer
		 * diasPermitidos =
		 * Integer.parseInt(Config.getPropiedad("maximo.dias.puntuacion"));
		 * 
		 * 
		 * if( diferenciaDias > diasPermitidos){ nombrePersona =
		 * "<font color='red'>"+afiliado.getPersona().getNombres()+"</font>";
		 * }else{ nombrePersona = afiliado.getPersona().getNombres(); } }else{
		 * nombrePersona =
		 * "<font color='blue'>"+afiliado.getPersona().getNombres()+"</font>"; }
		 */

		return nombrePersona;
	}

	/**
	 * 
	 * @param listaAfiliado
	 * @param nivel
	 * @return
	 */
	private double totalGanancias(List<Integer> listaAfiliado, Integer nivel) {
		double respuesta = 0L;
		Configuracion configuracion = configuracionDAO.get(Constantes.ID_CONFIGURACION);
		for (Integer idAfiliado : listaAfiliado) {
			Afiliado afiliado = afiliadoDAO.get(idAfiliado);
			if (afiliado != null && afiliado.getPuntos() != null && afiliado.getPuntos() > 0) {
				respuesta += afiliado.getPuntos();
			}
		}
		if (nivel == 1) {
			respuesta = respuesta * configuracion.getComision1();
		}
		if (nivel == 2) {
			respuesta = respuesta * configuracion.getComision2();
		}
		return respuesta;
	}

	@Override
	public List<Afiliado> listaJsonAfiliado(PaginacionDTO paginacion, BuscaAfiliadoDTO busqueda) {
		return afiliadoDAO.listaJson(paginacion, busqueda);
	}

	@Override
	public Number totalListaJsonAfiliado(BuscaAfiliadoDTO busqueda) {
		return afiliadoDAO.totalListaJson(busqueda);
	}

	@Override
	public Afiliado buscaAfiliadoPorId(Integer idAfiliado) {
		return afiliadoDAO.get(idAfiliado);
	}

	@Override
	@Transactional
	public String cambiaEstado(Integer id, String estado) {
		String respuesta = Constantes.NO_ERR0R;
		try {
			Afiliado afiliado = afiliadoDAO.get(id);
			afiliado.setEstado(estado);
			afiliadoDAO.guardar(afiliado);
		} catch (Exception e) {
			e.printStackTrace();
			respuesta = "Error al cambiar estado";
		}

		return respuesta;
	}

	@Override
	public List<Map<String, Object>> autocompletePrincipal(String busca) {

		List<Afiliado> afiliados = afiliadoDAO.buscarAfiliado(busca);

		if (afiliados != null && afiliados.size() > 0) {
			List<Map<String, Object>> lista = new ArrayList<Map<String, Object>>();
			for (Afiliado afiliado : afiliados) {
				Map<String, Object> datos = new HashMap<String, Object>();
				datos.put("id", afiliado.getId());
				String nombre = afiliado.getPersona().getApellidos().toUpperCase() + ", " + afiliado.getPersona().getNombres();
				datos.put("label", nombre);
				datos.put("value", nombre);
				lista.add(datos);
			}
			return lista;
		}
		return null;
	}

	@Override
	public Afiliado buscarAfiliadoPorUsuario(Integer idUsuario) {
		return afiliadoDAO.buscarAfiliadoPorUsuario(idUsuario);
	}

	@Override
	public AfiliadoDTO datosAfiliado(Integer idAfiliado) {
		Afiliado afiliado = afiliadoDAO.get(idAfiliado);
		AfiliadoDTO afiliadoDTO = new AfiliadoDTO();

		try {
			afiliadoDTO.setApellidos(afiliado.getPersona().getApellidos());
			afiliadoDTO.setDireccion(afiliado.getPersona().getDireccion());
			afiliadoDTO.setDni(afiliado.getPersona().getDni());
			afiliadoDTO.setIdAfiliado(afiliado.getId());
			afiliadoDTO.setIdPersona(afiliado.getPersona().getId());
			afiliadoDTO.setNombres(afiliado.getPersona().getNombres());
			afiliadoDTO.setTelefono(afiliado.getPersona().getTelefono());
			if (afiliado.getUsuario() != null) {
				afiliadoDTO.setIdUsuario(afiliado.getUsuario().getId());
				afiliadoDTO.setUsername(afiliado.getUsuario().getUsername());
			}

		} catch (Exception e) {
			log.info("Error al obtener datos de afiliado: " + e.getMessage());
		}
		return afiliadoDTO;
	}

	@Override
	@Transactional
	public AfiliadoDTO asociarUsuario(Usuario usuario, Integer idAfiliado) {
		AfiliadoDTO afiliadoDTO = new AfiliadoDTO();
		try {
			usuario.setFechaRegistro(new Date());
			short estado = 1;
			usuario.setEstado(estado);
			Perfil perfil = perfilDAO.get(Constantes.ID_PERFIL_USUARIO);
			List<Perfil> listaPerfil = new ArrayList<Perfil>();
			listaPerfil.add(perfil);
			usuario.setPerfil(listaPerfil);
			usuarioDAO.guardar(usuario);

			afiliadoDTO.setIdUsuario(usuario.getId());
			Usuario usuarioGuardado = usuarioDAO.buscaUsuario(usuario.getUsername());
			Afiliado afiliado = afiliadoDAO.get(idAfiliado);
			afiliado.setUsuario(usuarioGuardado);
			afiliadoDAO.guardar(afiliado);

			// Envio de Correo
			EnvioEmail mail = new EnvioEmail();
			mail.setTitulo("Sistema Afiliador");
			mail.setContenido(contenidoEmail(usuario.getUsername(), usuario.getPassword()));
			List<String> listaDestinatario = new ArrayList<String>();
			listaDestinatario.add(usuario.getCorreo());
			mail.setDestinatario(listaDestinatario);
			EnviarEmail.enviarEmailMember(mail);

		} catch (Exception e) {
			log.info("Error al asociar usuario : " + e.getMessage());
			afiliadoDTO.setIdUsuario(-1);
			return afiliadoDTO;
		}
		return afiliadoDTO;
	}

	private String contenidoEmail(String username, String password) {
		StringBuffer respuesta = new StringBuffer();

		respuesta.append("<h3> Bienvenido...  </h3>");
		respuesta.append("<p> Usted ha sido registrado en el sistema de afiliados sus datos de acceso son: </p>");
		respuesta.append("<label> Nombre de Usuario:</label>");
		respuesta.append(username);
		respuesta.append("<br> <label> Clave:</label>");
		respuesta.append(password);
		respuesta.append("<p> Saludos:</p>");

		return respuesta.toString();
	}

	@Override
	@Transactional
	public Integer guardaAfiliadoExterno(Afiliado afiliado, AuditoriaDTO auditoriaDTO, Usuario usuario) {
		Integer respuesta = 0;
		try {
			List<Perfil> perfiles = new ArrayList<Perfil>();
			Perfil perfil = perfilDAO.get(Constantes.ID_PERFIL_USUARIO);
			perfiles.add(perfil);
			usuario.setPerfil(perfiles);
			short estado = 1;
			usuario.setEstado(estado);
			usuarioDAO.guardar(usuario);

			afiliado.setUsuario(usuario);
			afiliado.setPersona(personaDAO.guardar(afiliado.getPersona()));

			afiliado.setFechaCreacion(auditoriaDTO.getFechaCreacion());
			afiliado.setUsuarioCreacion(auditoriaDTO.getUsuarioInsercion());
			afiliado.setEstado(Constantes.ESTADO_ACTIVO);
			afiliadoDAO.guardar(afiliado);
			respuesta = 1;

		} catch (Exception e) {
			respuesta = 0;
		}
		return respuesta;
	}

	@Override
	@Transactional
	public Integer puntos(Integer idAfiliado, Integer punto) {
		Integer respuesta = 0;
		try {
			Afiliado afiliado = afiliadoDAO.get(idAfiliado);
			if (punto == 1) {
				afiliado.setPuntos(afiliado.getPuntos() + 1);
				respuesta = 1;
			} else if (punto == 0) {
				if (afiliado.getPuntos() > 0) {
					afiliado.setPuntos(afiliado.getPuntos() - 1);
				}
				respuesta = 2;
			}
			afiliadoDAO.guardar(afiliado);

		} catch (Exception e) {
			log.info("Error al asignar puntos : " + e.getMessage());
		}
		return respuesta;
	}

	@Override
	@Transactional
	public Integer restablecePuntos() {
		Integer respuesta = 0;
		try {
			
			Configuracion configuracion = configuracionDAO.get(1);
			
			List<Afiliado> afiliadosPuntuados = afiliadoDAO.obtenerAfiliadosPuntuados();
			for (Afiliado afiliado : afiliadosPuntuados) {
				afiliado.setFechaRestablece(new Date());
				afiliado.setPuntos(0);

				afiliadoDAO.guardar(afiliado);
				
				// guarda historial
				Map<String, Object> resumenGanancias = resumenGanaciasAfiliado(afiliado);
				Integer puntoNivel1 = Integer.parseInt(resumenGanancias.get("totalPuntoNivel1").toString());
				Integer puntoNivel2 = Integer.parseInt(resumenGanancias.get("totalPuntoNivel2").toString());
				
				double totalNivel1 = configuracion.getComision1() * puntoNivel1;
				double totalNivel2 = configuracion.getComision2() * puntoNivel2;
				
				//double total = configuracion.get
				
			}

			// registramos ultima fecha restablecida
			
			configuracion.setUltimaFechaRestablecida(new Date());
			configuracionDAO.guardar(configuracion);
			
			respuesta = 1;
		} catch (Exception e) {
			log.info("Error al restablecer : " + e.getMessage());
		}
		return respuesta;
	}

	private Map<String, Object> resumenGanaciasAfiliado(Afiliado afiliado) {
		Map<String, Object> respuesta = new HashMap<String, Object>();
		Integer puntosNivel1 = 0;
		Integer puntosNivel2 = 0;

		try {
			List<Afiliado> referidos1 = afiliadoDAO.listaAfiliados(afiliado.getId());
			for (Afiliado afiliado1 : referidos1) {
				if (afiliado.getPuntos() != null) {
					puntosNivel1 += afiliado1.getPuntos();
				}
				List<Afiliado> referidos2 = afiliadoDAO.listaAfiliados(afiliado1.getId());
				for (Afiliado afiliado2 : referidos2) {
					if (afiliado.getPuntos() != null) {
						puntosNivel2 += afiliado2.getPuntos();
					}
				}
			}
			
			respuesta.put("totalPuntoNivel1", puntosNivel1);
			respuesta.put("totalPuntoNivel2", puntosNivel2);
			
		} catch (Exception e) {
			log.info("Error al obtener resumen de ganancias: " + e.getMessage());
		}
		return respuesta;
	}
}