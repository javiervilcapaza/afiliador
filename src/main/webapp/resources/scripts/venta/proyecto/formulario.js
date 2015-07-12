function guarda() {
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
	}, "Este campo es alfanumerico.");

	$("#frmGuarda")
			.validate(
					{

						rules : {
							nombreProyecto : {
								required : true,
								alfanumerico : true
							},
							

						},

						messages : {
							nombreProyecto : {
								required : "Este campo es requerido",
								alfanumerico : "Este campo es alfanumerico",
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

														baseURL = $("#baseURL")
																.val();
														$
																.get(
																		baseURL
																				+ "venta/proyecto/lista?info="
																				+ contenido,
																		function(
																				respuesta) {
																			$(
																					"#contenidoPrincipal")
																					.html(
																							respuesta);
																			$(
																					"#title-page")
																					.html(
																							"Proyecto por Cliente - Lista");
																		});
													} else {
														alert("El proyecto no fue registrado");
													}
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
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/proyecto/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proyecto por Cliente - Lista");

	});
}


$(function() {
	var baseURL;

	baseURL = $("#baseURL").val();
	$("#descripcionCliente").autocomplete({
		source : baseURL + "venta/proyecto/cliente/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#idCliente").val(idCliente);
		}
	});


});

