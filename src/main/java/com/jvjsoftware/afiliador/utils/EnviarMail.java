package com.jvjsoftware.afiliador.utils;

import java.util.List;
import java.util.logging.Logger;


/**
 * 
 * Sistema Afiliador 
 * Version 1.0
 *
 * @author Javier Vilcapaza
 * @since 10/12/2014
 *
 */
public class EnviarMail implements Runnable {

	private static Logger log=Logger.getLogger(EnviarMail.class.getName());
	
	//private String destinatario;
	
	private List<String> destinatarios;

	private String titulo;

	private String contenido;

	/**
	 * Constructor
	 * 
	 * @param destinatario : Lista de destinatarios del correo
	 * @param titulo : Asunto del correo
	 * @param contenido : Contenido HTML del correo
	 */
	public  EnviarMail(List<String> destinatario,String titulo,String contenido){
		this.destinatarios=destinatario;
		this.titulo=titulo;
		this.contenido=contenido;
	}

	/**
	 * Método de ejecución del envío de correos
	 */
	@Override
	public void run() {
		
		Mail mail=new Mail();
	    String destinos="";
		for(String destinatario : destinatarios){
			mail.agregarDestinatario(destinatario);
			destinos+=" "+destinatario+",";
		}
		log.info("Enviando notificacion por correo a "+destinos);
		mail.setAsunto(titulo);
		mail.setContenido(contenido);
		if(mail.enviarCorreo()){
			log.info("Notificaciones por correo enviadas a "+destinos);
		}
		else{
			log.info("No se pudo enviar el correo al destinatario");
		}

		
	}
}
