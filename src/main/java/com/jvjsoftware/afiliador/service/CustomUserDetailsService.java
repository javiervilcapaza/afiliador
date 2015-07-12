package com.jvjsoftware.afiliador.service;

import java.util.ArrayList;
import java.util.Collection;
//import java.util.Collection;
import java.util.List;

//import com.mundomoda.domain.Perfil;
//import com.mundomoda.domain.Rol;
//import pe.com.mundomoda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jvjsoftware.afiliador.dao.PerfilDAO;
import com.jvjsoftware.afiliador.dao.UsuarioDAO;
import com.jvjsoftware.afiliador.domain.Perfil;
import com.jvjsoftware.afiliador.domain.Rol;
import com.jvjsoftware.afiliador.domain.Usuario;

/**
 * 
 * Sistema Afiliador Version 1.0
 * 
 * @author Javier Vilcapaza
 * @since 29/11/2014
 * 
 */
@Service()
@Transactional(readOnly = true)
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UsuarioDAO usuarioDAO;

	@Autowired
	private PerfilDAO perfilDAO;

	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {

		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;

		try {

			Usuario usuario = usuarioDAO.buscaUsuario(username);

			if (usuario == null) {
				throw new UsernameNotFoundException(username);
			}

			Boolean estado = false;

			for (Perfil perfil : usuario.getPerfil()) {
				if (usuario.getEstado() == 1 & perfil.getEstado().equals("S")) {
					estado = true;
				}
			}

			List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();

			for (Perfil perfil : usuario.getPerfil()) {
				for (Rol rol : perfil.getRol()) {
					roles.add(new SimpleGrantedAuthority(rol.getNombreRol()));
				}
			}

			return new User(usuario.getUsername(), usuario.getPassword(),
					estado, accountNonExpired, credentialsNonExpired,
					accountNonLocked, roles);

		} catch (Exception e) {

			throw new RuntimeException(e);
		}
	}

	/**
	 * Retrieves a collection of {@link GrantedAuthority} based on a numerical
	 * role
	 * 
	 * @param role
	 *            the numerical role
	 * @return a collection of {@link GrantedAuthority
	 */

	public Collection<? extends GrantedAuthority> getAuthorities(
			List<String> roles) {
		List<GrantedAuthority> authList = getGrantedAuthorities(roles);
		return authList;
	}

	/**
	 * Converts a numerical role to an equivalent list of roles
	 * 
	 * @param role
	 *            the numerical role
	 * @return list of roles as as a list of {@link String}
	 */
	public List<String> getRoles(List<String> roles) {
		return roles;
	}

	/**
	 * Wraps {@link String} roles to {@link SimpleGrantedAuthority} objects
	 * 
	 * @param roles
	 *            {@link String} of roles
	 * @return list of granted authorities
	 */
	public static List<GrantedAuthority> getGrantedAuthorities(
			List<String> roles) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (String role : roles) {
			authorities.add(new SimpleGrantedAuthority(role));
		}
		return authorities;
	}
}
