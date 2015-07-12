package com.jvjsoftware.afiliador.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;



import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Rol;
import com.jvjsoftware.afiliador.domain.Usuario;
import com.jvjsoftware.afiliador.utils.Util;

@Repository("PerfilDAO")
public class PerfilDAOImpl extends DAO<Perfil> implements PerfilDAO {


	@SuppressWarnings("unchecked")
	@Override
	public List<Perfil> buscaPerfil(String nombrePerfil, String estado) {
		
		String sql="from Perfil a where ";
		
		List<Map<String, Object>> lista = new ArrayList<Map<String, Object>>();
		Map<String, Object> datos = new HashMap<String, Object>();
		
		if(!nombrePerfil.equals("")){datos.put("1", "upper(a.nombrePerfil) like :nombrePerfil");}
		if(!estado.equals("")){datos.put("2", "a.estado =:estado");}
		lista.add(datos);
		
		Query q = em.createQuery(sql + Util.query(lista));
		
		if(!nombrePerfil.equals("")){q.setParameter("nombrePerfil","%"+nombrePerfil.toUpperCase()+"%");}
		if(!estado.equals("")){q.setParameter("estado",estado);}
				
		try{
			return q.getResultList();
		}
		catch(NoResultException e){
			return null;
		}
		
	}

	@Override
	public Integer eliminar(Perfil perfil) throws Exception {
		try{
			
			em.remove(perfil);
			em.flush();

			return 1;
			
} catch (Exception e) {
		
		System.out.println("NO SE PUEDE ELIMINAR :");
		throw new Exception("SE REFERENCIA DESDE OTRA TABLA");
		//return 0;
		}
	}

	@Override
	public Integer campoUnicoNombrePerfil(String nombrePerfil) {
		String sql="from Perfil a where upper(a.nombrePerfil) =:nombrePerfil";
		Query q = em.createQuery(sql);
		q.setParameter("nombrePerfil",nombrePerfil.toUpperCase());
		
		try{
			Perfil perfil= (Perfil) q.getSingleResult();
		return 1;
		}
		catch(NoResultException e){
			return 0;
		}
	}


}
