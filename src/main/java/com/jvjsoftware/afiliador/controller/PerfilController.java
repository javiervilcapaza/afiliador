package com.jvjsoftware.afiliador.controller;

import java.util.ArrayList;

import java.util.Date;
import java.util.List;
import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Rol;
import com.jvjsoftware.afiliador.service.PerfilService;
import com.jvjsoftware.afiliador.service.RolService;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */
@Controller
@RequestMapping("seguridad/perfil/")
public class PerfilController {

	@Autowired
	PerfilService perfilService;

	@Autowired
	RolService rolService;

	private static final Logger log = LoggerFactory.getLogger(PerfilController.class);

	@RequestMapping(value = "lista")
	public String perfilLista(Locale locale, Model model, HttpSession session, String info) {

		log.info("[Controller] PerfilController -> lista de perfil");

		List<Perfil> perfiles = perfilService.listaPerfiles();

		model.addAttribute("perfiles", perfiles);
		model.addAttribute("estados", "Activo");

		if (info != null) {
			model.addAttribute("info", info);
		}

		return "seguridad/perfiles";
	}

	@RequestMapping(value = "formulario")
	public String perfilFormulario(Locale locale, Model model, HttpSession session, String nombrePerfil, Integer idPerfil) {

		log.info("[Controller] PerfilController -> formulario");

		if (idPerfil != null) {
			Perfil perfil = perfilService.buscarPorId(idPerfil);
			model.addAttribute("perfil", perfil);
		}

		model.addAttribute("estados", "Activo");

		return "seguridad/perfilFormulario";
	}

	@RequestMapping(value = "guarda")
	public @ResponseBody
	String perfilGuarda(String nombrePerfil, Integer idPerfil, String[] roles, String estado, String descripcion) {

		log.info("[Controller] PerfilController -> Guarda Perfil");

		Perfil perfil;

		if (idPerfil != null) {
			perfil = perfilService.buscarPorId(idPerfil);
		} else {
			perfil = new Perfil();

			if (perfilService.campoUnicoNombrePerfil(nombrePerfil) != 0) {
				return "perfil duplicado";
			}
			Date fechaRegistro = new Date();
			perfil.setFechaRegistro(fechaRegistro);

		}

		perfil.setNombrePerfil(nombrePerfil);
		perfil.setEstado(estado);
		perfil.setDescripcion(descripcion);

		perfilService.guardaPerfil(perfil);

		return "Guardado exitosamente";

	}

	@RequestMapping(value = "buscar")
	public String perfilBusqueda(Locale locale, Model model, HttpSession session, String nombrePerfil, String estado) {

		List<Perfil> perfiles = new ArrayList<Perfil>();

		perfiles = perfilService.busqueda(nombrePerfil, estado);

		model.addAttribute("perfiles", perfiles);

		return "seguridad/perfilBusqueda";

	}

	@RequestMapping(value = "eliminar")
	public @ResponseBody
	Integer perfilEliminar(Locale locale, Model model, HttpSession session, Integer idPerfil) {

		try {
			return perfilService.eliminarPerfil(idPerfil);
		} catch (Exception e) {

			return -1;
		}

	}

	@RequestMapping(value = "asociarRolFormulario")
	public String perfilRolFormulario(Locale locale, Model model, HttpSession session, Integer idPerfil) {

		Perfil perfil = perfilService.perfilConRoles(idPerfil);

		List<Rol> roles = rolService.listaRoles();

		model.addAttribute("roles", roles);

		model.addAttribute("perfil", perfil);

		return "seguridad/perfilRolFormulario";

	}

	@RequestMapping(value = "asociarRolGuarda")
	public @ResponseBody
	String perfilRolGuarda(Integer idPerfil, Integer[] roles) {

		Integer respuesta = perfilService.guardarAsociacion(idPerfil, roles);

		return respuesta.toString();

	}

}
