$(function(){
	var baseURL = $("#baseURL").val();
	$("#distritoAutocomplete").autocomplete({
		source : baseURL + "ubigeo/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idUbigeo = ui.item.id;
			$("#idUbigeo").val(idUbigeo);
		}
	});
});


function guarda() {

	var baseURL;
	baseURL = $("#baseURL").val();
	
	$("#frmGuarda")
			.validate(
					{

						rules : {
						
							ruc: {
								number : true,
								maxlength : 11,
								minlength : 10,
								required: true
							},
							razonSocial:"required",
							nombreComercial:"required"
								

						},

						messages : {
							ruc: {
								number : "Este campo es numerico",
								maxlength : "Maximo 11 caracteres",
								minlength : "Minimo 10 caracteres",
								required: "Este campo es requerido"
							},
							razonSocial:"Este campo es requerido",
							nombreComercial:"Este campo es requerido"
						},

						submitHandler : function(form) {

							// validacion.

							$.ajax(form.action,	{
												async : false,
												type : "POST",
												data : $(form).serialize(),
												success : function(contenido) {
													$.get(baseURL + "compras/proveedor/lista", function(respuesta) {
														$("#contenidoPrincipal").html(respuesta);
														$("#title-page").html("Proveedor - Listado");
													}).fail(function() {
														$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
													});
												}
											}).fail(function() {
										alert("No se ha podido guardar...");
									});
							;
						}
					});
	
}

function cancelar() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "compras/proveedor/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proveedor - Listado");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}



function nuevoContacto(idProveedor) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "compras/proveedor/contacto/formulario?idProveedor=" + idProveedor,
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html(
						"Proveedor - Nuevo Contacto");
			});
}

function editarContacto(idProveedor, idContacto) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "compras/proveedor/contacto/formulario?idProveedor=" + idProveedor
			+ "&idContacto=" + idContacto, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proveedor - Editar Contacto");
	});
}

function eliminarContacto(idProveedor, idContacto) {

	var confirmacion = confirm("Desea eliminar permanentemente este Contacto?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "compras/proveedor/contacto/eliminar?idContacto="
				+ idContacto, function(respuesta) {

			if (respuesta != null) {
				info = "Eliminado Correctamente";
			} else {
				info = "El Contacto no fue eliminado";
			}

			$.get(baseURL + "compras/proveedor/formulario?info=" + info
					+ "&idProveedor=" + idProveedor, function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Proveedor - Edicion");
			});

		});

	}
}


// cuenta bancaria

function nuevaCuentaBancaria(idProveedor) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "compras/proveedor/cuentaBancaria/formulario?idProveedor=" + idProveedor,
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html(
						"Proveedor - Nueva Cuenta Bancaria");
			});
}

function editarCuentaBancaria(idProveedor, idCuentaBancaria) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "compras/proveedor/cuentaBancaria/formulario?idProveedor=" + idProveedor
			+ "&idCuentaBancaria=" + idCuentaBancaria, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proveedor - Editar Cuenta Bancaria");
	});
}

function eliminarCuentaBancaria(idProveedor, idContacto) {

	var confirmacion = confirm("Desea eliminar permanentemente esta Cuenta?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "compras/proveedor/cuentaBancaria/eliminar?idCuentaBancaria="
				+ idContacto, function(respuesta) {

			if (respuesta != null) {
				info = "Eliminado Correctamente";
			} else {
				info = "El Contacto no fue eliminado";
			}

			$.get(baseURL + "compras/proveedor/formulario?info=" + info
					+ "&idProveedor=" + idProveedor, function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Proveedor - Edicion");
			});

		});

	}
}
