package com.jvjsoftware.afiliador.dao;

import org.springframework.stereotype.Repository;


import com.jvjsoftware.afiliador.domain.Persona;

@Repository("PersonaDAO")
public class PersonaDAOImpl extends DAO<Persona> implements PersonaDAO {

	@Override
	public Integer elimina(Persona persona) {
		try{
			em.remove(persona);
			em.flush();
			

			return 1;
			
			} catch (Exception e) {
				return 0;
			}
	}

}
