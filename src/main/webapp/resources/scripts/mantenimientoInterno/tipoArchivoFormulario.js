var baseURL;
$.validator.addMethod("alfanumerico", function(value, element) {
	return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
}, "Este campo es alfanumerico.");

	$("#frmGuardaTipoArchivo").validate({

		rules : {
			descripcion : "required",
			codigo : {required:true,alfanumerico:true},


			
		},

		messages : {
			descripcion : "Ingrese este campo.",
			codigo : {required:"Ingrese este campo.",alfanumerico:"Este campo es alfanumerico."},


		},

		submitHandler : function(form) {

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {	
					if(contenido=="error"){
						var mensaje="Este tipo de Archivo ya ha sido registrado";
						alert(mensaje);

					}
					else{
						baseURL = $("#baseURL").val();
						$.get(baseURL + "mantenimientoInterno/listarTiposArchivos?info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Mantenimiento Tipo de Archivo - Listado");
					});
					}
					
					
				}
			});
		}
	});
	
	function cancelarTipoArchivo(){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/listarTiposArchivos", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento Tipo de Archivo - Listado");

		});
	}



