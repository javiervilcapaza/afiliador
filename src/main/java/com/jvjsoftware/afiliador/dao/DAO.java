package com.jvjsoftware.afiliador.dao;


import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jvjsoftware.afiliador.domain.Entidad;

/**
 * 
 * @author BTG
 * @version 1.1.0
 *
 */

public class DAO<T extends Entidad> implements IDAO<T>{
	
	private Class<Entidad> clazz;
	
	private static final Logger log=LoggerFactory.getLogger(DAO.class);

	
	@PersistenceContext
	protected EntityManager em;
	
	public DAO(){
		clazz=(Class<Entidad>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}
	
	/**
	 * Devuelve un Objeto
	 * 
	 * @param id
	 * @return
	 */
	public T get(Integer id){
		T val = null;
		try{
			val =  (T) em.find(clazz,id);
		}
		catch(Exception e){
			log.error(e.getMessage());
		}
		return val;
	}
	
	/**
	 * Devuelve una lista de Objetos
	 * 
	 * @return
	 */
	public List<T> getTodos(){
		Entity e=(Entity)clazz.getAnnotation(Entity.class);
		String nombre=null;
		if(e==null || e.name()==null || e.name().length()==0)
			nombre=clazz.getSimpleName();
		else
			nombre=e.name();
		String sql="SELECT e FROM "+nombre+" e";
		return em.createQuery(sql).getResultList();
	}
	
	/**
	 * Guarda el objeto
	 * 
	 * @param objeto
	 * @return
	 */
	public T guardar(T objeto){
		
		T guarda = null;
		
		if(objeto.getId()!=null && objeto.getId()!=0){
			em.merge(objeto);
			em.flush();
			guarda =  (T) em.find(clazz,objeto.getId());
		}else{
			em.persist(objeto);
			em.flush();
			em.refresh(objeto);
			guarda =  objeto;
		}
		return guarda;
	}

}
