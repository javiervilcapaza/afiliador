package com.jvjsoftware.afiliador.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jvjsoftware.afiliador.dao.ConfiguracionDAO;
import com.jvjsoftware.afiliador.domain.Configuracion;

@Service("ConfiguracionService")
public class ConfiguracionServiceImpl implements ConfiguracionService{

	@Autowired
	private ConfiguracionDAO configuracionDAO;
	
	Logger log = Logger.getLogger(ConfiguracionServiceImpl.class.getName());
	
	@Override
	public Configuracion configuracion(){
		return configuracionDAO.get(1);
	}
	
	@Override
	@Transactional
	public Integer guardaConfiguracion(Configuracion configuracion){
		Integer respuesta = 0 ;
		try{
			configuracion.setId(1);
			configuracionDAO.guardar(configuracion);
			respuesta = 1;
		}catch(Exception e){
			log.error("Error al guardar la configuracion: " + e.getMessage());
		}
		
		return respuesta;
	}
}
