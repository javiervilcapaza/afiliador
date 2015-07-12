package com.jvjsoftware.afiliador.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jvjsoftware.afiliador.domain.Configuracion;
import com.jvjsoftware.afiliador.service.ConfiguracionService;

@Controller
@RequestMapping("/configuracion")
public class ConfiguracionController {

	Logger log = Logger.getLogger(ConfiguracionController.class.getName());

	@Autowired
	private ConfiguracionService configuracionService;

	@RequestMapping(value = "/formulario")
	public String configuracion(Model model) {
		Configuracion configuracion = configuracionService.configuracion();
		model.addAttribute("configuracion", configuracion);
		return "configuracion/formularioConfiguracion";
	}

	@RequestMapping(value = "/guardaConfiguracion")
	@ResponseBody
	public Integer guardaConfiguracion(String nombreEmpresa, float comision1, float comision2, String telefono, String direccion, String correo) {
		
		Configuracion configuracion = new Configuracion();
		configuracion.setComision1(comision1);
		configuracion.setComision2(comision2);
		configuracion.setNombreEmpresa(nombreEmpresa);
		configuracion.setDireccion(direccion);
		configuracion.setCorreo(correo);
		configuracion.setTelefono(telefono);
		Integer respuesta = configuracionService.guardaConfiguracion(configuracion);
		
		return respuesta;
	}
}
