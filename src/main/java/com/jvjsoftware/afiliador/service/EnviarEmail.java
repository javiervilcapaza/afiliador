package com.jvjsoftware.afiliador.service;

import com.jvjsoftware.afiliador.transfer.EnvioEmail;


/**
 * 
 * @author BTG
 *
 * Interfaz utilizada por el servicio encargado de enviar correos electrónicos
 * 
 */
public interface EnviarEmail {
	
	/**
	 * 
	 * @param datosEnvio : Clase que contiene los datos para el envío del correo
	 * 
	 * Método que se encarga de enviar un correo electrónico a una lista de destinatarios
	 */
	public void enviarEmailMember(EnvioEmail datosEnvio);

}
