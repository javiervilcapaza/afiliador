function guardaCliente() {

	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ´]+$/i.test(value);
	}, "Este campo es alfanumerico.");

	$("#frmGuarda")
			.validate(
					{

						rules : {
							nombresNatural : {
								required : true,
								alfanumerico : true,
								maxlength : 250
							},
							telefono : "number",
							celular : "number",
							ruc : {
								required : true,
								number : true,
								maxlength : 11
							},
							razonSocial : {
								required : true,
								alfanumerico : true
							},
							nombreComercial : {
								required : true,
								alfanumerico : true
							},
							tipoPersona : "required",
							DNI : {
								number : true,
								maxlength : 8
							},
							direccion : "alfanumerico",
							representanteComercial : "alfanumerico",
							nombreComercialNatural : "alfanumerico",
							apellidoPaterno : "alfanumerico",
							apellidoMaterno : "alfanumerico",
							direccionNatural : "alfanumerico",
							email : "email"

						},

						messages : {
							email : "Inserte una direccion de correo electronico valido",
							ruc : {
								required : "Este campo es requerido",
								number : "Este campo es numerico",
								maxlength : "maximo 11 caracteres"
							},
							razonSocial : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico",
							},
							nombreComercial : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico",
							},
							tipoPersona : "Este campo es requerido",
							nombresNatural : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico",
								maxlength : "maximo 250 caracteres"
							},
							telefono : "Este campo es de tipo numerico",
							celular : "Este campo es de tipo numerico",
							DNI : {
								number : "Este campo es de tipo numerico",
								maxlength : "maximo 8 caracteres"
							},

						},

						submitHandler : function(form) {

							// validacion.

							$
									.ajax(
											form.action,
											{
												async : false,
												type : "POST",
												data : $(form).serialize(),
												success : function(contenido) {
													if (contenido != 0) {

														var baseURL;

														baseURL = $("#baseURL").val();

														$("#contenidoPrincipal").html("Cargando . . .");
														$.get(baseURL + "venta/cliente/formulario?idCliente=" + contenido, function(
																respuesta) {
															$("#contenidoPrincipal").html(respuesta);
															$("#title-page").html("Informacion del Cliente - Edicion");

														});
														jQuery.jGrowl("Guardado Exitosamente", {life : 5000});
														
													} else {
														alert("El cliente con este ruc ya fue registrado")
													}
												}
											})
									.fail(
											function() {
												alert("Razon social ya fue registrado ");
											});
							;
						}
					});
}

function cancelar() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/cliente/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Informacion del Cliente - Lista");

	});
}

function nuevoContacto(idCliente) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/cliente/contacto/formulario?idCliente=" + idCliente,
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html(
						"Informacion del Cliente - Nuevo Contacto");
			});
}

function editarContacto(idCliente, idContacto) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/cliente/contacto/formulario?idCliente=" + idCliente
			+ "&idContacto=" + idContacto, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Informacion del Cliente - Editar Contacto");
	});
}

function eliminarContacto(idCliente, idContacto) {

	var confirmacion = confirm("Desea eliminar permanentemente este Contacto?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "venta/cliente/contacto/eliminar?idContacto="
				+ idContacto, function(respuesta) {

			if (respuesta != null) {
				info = "Eliminado Correctamente";
			} else {
				info = "El Contacto no fue eliminado";
			}

			$.get(baseURL + "venta/cliente/formulario?info=" + info
					+ "&idCliente=" + idCliente, function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Informacion del Cliente - Edicion");
			});

		});

	}
}

$(function() {

	var baseURL;

	baseURL = $("#baseURL").val();
	$("#distritoAutocomplete").autocomplete({
		source : baseURL + "ubigeo/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idUbigeo = ui.item.id;
			$("#distrito").val(idUbigeo);
		}
	});
	$("#distritoNaturalAutocomplete").autocomplete({
		source : baseURL + "ubigeo/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idUbigeo = ui.item.id;
			$("#distritoNatural").val(idUbigeo);
		}
	});

	$("#tabla")
			.dataTable(
					{
						"bFilter" : false,
						"sPaginationType" : "full_numbers",
						"oLanguage" : {
							"oPaginate" : {
								"sPrevious" : "Anterior",
								"sNext" : "Siguiente",
								"sLast" : "Ultima",
								"sFirst" : "Primera"
							},

							"sLengthMenu" : 'Mostrar <select>'
									+ '<option value="5">5</option>'
									+ '<option value="10">10</option>'
									+ '<option value="30">30</option>'
									+ '<option value="40">40</option>'
									+ '<option value="50">50</option>'
									+ '<option value="-1">Todos</option>'
									+ '</select> registros',

							"sInfo" : "Mostrando del _START_ a _END_ (Total: _TOTAL_ resultados)",

							"sInfoFiltered" : " - filtrados de _MAX_ registros",

							"sInfoEmpty" : "No hay resultados",

							"sZeroRecords" : "No hay registros a mostrar",

							"sProcessing" : "Espere, por favor...",

							"sSearch" : "Buscar:",

						}
					});
});

function personaJuridica() {
	$("#personaNatural").hide();
	$("#personaJuridica").show();
	$("#restanteFormulario").show();

};
function personaNatural() {
	$("#personaJuridica").hide();
	$("#personaNatural").show();
	$("#restanteFormulario").show();
};