var baseURL;

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

	new AjaxUpload($("#subirArchivoAdjunto"),{
		action :baseURL + "mantenimientoInterno/empresa/subeArchivos/"+$("#idEmpresa").val(),
		name : "archivo",
		onSubmit : function(file, ext) {

			if (!(ext && /^(jpg|png|gif|doc|docx|xls|xlsx|rar|pdf|pdfx)$/.test(ext))) {

				// extensiones permitidas
				alert('Solo se permiten archivos .jpg .png .gif .doc .docx .rar .pdf');
				// cancela upload
				return false;
			} else {
				$('#loaderAjax').show();
				jQuery.jGrowl("Cargando...", { life: 8000});
				this.disable();
			}
		},
		onComplete : function(file, response) {
			respuesta = $.parseJSON(response);
			if(respuesta.respuesta==null){
				jQuery.jGrowl("No se ha subido el archivo correctamente", { life: 3000});
			}else{
				$.get(baseURL+ "mantenimientoInterno/empresa/guardaDescripcion?id=" + respuesta.respuesta+"&descripcion="+$("#documentoDescripcion").val(), function(respuesta){
					$.get(baseURL+ "mantenimientoInterno/editarEmpresa/" + $("#idEmpresa").val(),
							function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								jQuery.jGrowl("Se ha subido el archivo correctamente", { life: 3000});
							});
				});
			}
		}

	});

	
	
});


	function guarda() {

		$.validator.addMethod("alfanumerico", function(value, element) {
			return this.optional(element) || /^[-._a-z0-9\- ´]+$/i.test(value);
		}, "Este campo es alfanumerico.");

		
		$("#frmGuarda").validate({
							rules : {
								nombreEmpresa : "required",
								razonSocial : {required:true},
								ruc:{required:true,number:true,minlength : 8},
							},
							messages : {
								nombreEmpresa : "Ingrese este campo.",
								razonSocial : {required:"Ingrese este campo."},
								ruc: {required:"Ingrese este campo.",number:"Este campo es numerico.",minlength : "Minimo 8 caracteres"},
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
															$.get(baseURL + "mantenimientoInterno/editarEmpresa/" + contenido,
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
	function Natural(){
		$("#lblRazonSocial").html("Nombres y Apellidos");
		$("#pRUC").hide();
		$("#pDNI").show();
	}
	
	function Juridica(){
		$("#lblRazonSocial").html("Razon Social");
		$("#pDNI").hide();
		$("#pRUC").show();
	}
	
	
	function cancelar(){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/listarEmpresa", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento Empresa Origen - Listado");

		});		
	}
	
	function agregarAccionista(idEmpresa){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/agregarAccionista?idEmpresa="+idEmpresa, function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Asignacion de Socio - Nuevo");

		});		
	}
	
	function editarAccionista(idEmpresa,idAccionista){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/agregarAccionista?idEmpresa="+idEmpresa+"&idAccionista="+idAccionista, function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Asignacion de Socio - Edicion");
		});		
	}
	

	function eliminarAccionista(idAccionista) {

		var confirmacion = confirm("Desea eliminar permanentemente este Accionista?");
		var empresa = $("#idEmpresa").val();
		if (confirmacion == true) {

			var baseURL, info;

			baseURL = $("#baseURL").val();
			$.get(baseURL + "mantenimientoInterno/eliminarAccionista?id=" + idAccionista, function(
					respuesta) {
				if (respuesta!=null && respuesta!=-1) {
					info = "Eliminado Correctamente";
					$.get(baseURL + "mantenimientoInterno/editarEmpresa/" + empresa,
							function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html("Mantenimiento Empresa Origen - Edicion");
								jQuery.jGrowl("Eliminado Exitosamente", {life : 3000});

					});
				} 
				else if(respuesta==-1){
					info="No se puede eliminar porque se hace referencia desde otro mantenimiento";
				}
				else {
					info = "No fue eliminado";
				}

			});

		}
	}
	
	function eliminarArchivoVersion(idArchivoVersion){
		baseURL = $("#baseURL").val();
		if (confirm("Esta seguro que desea eliminar este archivo ?")) {
			$.get(baseURL+ "/mantenimientoInterno/empresa/eliminarVersion?idArchivoVersion="+idArchivoVersion,function(respuesta) {
				if(respuesta==1){
					$.get(baseURL+ "mantenimientoInterno/editarEmpresa/" + $("#idEmpresa").val(),
							function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
							});
					jQuery.jGrowl("El archivo se ha eliminado correctamente", { life: 8000});				
				}
				if(respuesta==0){
					jQuery.jGrowl("El archivo no existe", { life: 8000});
				}
				if(respuesta==3){
					jQuery.jGrowl("No se pudo elimar", { life: 8000});
				}	

			});

		}
	}



