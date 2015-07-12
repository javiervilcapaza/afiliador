package com.jvjsoftware.afiliador.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.jvjsoftware.afiliador.domain.Afiliado;
import com.jvjsoftware.afiliador.domain.Usuario;
import com.jvjsoftware.afiliador.service.AfiliadoService;
import com.jvjsoftware.afiliador.service.UsuarioService;
import com.jvjsoftware.afiliador.utils.Config;
import com.jvjsoftware.afiliador.utils.Encrypt;
 
@Controller
@RequestMapping("")
public class MediadorController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	AfiliadoService afiliadoService;
	
	
	Logger log = Logger.getLogger(MediadorController.class.getName());
 
	@SuppressWarnings("unchecked")
	@RequestMapping
	public String principal(Locale locale, Model model ) {
		
		UserDetails userDetails = obtenerUsuarioSesion();
		Usuario usuario = usuarioService.session(userDetails.getUsername());
		Afiliado afiliadoSession = afiliadoService.buscarAfiliadoPorUsuario(usuario.getId());
		Map<String, Object> mapMultinivel = afiliadoService.listaAfiliadoMultinivel(afiliadoSession.getId(), 2);

		List<Usuario> usuarios = (List<Usuario>) mapMultinivel.get("afiliados");

		String idLink = "";

		try {
			idLink = Encrypt.encrypt("hola", afiliadoSession.getId().toString());
		} catch (Exception e) {
			log.error("Error al obtener el ID encriptado del afiliado: " + e.getMessage());
		}

		model.addAttribute("idLink", Config.getPropiedad("url.afiliarse").concat(idLink));
		model.addAttribute("afiliados", new Gson().toJsonTree(usuarios));
		model.addAttribute("totalNiveles", mapMultinivel.get("totalNiveles"));
		model.addAttribute("totalGanancias", mapMultinivel.get("totalGanancias"));
		model.addAttribute("totalProyeccion", mapMultinivel.get("totalProyeccion"));
		return "principal";
	}
	
	private UserDetails obtenerUsuarioSesion() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		return userDetails;
	}
	
	@RequestMapping(value="usuario")
	public String getUserPage() {
		return "usuario";
	}
	
	@RequestMapping(value="/enconstruccion")
	public String getAdminPage() {
		return "enconstruccion";
	}
	
	@RequestMapping(value="/ventas")
	public String ventasPage() {
		return "ventas";
	}
	
	@RequestMapping(value="/logistica")
	public String logisticaPage() {
		return "logistica";
	}
	
	
}