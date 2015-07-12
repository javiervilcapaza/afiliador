package com.jvjsoftware.afiliador.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jvjsoftware.afiliador.dao.UsuarioDAO;
import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Rol;
import com.jvjsoftware.afiliador.domain.Usuario;



@Service("UsuarioService")
public class UsuarioServiceImpl implements UsuarioService {
	
	
	@Autowired
	private UsuarioDAO usuarioDAO;
	
	
	
	@Override
	public List<Usuario> listaUsuarios() {
		// TODO Auto-generated method stub
		return usuarioDAO.getTodos();
	}



	@Override
	public List<Usuario> busqueda(String username, Integer estado) {
		// TODO Auto-generated method stub
		return usuarioDAO.usuariosBusqueda(username, estado);
	}



	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void guardaUsuario(Usuario usuario) {
		usuarioDAO.guardar(usuario);
		
	}



	@Override
	@Transactional(readOnly = true)
	public Usuario buscarPorId(Integer id) {
		// TODO Auto-generated method stub
		Usuario usuario = usuarioDAO.get(id);
		
		
		
		for (Perfil perfil : usuario.getPerfil()) {
			System.out.println(perfil.getNombrePerfil());
		}
		
		
		return usuario;
	}


	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Integer eliminarUsuario(Integer idUsuario) throws Exception {
		
		Usuario usuario = buscarPorId(idUsuario);
		
		try {
			return usuarioDAO.eliminar(usuario);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new Exception("SE REFERENCIA DESDE OTRA TABLA");

		}
	}



	@Override
	@Transactional(readOnly = true)
	public Usuario session(String username) {
		// TODO Auto-generated method stub
		return usuarioDAO.buscaUsuario(username);
	}



	@Override
	public Integer campoUnicoUsername(String username) {
		return usuarioDAO.uniqueCampo(username);
	}
	
	@Override
	
	public List<Rol> rolesPorUsuario(Usuario usuario){
		
		List<Rol> roles= new ArrayList<Rol>();
		for(Perfil perfil : usuario.getPerfil()){
			List<Rol> rols=perfil.getRol();
				for(Rol rol: rols){
					roles.add(rol);
				}
		}
		
		return roles;
	}
	

}
