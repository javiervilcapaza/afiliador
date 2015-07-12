package com.jvjsoftware.afiliador.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


 
@Entity
@Table(name="rol")
public class Rol implements Entidad{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="rol_idrol_seq")
    @SequenceGenerator(name="rol_idrol_seq", sequenceName="rol_idrol_seq", allocationSize=1)
	private int idRol;
	
	private String nombreRol;	
	
	private Integer dependencia;
	
	public Integer getDependencia() {
		return dependencia;
	}

	public void setDependencia(Integer dependencia) {
		this.dependencia = dependencia;
	}


	public int getIdRol() {
		return idRol;
	}

	public void setIdRol(int idRol) {
		this.idRol = idRol;
	}

	public String getNombreRol() {
		return nombreRol;
	}

	public void setNombreRol(String nombreRol) {
		this.nombreRol = nombreRol;
	}

	@Override
	public Integer getId() {
		// TODO Auto-generated method stub
		return idRol;
	}

	@Override
	public String getLabel() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setId(Integer id) {
		this.idRol = id;
		// TODO Auto-generated method stub
		
	}


	
}