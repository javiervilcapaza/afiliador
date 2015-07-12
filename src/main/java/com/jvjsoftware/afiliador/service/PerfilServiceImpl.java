package com.jvjsoftware.afiliador.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jvjsoftware.afiliador.dao.PerfilDAO;
import com.jvjsoftware.afiliador.dao.RolDAO;
import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Rol;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */
@Service("PerfilService")
public class PerfilServiceImpl implements PerfilService {

	@Autowired
	private PerfilDAO perfilDAO;

	@Autowired
	private RolDAO rolDAO;

	@Override
	public List<Perfil> listaPerfiles() {
		return perfilDAO.getTodos();
	}

	@Override
	public Perfil buscarPorId(Integer id) {
		return perfilDAO.get(id);
	}

	Logger log = Logger.getLogger(PerfilServiceImpl.class.getName());

	@Override
	@Transactional(readOnly = true)
	public Perfil perfilConRoles(Integer id) {

		Perfil perfil = perfilDAO.get(id);

		// Para que debuelva perfiles con roles asignados

		for (Rol rol : perfil.getRol()) {
			System.out.println(rol.getNombreRol());

		}
		return perfil;
	}

	@Override
	public List<Perfil> busqueda(String nombrePerfil, String estado) {
		return perfilDAO.buscaPerfil(nombrePerfil, estado);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void guardaPerfil(Perfil perfil) {
		perfilDAO.guardar(perfil);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Integer eliminarPerfil(Integer idPerfil) throws Exception {

		Perfil perfil = buscarPorId(idPerfil);

		try {
			return perfilDAO.eliminar(perfil);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new Exception("SE REFERENCIA DESDE OTRA TABLA");

		}
	}

	@Override
	public Integer campoUnicoNombrePerfil(String nombrePerfil) {
		return perfilDAO.campoUnicoNombrePerfil(nombrePerfil);
	}

	@Override
	@Transactional
	public Integer guardarAsociacion(Integer idPerfil, Integer[] roles) {
		Integer respuesta = 0;
		boolean perfilRol = false;
		try {
			Perfil perfil = perfilDAO.get(idPerfil);
			List<Rol> rolesPerfil = new ArrayList<Rol>();
			if (roles != null) {
				for (Integer id : roles) {
					Rol rol = rolDAO.get(id);
					for(Rol rolPerfil : perfil.getRol()){
						if(rolPerfil == rol){
							perfilRol =true;
							continue;
						}
					}
					if(perfilRol){
						perfilRol = false;
						continue;
					}
					rolesPerfil.add(rol);
				}
			}
			perfil.setRol(rolesPerfil);
			guardaPerfil(perfil);

			respuesta = 1;
		} catch (Exception e) {
			log.error("Error al guardar asociacion: " + e.getMessage());
		}
		return respuesta;
	}

}
