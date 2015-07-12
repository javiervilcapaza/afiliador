package com.jvjsoftware.afiliador.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jvjsoftware.afiliador.domain.Afiliado;
import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Persona;
import com.jvjsoftware.afiliador.domain.Usuario;
import com.jvjsoftware.afiliador.service.AfiliadoService;
import com.jvjsoftware.afiliador.service.PerfilService;
import com.jvjsoftware.afiliador.service.UsuarioService;
import com.jvjsoftware.afiliador.transfer.AuditoriaDTO;
import com.jvjsoftware.afiliador.utils.ConstanteError;
import com.jvjsoftware.afiliador.utils.Constantes;
import com.jvjsoftware.afiliador.utils.Encrypt;

@Controller
public class FrontEndController {

	@Autowired
	AfiliadoService afiliadoService;
	
	@Autowired
	PerfilService perfilService;
	
	@Autowired
	UsuarioService usuarioService;

	Logger log = Logger.getLogger(FrontEndController.class.getName());

	@RequestMapping(value = "afiliarse/{idLink}")
	public String afiliarse(@PathVariable String idLink, Model model) {
		log.info("AccesoController -> afiliarse");
		model.addAttribute("idLink", idLink);
		
		// Validamos que el usuario no se encuentre session
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		try{
			UserDetails userDetails = (UserDetails) auth.getPrincipal();
		}catch(Exception e){
			return "afiliado/afiliarse";
		}
		
		return "redirect:/";
	}

	@RequestMapping(value = "afiliarse/guardaAfiliado")
	public @ResponseBody
	String guardaFormulario(String dni, String nombres, String apellidos, String idLink, Usuario usuario, String telefono, String direccion) throws ParseException {
		log.info("[Controller] Afiliado Controller -> Guarda Afiliado");
		
		Afiliado afiliado = new Afiliado();
		Persona persona = new Persona();
		persona.setApellidos(apellidos);
		persona.setNombres(nombres);
		persona.setDni(dni);
		persona.setTelefono(telefono);
		persona.setDireccion(direccion);
		afiliado.setPersona(persona);

		AuditoriaDTO auditoriaDTO = new AuditoriaDTO();
		auditoriaDTO.setFechaCreacion(new Date());

		Integer idAfiliadoPadre = null;
		try {
			idAfiliadoPadre = Integer.parseInt(Encrypt.decrypt("hola", idLink));
		} catch (Exception e) {
			log.error("Error al obtener el ID encriptado del afiliado: " + e.getMessage());
		}

		Afiliado afiliadoPadre = afiliadoService.buscaAfiliadoPorId(idAfiliadoPadre);
		if (afiliadoPadre != null) {
			afiliado.setAfiliadoPadre(afiliadoPadre.getId());
		} else {
			return ConstanteError.AFILIADO_PADRE_INVALIDO;
		}
		
		Integer respuesta = afiliadoService.guardaAfiliadoExterno(afiliado, auditoriaDTO, usuario);
		
		return respuesta.toString();
	}
}
