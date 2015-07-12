function guardaArea() {
	$.validator.addMethod("loginRegex", function(value, element) {
		return this.optional(element) || /^[a-z0-9\-]+$/i.test(value);
	}, "Username must contain only letters, numbers, or dashes.");

	
	$("#frmGuardaArea").validate({

		rules : {
			descripcion : {
				required : true,
				loginRegex : true
			},

			
		},

		messages : {
			descripcion : {
				required : true,
				loginRegex : true
			},


		},

		submitHandler : function(form) {

			// validacion.

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {
					var baseURL;
					
					baseURL = $("#baseURL").val();
						$.get(baseURL + "seguridad/area/lista?info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Mantenimiento de Area - Busqueda");
					});
				}
			});
		}
	});
}

function cancelar(){
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/area/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Area - Lista");

	});
}


