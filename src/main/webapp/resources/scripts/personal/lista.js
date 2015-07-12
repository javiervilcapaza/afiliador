
$(function () {

	var baseURL = $("#baseURL").val();

	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "personalController/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center" },
                       { sClass: "center" },
                       { sClass: "center" },
                       { sClass: "center" },
                       { sClass: "center" } 
                   ],
        
        
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

			"sInfoEmpty" : "No hay resultados de búsqueda",

			"sZeroRecords" : "No hay registros a mostrar",

			"sProcessing" : "Espere, por favor...",

			"sSearch" : "Buscar:",

		}
    });


	$("#fechaIngresoInicio").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
	        $( "#fechaIngresoFin" ).datepicker( "option", "minDate", selectedDate );
	      }
	});
	
	$("#fechaIngresoFin").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
		        $( "#fechaIngresoInicio" ).datepicker( "option", "maxDate", selectedDate );
		      },
	});
	
	$("#fechaIngreso").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1'
	});
	
	$("#fechaNacimiento").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1'
	});
	
	$("#ubigeoAutocomplete").autocomplete({
		source : baseURL + "ubigeo/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idUbigeo = ui.item.id;
			$("#ubigeo").val(idUbigeo);
		}
	});
	$("#lugarNacimientoAutocomplete").autocomplete({
		source : baseURL + "ubigeo/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idUbigeo = ui.item.id;
			$("#lugarNacimiento").val(idUbigeo);
		}
	});
});

function buscar() {
	var baseURL = $("#baseURL").val();
	if (
			$("#nombres").val() != "" ||
			$("#apPaterno").val() != "" || 
			$("#dni").val() != "" || 
			$("#fechaIngresoInicio").val() != "" ||
			$("#fechaIngresoFin").val() != "" ||
			$("#estado").val() != ""
		) {		
			$.ajax({
					url : baseURL + "/personalController/buscaEmpleado",
					type : "POST",
					data : {
						nombres : $("#nombres").val(),
						apPaterno : $("#apPaterno").val(),
						dni : $("#dni").val(),
						fechaIngresoInicio : $("#fechaIngresoInicio").val(),
						fechaIngresoFin : $("#fechaIngresoFin").val(),
						estado : $("#estado").val()
					}
				}).done(function( html ) {
					$("#lista").html(html);
				});;

				// Validacion

	} else {
		alert("Inserte algun filtro de busqueda");
	}
};

function limpiarFormularioBusqueda() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "personalController/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Administracion del Personal - Listado");
	});
}

function limpiarFormulario() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "personalController/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Administracion del Personal - Nuevo");
	});
}

function verEmpleado(idEmpleado){
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "personalController/verEmpleado?idEmpleado="+idEmpleado, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Administracion del Personal - Ficha de Datos del Empleado");
	});
};

function editarEmpleado(idEmpleado) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "personalController/formulario?idEmpleado=" + idEmpleado, function(
			respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Administracion del Personal - Edicion");

	});
};

function cancelar() {
	var baseURL;
	$("#contenidoPrincipal").html("Cargando...");
	baseURL = $("#baseURL").val();
	
	$.get(baseURL + "/personalController/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function crearEmpleado() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "personalController/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Administracion del Personal - Nuevo");

	});

};

function guardaEmpleado() {
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ´]+$/i.test(value);
	}, "Este campo es alfanumerico.");

	$("#frmGuarda")
			.validate(
					{
						rules : {
							dni : {
								number : true,
								maxlength : 8,
								minlength : 7,
								required: true
							},
							nombres : {
								required : true,
								alfanumerico : true,
								maxlength : 250
							},
							apPaterno : {
								required : true,
								alfanumerico : true,
								maxlength : 250
							},
							apMaterno : {
								required : true,
								alfanumerico : true,
								maxlength : 250
							},
							direccion : {
								required : true,
								alfanumerico : true,
							},
							telefono : {
								required : true,
								number : true,
							},
							celular : {
								required : true,
								number : true,
							},
							celularMundomoda : {
								required : true,
								number : true,
							},
							email : {
								required : true,
								email : true,
							},
							emailMundomoda : {
								required : true,
								email : true,
							},
							email : {
								required : true,
								email : true,
							},
							estadoCivil : {
								required : true,
							},
							distritoAutocomplete : {
								required : true,
								alfanumerico : true
							},
							fechaIngreso : "required",
							fechaNacimiento : "required"
						},
						messages : {
							dni : {
								required : "Este campo es requerido",
								number : "Este campo es de tipo numerico",
								maxlength : "maximo 8 caracteres",
								minlength : "minimo 8 caracteres"
							},
							nombres : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico",
								maxlength : "maximo 250 caracteres"
							},
							apPaterno : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico",
								maxlength : "maximo 250 caracteres"
							},
							apMaterno : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico",
								maxlength : "maximo 250 caracteres"
							},
							direccion : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico" 
							},
							telefono : {
								required : "Este campo es requerido",
								number : "Este campo es de tipo numerico"
							},
							celular : {
								required : "Este campo es requerido",
								number : "Este campo es de tipo numerico"
							},
							celularMundomoda : {
								required : "Este campo es requerido",
								number : "Este campo es de tipo numerico"
							},
							email : {
								required : "Este campo es requerido",
								email : "Inserte una direccion de correo electronico valido"
							},
							emailMundomoda : {
								required : "Este campo es requerido",
								email : "Inserte una direccion de correo electronico valido"
							},
							distritoAutocomplete : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico"
							},
							fechaIngreso : "Este campo es requerido",
							fechaNacimiento : "Este campo es requerido"
						},
						submitHandler : function(form) {
							// Validacion
							$.ajax(
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
												$.get(
														baseURL + "/personalController/formulario?idEmpleado=" + contenido, function(respuesta) {
															$("#contenidoPrincipal").html(respuesta);
															$("#title-page").html("Administracion del Personal - Edicion");
														}
												);
												jQuery.jGrowl("Guardado Exitosamente", {life : 5000});		
											} else {
												alert("El cliente con este DNI ya fue registrado");
											}
										}
									}).fail(
											function() {
												alert("No se pudo establecer la conexion ");
											});;
						}
					});
}

