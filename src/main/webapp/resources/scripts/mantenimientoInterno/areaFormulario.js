var baseURL;
$.validator.addMethod("alfanumerico", function(value, element) {
	return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
}, "Este campo es alfanumerico.");

	$("#frmGuardaArea").validate({

		rules : {
			descripcion : "required",


			
		},

		messages : {
			descripcion : "Ingrese este campo.",


		},

		submitHandler : function(form) {

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {	
					if(contenido=="error"){
						var mensaje="Esta Area ya ha sido registrado";
						alert(mensaje);

					}
					else{
						baseURL = $("#baseURL").val();
						$.get(baseURL + "mantenimientoInterno/listarAreas?info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Mantenimiento Area - Listado");
					});
					}
					
				}
			});
		}
	});
	
	function cancelarArea(){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/listarAreas", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento Area - Listado");

		});
	}



