package com.jvjsoftware.afiliador.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jvjsoftware.afiliador.dao.PersonaDAO;
import com.jvjsoftware.afiliador.domain.Persona;


@Service("PersonaService")
public class PersonaServiceImpl implements PersonaService{

	@Autowired
	PersonaDAO personaDAO;
	
	@Override
	public Persona buscaPorId(Integer id){
		return personaDAO.get(id);
	}
	
	@Override
	public List<Persona> todos(){
		return personaDAO.getTodos();
	}
	
	@Override
	@Transactional
	public void guarda(Persona persona){
		personaDAO.guardar(persona);
	}
	
	@Override
	@Transactional
	public Integer elimina(Integer id){
		Persona persona = buscaPorId(id);
		return personaDAO.elimina(persona);
	}
}
