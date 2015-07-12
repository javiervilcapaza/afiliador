package com.jvjsoftware.afiliador.controller;


import java.util.logging.Logger;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
 
@Controller
@RequestMapping
public class AccesoController {
 
	Logger log =  Logger.getLogger(AccesoController.class.getName());
	
	
	@RequestMapping("/login")
	public String login(Model model,  String message) {
		model.addAttribute("message", message);
		return "acceso/login";
	}
	
	
	@RequestMapping("/login2")
	public String login2(Model model, String message) {
		model.addAttribute("message", message);
		return "acceso/login2";
	}
	
	
	
	@RequestMapping(value = "/denied")
 	public String denied() {
		return "acceso/denied";
	}
	
	@RequestMapping(value = "/login/failure")
 	public String loginFailure() {
		String message = "Nombre de Usuario o Clave Incorrectos!";
		return "redirect:/login?message="+message;
	}
	
	@RequestMapping(value = "/logout/success")
 	public String logoutSuccess() {
		String message = "Sesion cerrada correctamente!";
		return "redirect:/login?message="+message;
	}
	
	public String algo(){
		return "";
	}
}