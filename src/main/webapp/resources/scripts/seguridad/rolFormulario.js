function guardaRol() {
	$.validator.addMethod("loginRegex", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\-]+$/i.test(value);
	}, "Username must contain only letters, numbers, or dashes.");

	
	$("#frmGuardaRol").validate({

		rules : {
			nombreRol : {
				required : true,
				loginRegex : true
			},

			
		},

		messages : {
			nombreRol : {
				required : "Este campo es requerido",
				loginRegex : "Ingrese letras o numeros"
			},

		},

		submitHandler : function(form) {

			// validacion.

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {
					
					if(contenido=="rol duplicado"){
						
						alert("Nombre de Rol ya existe...");
					}else{
						var baseURL;
					
					baseURL = $("#baseURL").val();
						$.get(baseURL + "seguridad/rol/lista?info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Mantenimiento de Rol - Busqueda");
					});
					}
					
				}
			}).fail(
					function() {
						alert("Compruebe la conexion...");
					});
		}
	});
}

function cancelar(){
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/rol/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Rol - Lista");

	});
}


