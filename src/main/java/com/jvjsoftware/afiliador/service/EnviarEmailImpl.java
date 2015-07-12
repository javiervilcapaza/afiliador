package com.jvjsoftware.afiliador.service;

import org.springframework.stereotype.Service;

import com.jvjsoftware.afiliador.transfer.EnvioEmail;
import com.jvjsoftware.afiliador.utils.EnviarMail;
/**
 * 
 * Sistema Afiliador 
 * Version 1.0
 *
 * @author Javier Vilcapaza
 * @since 10/12/2014
 *
 */
@Service("EnviarEmail")
public class EnviarEmailImpl implements EnviarEmail {


	@Override
	public void enviarEmailMember(EnvioEmail datosEnvio) {
		EnviarMail mail=new EnviarMail(datosEnvio.getDestinatario(),datosEnvio.getTitulo(),datosEnvio.getContenido());
		Thread hiloMail=new Thread(mail,"Envio_Mail");
		hiloMail.start();
	}
	
}
