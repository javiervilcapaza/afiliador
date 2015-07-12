package com.jvjsoftware.afiliador.transfer;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */
public class BuscaAfiliadoDTO {
	public String nombresApellidos;
	public String dni;
	public Integer afiliadoPadre;

	public String getNombresApellidos() {
		return nombresApellidos;
	}

	public void setNombresApellidos(String nombresApellidos) {
		this.nombresApellidos = nombresApellidos;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public Integer getAfiliadoPadre() {
		return afiliadoPadre;
	}

	public void setAfiliadoPadre(Integer afiliadoPadre) {
		this.afiliadoPadre = afiliadoPadre;
	}
	
	

}
