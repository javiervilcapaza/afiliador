package com.jvjsoftware.afiliador.dao;

import com.jvjsoftware.afiliador.domain.Persona;


public interface PersonaDAO extends IDAO<Persona>{

	Integer elimina(Persona persona);

}
