package com.jvjsoftware.afiliador.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
 * @since 30/11/2014
 *
 */
@Entity
@Table(name="perfil")

public class Perfil implements Entidad {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="perfil_idperfil_seq")
    @SequenceGenerator(name="perfil_idperfil_seq", sequenceName="perfil_idperfil_seq", allocationSize=1)

	private int idPerfil;
	private String nombrePerfil;
	

	
	
	@ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="PerfilRol", 
         joinColumns={@JoinColumn(name="IdPerfil")},
         inverseJoinColumns={@JoinColumn(name="IdRol")})
	private List<Rol> rol;
	
	
	private String descripcion;
	
	
	@Temporal(TemporalType.DATE)
	private Date fechaRegistro;
	
	
	private String estado;
	
	


	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(Date fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	public int getIdPerfil() {
		return idPerfil;
	}

	public void setIdPerfil(int idPerfil) {
		this.idPerfil = idPerfil;
	}

	public String getNombrePerfil() {
		return nombrePerfil;
	}

	public void setNombrePerfil(String nombrePerfil) {
		this.nombrePerfil = nombrePerfil;
	}

	public List<Rol> getRol() {
		return rol;
	}

	public void setRol(List<Rol> rol) {
		this.rol = rol;
	}

	@Override
	public Integer getId() {
		return idPerfil;
	}

	@Override
	public String getLabel() {
		return null;
	}

	@Override
	public void setId(Integer id) {
		this.idPerfil = id;
		
	}
	
	

	
}