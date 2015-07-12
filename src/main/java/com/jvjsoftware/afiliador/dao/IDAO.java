package com.jvjsoftware.afiliador.dao;



import java.util.List;

import com.jvjsoftware.afiliador.domain.Entidad;




/**
 * 
 * @author BTG
 * @version 1.1.0
 *
 */

public interface IDAO<T extends Entidad>{
	
	/**
	 * Devuelve un Objeto
	 * 
	 * @param id
	 * @return
	 */
	public T get(Integer id);
	
	/**
	 * Devuelve una lista de Objetos
	 * 
	 * @return
	 */
	public List<T> getTodos();
	
	/**
	 * Guarda el objeto
	 * 
	 * @param objeto
	 * @return
	 */
	public T guardar(T objeto);
	
	

}
