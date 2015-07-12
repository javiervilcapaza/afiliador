package com.jvjsoftware.afiliador.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("historial/")
public class HistorialController {
	
	@RequestMapping(value="prueba")
	@ResponseBody
	public String prueba(String nombre){
		if(nombre != null){
			return "esto es una prueba de ".concat(nombre);
		}
		return "esto es una prueba de ";
	}
}
