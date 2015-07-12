package com.jvjsoftware.afiliador.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jvjsoftware.afiliador.domain.Persona;
import com.jvjsoftware.afiliador.domain.Rol;
import com.jvjsoftware.afiliador.service.PersonaService;


public class PersonaController {
	

	@Autowired
	private PersonaService personaService;
	
	private static final Logger log = LoggerFactory
			.getLogger(RolController.class);
	
	@RequestMapping(value = "lista")
	public String lista(Locale locale, Model model, HttpSession session, String info){
		
		log.info("[Controller] PersonaController -> lista de personas");
		
		List<Persona> personas = personaService.todos();
		
		model.addAttribute("personas", personas);
		
		if(info!=null){
			model.addAttribute("info", info);
		}
		
		return "persona/lista";
	}
	
	
	@RequestMapping(value = "formulario")
	public String formulario(Locale locale, Model model, HttpSession session, String nombreRol, Integer idPersona){
		
		log.info("[Controller] PersonaController -> formulario de personas");
		if(idPersona!=null){
			Persona persona = personaService.buscaPorId(idPersona);
			model.addAttribute("persona",persona);
		}
		
		return "persona/formulario";
	}
	@RequestMapping(value = "guarda")
	public @ResponseBody Integer rolGuarda(Persona persona) {
		log.info("[Controller] PersonaController -> guarda persona");
		
		try{

			if(persona.getId() != null){
				Persona personaBD = personaService.buscaPorId(persona.getId());
				
				personaService.guarda(personaBD);
				
			}else{
				personaService.guarda(persona);
			}
			return 1;
		}catch(Exception e){
			return 0;
		}
	}
	
	@RequestMapping(value = "buscar")
	public String rolBusqueda(Locale locale, Model model, HttpSession session, String nombreRol) {

		List<Rol> roles = new ArrayList<Rol>();

//		roles = personaService.busqueda(nombreRol);

		model.addAttribute("roles", roles);

		return "seguridad/rolBusqueda";

	}
	
	@RequestMapping(value = "eliminar")
	public @ResponseBody Integer rolEliminar(Locale locale, Model model, HttpSession session, Integer idRol) {

		try {
			return personaService.elimina(idRol);
		} catch (Exception e) {
			return -1;
		}

	}
}
