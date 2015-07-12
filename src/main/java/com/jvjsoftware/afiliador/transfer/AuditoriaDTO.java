package com.jvjsoftware.afiliador.transfer;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */

public class AuditoriaDTO {

	public Date fechaCreacion;
	public Date fechaActualizacion;
	public Integer usuarioInsercion;
	public Integer usuarioActualizacion;

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Date getFechaActualizacion() {
		return fechaActualizacion;
	}

	public void setFechaActualizacion(Date fechaActualizacion) {
		this.fechaActualizacion = fechaActualizacion;
	}

	public Integer getUsuarioInsercion() {
		return usuarioInsercion;
	}

	public void setUsuarioInsercion(Integer usuarioInsercion) {
		this.usuarioInsercion = usuarioInsercion;
	}

	public Integer getUsuarioActualizacion() {
		return usuarioActualizacion;
	}

	public void setUsuarioActualizacion(Integer usuarioActualizacion) {
		this.usuarioActualizacion = usuarioActualizacion;
	}

	public String getFechaCreacionString(String formatoDeseado) {
		SimpleDateFormat formato = new SimpleDateFormat(formatoDeseado);
		return formato.format(this.fechaCreacion);
	}

	public String getFechaActualizacionString(String formatoDeseado) {
		SimpleDateFormat formato = new SimpleDateFormat(formatoDeseado);
		return formato.format(this.fechaActualizacion);
	}

}
