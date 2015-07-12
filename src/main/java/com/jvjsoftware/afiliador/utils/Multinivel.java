package com.jvjsoftware.afiliador.utils;
/**
 * 
 * Sistema Afiliador 
 * Version 1.0
 *
 * @author Javier Vilcapaza
 * @since 06/12/2014
 *
 */
public class Multinivel {

	private Integer id;
	private Integer parent;
	private String name;
	
	
	
	public Multinivel(Integer id, Integer parent, String name) {
		super();
		this.id = id;
		this.parent = parent;
		this.name = name;
	}
	public Integer getId() {
		return id;
	}
	
	public Integer getParent() {
		return parent;
	}
	
	public String getName() {
		return name;
	}
	
	
}
