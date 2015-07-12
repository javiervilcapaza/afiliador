package com.jvjsoftware.afiliador.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jvjsoftware.afiliador.domain.Usuario;


@Repository("UsuarioDAO")
public class UsuarioDAOImpl extends DAO<Usuario> implements UsuarioDAO {

	
	
	@Override
	public Usuario buscaUsuario(String username) {
		
		
		String sql="from Usuario a where a.username=:username";
		Query q = em.createQuery(sql);
		q.setParameter("username",username);
		try{
			return (Usuario) q.getSingleResult();
		}
		catch(NoResultException e){
			return null;
		}
		
		}

	@Override
	public List<Usuario> usuarios() {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	public List<Usuario> usuariosBusqueda(String username, Integer estado) {
		
		String sql="from Usuario a where ";
		
		if(estado!=null){
			sql=sql+" a.estado=:estado";
		}else{
			
		}
		
		if(estado!=null && username !=""){
			sql=sql+" and ";
		}
		
		
		if(username!="" ){
			sql=sql+"upper(a.username) like :username";
		}
		

		
		Query q = em.createQuery(sql);
		
		
		
		
		if(username!=""){
			q.setParameter("username",'%'+username.toUpperCase()+'%');
		}
		
		if(estado!=null){
			
			short est = estado.shortValue();
			
			q.setParameter("estado",est);
		}
		
		
		try{
			return q.getResultList();
		}
		catch(NoResultException e){
			return null;
		}
	}

	@Transactional
	public Integer eliminar(Usuario usuario) throws Exception {
		
		try{
		em.remove(usuario);
		em.flush();
		

		return 1;
		
		} catch (Exception e) {
		
		System.out.println("NO SE PUEDE ELIMINAR :");
		throw new Exception("SE REFERENCIA DESDE OTRA TABLA");
		//return 0;
		}

	}

	@Override
	public Integer uniqueCampo(String username) {
		String sql="from Usuario a where upper(a.username) =:username";
		Query q = em.createQuery(sql);
		q.setParameter("username",username.toUpperCase());
		
		try{
			Usuario usuario = (Usuario) q.getSingleResult();
		return 1;
		}
		catch(NoResultException e){
			return 0;
		}
	}

}
