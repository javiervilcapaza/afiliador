package com.jvjsoftware.afiliador.dao;

import java.util.List;

import com.jvjsoftware.afiliador.domain.Afiliado;
import com.jvjsoftware.afiliador.transfer.BuscaAfiliadoDTO;
import com.jvjsoftware.afiliador.transfer.PaginacionDTO;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 30/11/2014
 * 
 */
public interface AfiliadoDAO extends IDAO<Afiliado> {

	/**
	 * lista Afiliado
	 * 
	 * @param idAfiliado
	 * @return
	 */
	List<Afiliado> listaAfiliados(Integer idAfiliado);

	/**
	 * Lista Paginada
	 * 
	 * @param paginacion
	 * @param busqueda
	 * @return
	 */
	List<Afiliado> listaJson(PaginacionDTO paginacion, BuscaAfiliadoDTO busqueda);

	/**
	 * Total Lista Paginada
	 * 
	 * @param busqueda
	 * @return
	 */
	Number totalListaJson(BuscaAfiliadoDTO busqueda);

	/**
	 * Busca Afiliado
	 * 
	 * @param busca
	 * @return
	 */
	List<Afiliado> buscarAfiliado(String busca);

	/**
	 * Afiliado por Usuario
	 * 
	 * @param idUsuario
	 * @return
	 */
	Afiliado buscarAfiliadoPorUsuario(Integer idUsuario);

	/**
	 * Afiliados con puntos
	 * @return
	 */
	List<Afiliado> obtenerAfiliadosPuntuados();
	
}
