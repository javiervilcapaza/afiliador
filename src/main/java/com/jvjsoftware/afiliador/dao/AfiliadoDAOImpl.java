package com.jvjsoftware.afiliador.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.jvjsoftware.afiliador.domain.Afiliado;
import com.jvjsoftware.afiliador.transfer.BuscaAfiliadoDTO;
import com.jvjsoftware.afiliador.transfer.PaginacionDTO;
import com.jvjsoftware.afiliador.utils.Util;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */
@Repository("AfiliadoDAO")
public class AfiliadoDAOImpl extends DAO<Afiliado> implements AfiliadoDAO {

	Logger log = Logger.getLogger(AfiliadoDAOImpl.class.getName());
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Afiliado> listaAfiliados(Integer idAfiliado) {
		List<Afiliado> afiliados = new ArrayList<Afiliado>();
		try {
			Query q = em.createQuery("FROM Afiliado a WHERE a.afiliadoPadre = :idAfiliado and a.estado not in ('E','N')");
			q.setParameter("idAfiliado", idAfiliado);
			afiliados = q.getResultList();
		} catch (Exception e) {
			log.error("Error al listar afiliados: "+e.getMessage());
			return afiliados;
		}
		return afiliados;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<Afiliado> listaJson(PaginacionDTO paginacion, BuscaAfiliadoDTO busqueda) {

		String sql="from Afiliado a";
		
		List<Map<String, Object>> lista = new ArrayList<Map<String, Object>>();
		Map<String, Object> datos = new HashMap<String, Object>();
		if(!busqueda.getDni().equals("")){datos.put("1", "upper(a.persona.dni) like upper(:dni)");}
		if(!busqueda.getNombresApellidos().equals("")){datos.put("2", "(upper(a.persona.nombres) like upper(:nombres) or upper(a.persona.apellidos) like upper(:nombres))");}
		if(busqueda.getAfiliadoPadre() != null){datos.put("1", "a.afiliadoPadre = :afiliadoPadre");}
		datos.put("3", "a.estado not in ('E')");
		lista.add(datos);
		
		sql += Util.query(lista);
		
		Map<String, Object> data = new HashMap<String, Object>();
		
		data.put("0", "a.persona.dni");
		data.put("1", "a.persona.apellidos");		
		
		sql+=Util.OrderByPagination(data, paginacion.getiSortCol_0(), paginacion.getsSortDir_0());
		
		Query q = em.createQuery(sql);
		
		if(!busqueda.getDni().equals("")){q.setParameter("dni","%"+busqueda.getDni()+"%");}
		if(!busqueda.getNombresApellidos().equals("")){q.setParameter("nombres","%"+busqueda.getNombresApellidos()+"%");}
		if(busqueda.getAfiliadoPadre() != null){q.setParameter("afiliadoPadre",busqueda.getAfiliadoPadre());}
			
		if(paginacion.getiDisplayLength()!=-1){
			q.setMaxResults(paginacion.getiDisplayLength());	
		}
		q.setFirstResult(paginacion.getiDisplayStart());	

		try{
			return q.getResultList();
		}
		catch(NoResultException e){
			return null;
		}
	}
	
	@Override
	public Number totalListaJson(BuscaAfiliadoDTO busqueda) {

		String sql="select count(a) from Afiliado a";
		
		List<Map<String, Object>> lista = new ArrayList<Map<String, Object>>();
		Map<String, Object> datos = new HashMap<String, Object>();
		if(!busqueda.getDni().equals("")){datos.put("1", "upper(a.persona.dni) like upper(:dni)");}
		if(!busqueda.getNombresApellidos().equals("")){datos.put("2", "(upper(a.persona.nombres) like upper(:nombres) or upper(a.persona.apellidos) like upper(:nombres))");}
		if(busqueda.getAfiliadoPadre() != null){datos.put("1", "a.afiliadoPadre = :afiliadoPadre");}
		datos.put("3", "a.estado not in ('E')");
		lista.add(datos);
		
		sql += Util.query(lista);
		
		Query q = em.createQuery(sql);
		
		if(!busqueda.getDni().equals("")){q.setParameter("dni","%"+busqueda.getDni()+"%");}
		if(!busqueda.getNombresApellidos().equals("")){q.setParameter("nombres","%"+busqueda.getNombresApellidos()+"%");}
		if(busqueda.getAfiliadoPadre() != null){q.setParameter("afiliadoPadre",busqueda.getAfiliadoPadre());}
			
		try{
			return (Number) q.getSingleResult();
		}
		catch(NoResultException e){
			return null;
		}
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<Afiliado> buscarAfiliado(String busca) {
		try{
			String sql  = "from Afiliado a where upper(a.persona.nombres) like :busca or upper(a.persona.apellidos) like :busca ";
			Query q = em.createQuery(sql);
			q.setParameter("busca", "%"+busca.toUpperCase()+"%");
			return q.getResultList();
		}catch(NoResultException nr){
			return null;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public Afiliado buscarAfiliadoPorUsuario(Integer idUsuario) {
		try{
			String sql  = "from Afiliado a where a.usuario.id = :idUsuario";
			Query q = em.createQuery(sql);
			q.setParameter("idUsuario",idUsuario);
			return (Afiliado) q.getSingleResult();
		}catch(NoResultException nr){
			return null;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Afiliado> obtenerAfiliadosPuntuados(){
		try{
			String sql  = "from Afiliado a where a.puntos > 0";
			Query q = em.createQuery(sql);
			return q.getResultList();
		}catch(NoResultException nr){
			return null;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	

}
