package com.jvjsoftware.afiliador.dao;

import java.util.List;


import com.jvjsoftware.afiliador.domain.Usuario;

public interface UsuarioDAO extends IDAO<Usuario> {
	
	Usuario buscaUsuario(String username);
	
	List<Usuario> usuarios();
	
	List<Usuario> usuariosBusqueda(String username, Integer estado);
	
	Integer eliminar(Usuario usuario) throws Exception;
	
	Integer uniqueCampo(String username);
	
}
