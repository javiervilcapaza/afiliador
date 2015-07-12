package com.jvjsoftware.afiliador.transfer;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 09/12/2014
 * 
 */

public class AfiliadoDTO {

	private Integer idAfiliado;
	private Integer idPersona;
	private Integer idUsuario;
	private String nombres;
	private String apellidos;
	private String dni;
	private String direccion;
	private String telefono;
	private String username;

	public Integer getIdAfiliado() {
		return idAfiliado;
	}

	public void setIdAfiliado(Integer idAfiliado) {
		this.idAfiliado = idAfiliado;
	}

	public Integer getIdPersona() {
		return idPersona;
	}

	public void setIdPersona(Integer idPersona) {
		this.idPersona = idPersona;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
