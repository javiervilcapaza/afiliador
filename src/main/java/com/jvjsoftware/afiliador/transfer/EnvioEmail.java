package com.jvjsoftware.afiliador.transfer;

import java.util.List;
/**
 * 
 * Sistema Afiliador 
 * Version 1.0
 *
 * @author Javier Vilcapaza
 * @since 10/12/2014
 *
 */
public class EnvioEmail {
	private List<String> destinatario; 
	
	private String titulo;
	
	private String contenido;

	public List<String> getDestinatario() {
		return destinatario;
	}

	public void setDestinatario(List<String> destinatario) {
		this.destinatario = destinatario;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getContenido() {
		return contenido;
	}

	public void setContenido(String contenido) {
		this.contenido = contenido;
	}
	
}
