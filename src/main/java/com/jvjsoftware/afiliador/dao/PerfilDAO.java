package com.jvjsoftware.afiliador.dao;

import java.util.List;


import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Rol;

public interface PerfilDAO extends IDAO<Perfil> {
	
	
	List<Perfil> buscaPerfil(String nombrePerfil, String estado);
	Integer eliminar(Perfil perfil) throws Exception;
	Integer campoUnicoNombrePerfil(String nombrePerfil);
	
}
