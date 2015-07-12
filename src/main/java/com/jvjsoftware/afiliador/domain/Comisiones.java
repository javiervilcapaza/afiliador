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

@Table(name="historialComision")
@Entity
public class Comisiones implements Entidad{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "historialcomision_id_historial_comision_seq")
	@SequenceGenerator(name = "historialcomision_id_historial_comision_seq", sequenceName = "historialcomision_id_historial_comision_seq", allocationSize = 1)
	@Column(name = "id_historial_comision")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="id_afiliado")
	private Afiliado afiliado;
	
	private float comision1;
	
	private float comision2;
	
	private float descuento;
	
	@Column(name="comision_total")
	private float comisionTotal;
	
	@Column(name="fecha")
	@Temporal(TemporalType.DATE)
	private Date fechaRegistro;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Afiliado getAfiliado() {
		return afiliado;
	}

	public void setAfiliado(Afiliado afiliado) {
		this.afiliado = afiliado;
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

	public float getDescuento() {
		return descuento;
	}

	public void setDescuento(float descuento) {
		this.descuento = descuento;
	}

	public float getComisionTotal() {
		return comisionTotal;
	}

	public void setComisionTotal(float comisionTotal) {
		this.comisionTotal = comisionTotal;
	}

	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(Date fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

	@Override
	public String getLabel() {
		// TODO Auto-generated method stub
		return null;
	}

	
	
}
