package com.jvjsoftware.afiliador.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;


import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Rol;
import com.jvjsoftware.afiliador.domain.Usuario;

@Repository("RolDAO")
public class RolDAOImpl extends DAO<Rol> implements RolDAO {

	@SuppressWarnings("unchecked")
	@Override
	public List<Rol> buscaRol(String nombreRol) {

		String sql = "from Rol a where upper(a.nombreRol) like :nombreRol";
		Query q = em.createQuery(sql);
		q.setParameter("nombreRol", '%' + nombreRol.toUpperCase() + '%');

		try {
			return q.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public Integer eliminar(Rol rol) throws Exception {
		try {

			em.remove(rol);
			
			em.flush();

			return 1;
		} catch (Exception e) {
			
			System.out.println("NO SE PUEDE ELIMINAR :");
			throw new Exception("SE REFERENCIA DESDE OTRA TABLA");
			//return 0;
		}
	}

	@Override
	public List<Rol> devuelveRoles() {
		String sql = "from Rol a order by a.dependencia";
		Query q = em.createQuery(sql);

		try {
			return q.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}
	
	@Override
	public List<Rol> buscaRolesPorDependencia(Integer dependencia) {
		String sql = "from Rol a where a.dependencia =:dependencia";
		Query q = em.createQuery(sql);
		q.setParameter("dependencia",dependencia);

		try {
			return q.getResultList();
		} catch (NoResultException e) {
			return null;
		}
	}
	

	@Override
	public Integer campoUnicoDescripcion(String descripcion) {
		String sql="from Rol a where upper(a.nombreRol) =:nombreRol";
		Query q = em.createQuery(sql);
		q.setParameter("nombreRol",descripcion.toUpperCase());
		
		try{
			Rol rol = (Rol) q.getSingleResult();
		return 1;
		}
		catch(NoResultException e){
			return 0;
		}
	}

}
