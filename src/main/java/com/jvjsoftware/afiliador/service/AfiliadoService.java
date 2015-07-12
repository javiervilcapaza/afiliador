package com.jvjsoftware.afiliador.service;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;

import com.jvjsoftware.afiliador.domain.Afiliado;
import com.jvjsoftware.afiliador.domain.Usuario;
import com.jvjsoftware.afiliador.transfer.AfiliadoDTO;
import com.jvjsoftware.afiliador.transfer.AuditoriaDTO;
import com.jvjsoftware.afiliador.transfer.BuscaAfiliadoDTO;
import com.jvjsoftware.afiliador.transfer.PaginacionDTO;

public interface AfiliadoService {

	List<Afiliado> listaAfiliados(Integer idAfiliado);

	Map<String, Object> listaAfiliadoMultinivel(Integer idAfiliado, Integer nivel);

	List<Afiliado> listaJsonAfiliado(PaginacionDTO paginacion, BuscaAfiliadoDTO busqueda);

	Number totalListaJsonAfiliado(BuscaAfiliadoDTO busqueda);

	Afiliado buscaAfiliadoPorId(Integer idAfiliado);

	String cambiaEstado(Integer id, String estado);

	Integer guarda(Afiliado afiliado, AuditoriaDTO auditoriaDTO, UserDetails userDetails);

	List<Map<String, Object>> autocompletePrincipal(String term);

	Afiliado buscarAfiliadoPorUsuario(Integer idUsuario);

	AfiliadoDTO datosAfiliado(Integer idAfiliado);

	AfiliadoDTO asociarUsuario(Usuario usuario, Integer idAfiliado);

	Integer guardaAfiliadoExterno(Afiliado afiliado, AuditoriaDTO auditoriaDTO, Usuario usuario);

	Integer puntos(Integer idAfiliado, Integer punto);

	Integer restablecePuntos();

}
