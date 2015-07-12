package com.jvjsoftware.afiliador.service;

import com.jvjsoftware.afiliador.domain.Configuracion;

public interface ConfiguracionService {

	Configuracion configuracion();

	Integer guardaConfiguracion(Configuracion configuracion);

}
