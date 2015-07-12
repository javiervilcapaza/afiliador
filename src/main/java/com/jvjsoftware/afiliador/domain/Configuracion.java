package com.jvjsoftware.afiliador.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 
 * Sistema Afiliador 
 * Version 1.0
 *
 * @author Javier Vilcapaza
 * @since 13/01/2015
 *
 */
@Entity
@Table
public class Configuracion implements Entidad {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "configuracion_idconfiguracion_seq")
	@SequenceGenerator(name = "configuracion_idconfiguracion_seq", sequenceName = "configuracion_idconfiguracion_seq", allocationSize = 1)
	@Column(name = "idconfiguracion")
	private Integer id;
	
	@Column(name = "nombre_empresa")
	private String nombreEmpresa;
	
	@Column(name="comision_nivel1")
	private float comision1;
	
	@Column(name="comision_nivel2")
	private float comision2;
	
	private String correo;
	
	private String telefono;
	
	private String direccion;
	
	@Column(name="ultima_fecha_restablecido")
	@Temporal(TemporalType.DATE)
	private Date ultimaFechaRestablecida;

	
	public Date getUltimaFechaRestablecida() {
		return ultimaFechaRestablecida;
	}

	public void setUltimaFechaRestablecida(Date ultimaFechaRestablecida) {
		this.ultimaFechaRestablecida = ultimaFechaRestablecida;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombreEmpresa() {
		return nombreEmpresa;
	}

	public void setNombreEmpresa(String nombreEmpresa) {
		this.nombreEmpresa = nombreEmpresa;
	}

	public float getComision1() {
		return comision1;
	}

	public void setComision1(float comision1) {
		this.comision1 = comision1;
	}

	public float getComision2() {
		return comision2;
	}

	public void setComision2(float comision2) {
		this.comision2 = comision2;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	@Override
	public String getLabel() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
