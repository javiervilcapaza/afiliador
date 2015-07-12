package com.jvjsoftware.afiliador.controller;

import java.util.ArrayList;

import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jvjsoftware.afiliador.domain.Rol;
import com.jvjsoftware.afiliador.service.RolService;


@Controller
@RequestMapping("seguridad/rol/")
public class RolController {
	
	@Autowired
	RolService rolService;
	
	private static final Logger log = LoggerFactory
			.getLogger(RolController.class);
	
	@RequestMapping(value = "lista")
	public String rolLista(Locale locale, Model model, HttpSession session, String info){
		
		log.info("[Controller] RolController -> lista de roles");
		
		List<Rol> roles = rolService.listaRoles();
		
		model.addAttribute("roles", roles);
		
		if(info!=null){
			model.addAttribute("info", info);
		}
		
		
		return "seguridad/roles";
	}
	
	
	@RequestMapping(value = "formulario")
	public String rolFormulario(Locale locale, Model model, HttpSession session, String nombreRol, Integer idRol){
		
		log.info("[Controller] RolController -> formulario rol");
		if(idRol!=null){
			Rol rol= rolService.buscarPorId(idRol);
			model.addAttribute("rol",rol);
		}
		
		
		model.addAttribute("roles",rolService.listaRoles());

		return "seguridad/rolFormulario";
	}
	@RequestMapping(value = "guarda")
	public @ResponseBody String rolGuarda(String nombreRol, Integer idRol, Integer dependenciaRol ) {
		log.info("[Controller] RolController -> lista de roles");
		Rol rol;
		
		if(idRol != null){
			rol = rolService.buscarPorId(idRol);
		}else{
			rol = new Rol();
			
			if(rolService.campoUnicoNombreRol(nombreRol)!=0){
				return "rol duplicado";
			}
		}
		
		
		rol.setNombreRol(nombreRol);
		
		
		if(dependenciaRol!=0){
			rol.setDependencia(dependenciaRol);
			Rol padre=rolService.buscarPorId(dependenciaRol);
			padre.setDependencia(-1);	
			rolService.guardaRol(padre);
		}else{
			rol.setDependencia(dependenciaRol);
		}
		
		
		
		
		
		
		rolService.guardaRol(rol);
		
		
		return "Guardado exitosamente";

	}
	
	@RequestMapping(value = "buscar")
	public String rolBusqueda(Locale locale, Model model, HttpSession session, String nombreRol) {

		List<Rol> roles = new ArrayList<Rol>();

		roles = rolService.busqueda(nombreRol);

		model.addAttribute("roles", roles);

		return "seguridad/rolBusqueda";

	}
	
	@RequestMapping(value = "eliminar")
	public @ResponseBody Integer rolEliminar(Locale locale, Model model, HttpSession session, Integer idRol) {

		try {
			return rolService.eliminarRol(idRol);
		} catch (Exception e) {
			
			return -1;
		}

	}
	
	

}
