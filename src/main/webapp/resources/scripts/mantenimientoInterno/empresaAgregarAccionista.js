var baseURL;

	function guarda() {

	var empresa = $("#idEmpresa").val();
		$("#frmGuarda").validate({
							rules : {
								nombreCompleto : "required",
								dni:{required:true,number:true,minlength : 8},
							},
							messages : {
								nombreCompleto : "Ingrese este campo.",
								dni: {required:"Ingrese este campo.",number:"Este campo es numerico.",minlength : "Minimo 8 caracteres"},
							},
							submitHandler : function(form) {
								// validacion.
								$.ajax(form.action,	{
													async : false,
													type : "POST",
													data : $(form).serialize(),
													success : function(contenido) {
														if (contenido != -1) {
															
															var baseURL;
															baseURL = $("#baseURL").val();
															$("#contenidoPrincipal").html("Cargando . . .");
															$.get(baseURL + "mantenimientoInterno/editarEmpresa/" + empresa,
																	function(respuesta) {
																		$("#contenidoPrincipal").html(respuesta);
																		$("#title-page").html("Mantenimiento Empresa Origen - Edicion");
																		jQuery.jGrowl("Guardado Exitosamente", {life : 5000});

																	});
																											}
														 else {
															alert("la empresa no fue registrada.");
														}
													}
												}).fail(function() {
											alert("No se ha podido guardar...");
										});
								;
							}
						});
		
	}
	
	function cancelar(idEmpresa){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/editarEmpresa/" + idEmpresa,
				function(respuesta) {
					$("#contenidoPrincipal").html(respuesta);
					$("#title-page").html("Mantenimiento Empresa Origen - Edicion");

				});	
	}



