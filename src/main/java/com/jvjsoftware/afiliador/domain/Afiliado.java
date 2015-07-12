package com.jvjsoftware.afiliador.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */
@Table
@Entity
public class Afiliado implements Entidad {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "afiliado_id_afiliado_seq")
	@SequenceGenerator(name = "afiliado_id_afiliado_seq", sequenceName = "afiliado_id_afiliado_seq", allocationSize = 1)
	@Column(name = "id_afiliado")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "id_persona")
	private Persona persona;

	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;

	@Column(name = "id_referido")
	private Integer afiliadoPadre;

	private Integer puntos;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "fecha_creacion")
	private Date fechaCreacion;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "fecha_actualizacion")
	private Date fechaActualizacion;

	@Column(name = "usuario_creacion")
	private Integer usuarioCreacion;

	@Column(name = "usuario_actualizacion")
	private Integer usuarioActualizacion;
	
	@Column(name="fecha_restablece")
	@Temporal(TemporalType.DATE)
	private Date fechaRestablece;

	private String estado;

	
	public Date getFechaRestablece() {
		return fechaRestablece;
	}

	public void setFechaRestablece(Date fechaRestablece) {
		this.fechaRestablece = fechaRestablece;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Persona getPersona() {
		return persona;
	}

	public void setPersona(Persona persona) {
		this.persona = persona;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Integer getAfiliadoPadre() {
		return afiliadoPadre;
	}

	public void setAfiliadoPadre(Integer afiliadoPadre) {
		this.afiliadoPadre = afiliadoPadre;
	}

	public Integer getPuntos() {
		if(puntos == null){
			puntos = 0;
		}
		return puntos;
	}

	public void setPuntos(Integer puntos) {
		this.puntos = puntos;
	}

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

	public Integer getUsuarioCreacion() {
		return usuarioCreacion;
	}

	public void setUsuarioCreacion(Integer usuarioCreacion) {
		this.usuarioCreacion = usuarioCreacion;
	}

	public Integer getUsuarioActualizacion() {
		return usuarioActualizacion;
	}

	public void setUsuarioActualizacion(Integer usuarioActualizacion) {
		this.usuarioActualizacion = usuarioActualizacion;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String getLabel() {
		// TODO Auto-generated method stub
		return null;
	}

}
