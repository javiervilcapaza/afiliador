package com.jvjsoftware.afiliador.service;

import java.util.List;

import com.jvjsoftware.afiliador.domain.Persona;


public interface PersonaService {

	Persona buscaPorId(Integer id);

	List<Persona> todos();

	void guarda(Persona persona);

	Integer elimina(Integer id);

}
