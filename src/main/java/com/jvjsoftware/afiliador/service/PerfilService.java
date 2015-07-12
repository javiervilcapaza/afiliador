package com.jvjsoftware.afiliador.service;

import java.util.List;

import com.jvjsoftware.afiliador.domain.Perfil;

/**
 * 
 * Sistema Afiliador 
 * Version 1.0
 *
 * @author Javier Vilcapaza
 * @since 30/11/2014
 *
 */
public interface PerfilService {

	public List<Perfil> listaPerfiles();
	
	public List<Perfil> busqueda(String nombrePerfil, String estado);
	
	public void guardaPerfil(Perfil perfil);
	
	public Perfil buscarPorId(Integer id);
	
	public Perfil perfilConRoles(Integer id);
	
	public Integer eliminarPerfil(Integer idPerfil) throws Exception;
	
	public Integer campoUnicoNombrePerfil(String nombrePerfil);

	public Integer guardarAsociacion(Integer idPerfil, Integer[] roles);
}
