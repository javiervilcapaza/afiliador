package com.jvjsoftware.afiliador.domain;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import sun.security.util.BigInt;


@Entity
@Table(name = "usuario", uniqueConstraints = @UniqueConstraint(columnNames = { "username" }))
public class Usuario implements Entidad {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_idusuario_seq")
	@SequenceGenerator(name = "usuario_idusuario_seq", sequenceName = "usuario_idusuario_seq", allocationSize = 1)
	private int idUsuario;

	@Column(unique = true)
	private String username;

	private String password;

	@ManyToMany
	@JoinTable(name = "UsuarioPerfil", joinColumns = { @JoinColumn(name = "IdUsuario") }, inverseJoinColumns = { @JoinColumn(name = "IdPerfil") })
	private List<Perfil> perfil;

	@Temporal(TemporalType.DATE)
	private Date fechaRegistro;

	private short estado;

	private String correo;

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(Date fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	public short getEstado() {
		return estado;
	}

	public void setEstado(short estado) {
		this.estado = estado;
	}

	public int getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Perfil> getPerfil() {
		return perfil;
	}

	public void setPerfil(List<Perfil> perfil) {
		this.perfil = perfil;
	}

	@Override
	public String getLabel() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer getId() {
		// TODO Auto-generated method stub
		return idUsuario;
	}

	@Override
	public void setId(Integer id) {
		// TODO Auto-generated method stub
		this.idUsuario = id;
	}

}