package com.jvjsoftware.afiliador.dao;

import java.util.List;

import com.jvjsoftware.afiliador.domain.Rol;


public interface RolDAO extends IDAO<Rol> {


	List<Rol> buscaRol(String nombreRol);
	Integer eliminar(Rol rol) throws Exception;
	List<Rol> devuelveRoles();
	Integer campoUnicoDescripcion(String Descripcion);
	List<Rol> buscaRolesPorDependencia(Integer dependencia);

}
