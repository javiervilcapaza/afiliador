package com.jvjsoftware.afiliador.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;


/**
 * 
 * Sistema Afiliador 
 * Version 1.0
 *
 * @author Javier Vilcapaza
 * @since 10/12/2014
 *
 */
public class Mail{

	private static Logger log=Logger.getLogger(Mail.class.getName());

	private String server;

	private Integer port;

	private InternetAddress from;

	private String asunto;

	private List<InternetAddress> destinatarios;

	private List<InternetAddress> copias;

	private String contenido;

	private String tipoContenido;

	private String archivo;

	private Object[] parametros;

	/** Configuracion inicial */
	public Mail(){
		server=Config.getPropiedad("mail.host");
		port=Config.getPropiedadInt("mail.port");
		try{
			from=new InternetAddress(Config.getPropiedad("mail.user"));
		}
		catch(AddressException e){
			from=null;
		}
		tipoContenido="text/html; charset=UTF-8";
		destinatarios=new ArrayList<InternetAddress>();
		copias=new ArrayList<InternetAddress>();
		// adjuntos=new ArrayList<String>();
	}

	public void setArchivo(String archivo,Object...parametros){
		this.archivo=archivo;
		this.parametros=parametros;
	}

	public void setAsunto(String asunto){
		this.asunto=asunto;
	}

	/** Agrega destinatario a la lista de destinatarios */
	public void agregarDestinatario(String correo){
		try{
			InternetAddress ia=new InternetAddress(correo);
			destinatarios.add(ia);
		}
		catch(AddressException e){
			log.info("No se pudo agregar el destinatario");
		}
	}

	public void agregarCopia(String correo){
		try{
			InternetAddress ia=new InternetAddress(correo);
			copias.add(ia);
		}
		catch(AddressException e){
		}
	}

	public void setContenido(String contenido){
		this.contenido=contenido;
	}

	/** Envío correo electrónico al destinatario */
	public boolean enviarCorreo(){
		if(from != null && destinatarios.size() > 0){
			if(archivo != null){
				procesarContenido();
			}
			if(asunto == null){
				log.info("Se debe especificar un asunto para el correo");
				return false;
			}
			if(contenido == null){
				log.info("Se debe especificar un contenido para el correo");
				return false;
			}
			Properties p=new Properties();
			p.put("mail.smtp.port",port);
			p.put("mail.smtp.host",server);
			p.put("mail.smtp.starttls.enable",Config.getPropiedad("mail.starttls.enable"));
			p.put("mail.smtps.auth",Config.getPropiedad("mail.auth"));
			Session sesion=Session.getInstance(p);
			sesion.setDebug(Config.getPropiedadBoolean("mail.debug"));
			MimeMessage msg=new MimeMessage(sesion);
			try{
				msg.setFrom(from);
				for(InternetAddress ia : destinatarios){
					msg.addRecipient(Message.RecipientType.TO,ia);
				}
				Multipart mp=new MimeMultipart();
				MimeBodyPart texto=new MimeBodyPart();
				texto.setContent(contenido,tipoContenido);
				mp.addBodyPart(texto);
				msg.setContent(mp);
				msg.setSubject(asunto);
				msg.saveChanges();
				Transport t=sesion.getTransport(Config.getPropiedad("mail.transport"));
				t.connect(server,port,Config.getPropiedad("mail.user"),Config.getPropiedad("mail.pass"));
				t.sendMessage(msg,msg.getAllRecipients());
				t.close();
			}
			catch(MessagingException e){
				log.info("Error enviando correo");
				return false;
			}
			return true;
		}
		return false;
	}

	private void procesarContenido(){
		String ruta=Config.getPropiedad("mail.directorio");
		if(!ruta.endsWith(File.separator)){
			ruta+=File.separator;
		}
		ruta+=archivo;
		String titulo="";
		StringBuilder cuerpo=new StringBuilder();
		InputStream is=null;
		InputStreamReader ir=null;
		BufferedReader reader=null;
		try{
			is=new FileInputStream(ruta);
			ir=new InputStreamReader(is,"UTF-8");
			reader=new BufferedReader(ir);
			boolean mas=true;
			while(mas){
				String linea=reader.readLine();
				if(linea == null){
					mas=false;
				}
				else if(linea.toLowerCase().startsWith("asunto:")){
					titulo=linea.substring(7).trim();
				}
				else if(!linea.startsWith("#")){
					cuerpo.append(linea).append("\n\r");
				}
			}
		}
		catch(IOException e){
			log.info("Error procesando archivo [" + ruta + "]");
		}
		finally{
			if(reader != null){
				try{
					reader.close();
				}
				catch(IOException e){
				}
			}
			if(ir != null){
				try{
					ir.close();
				}
				catch(IOException e){
				}
			}
			if(is != null){
				try{
					is.close();
				}
				catch(IOException e){
				}
			}
		}
		//setAsunto(titulo);
		if(parametros != null && parametros.length > 0){
			setContenido(MessageFormat.format(cuerpo.toString(),parametros));
			setAsunto(MessageFormat.format(titulo,parametros));
		}
		else{
			setContenido(cuerpo.toString());
			setAsunto(titulo);
		}
	}
}
