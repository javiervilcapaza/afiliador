function guardaPerfil() {
	$.validator.addMethod("loginRegex", function(value, element) {
		return this.optional(element) || /^[a-z0-9\- ]+$/i.test(value);
	}, "Username must contain only letters, numbers, or dashes.");

	$("#frmGuardaPerfil").validate(
			{

				rules : {
					nombrePerfil : {
						required : true,
						loginRegex : true
					},

				},

				messages : {
					nombrePerfil : {
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
							
							if(contenido=="perfil duplicado"){
								alert("Nombre de Perfil ya existe...");
							}else{
								var baseURL;

							baseURL = $("#baseURL").val();
							$.get(baseURL + "seguridad/perfil/lista?info="
									+ contenido, function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html(
										"Mantenimiento de Perfil - Busqueda");
							});
							}
							
							
						}
					}).fail(
							function() {
								alert("Compruebe su conexion...");
							});
				}
			});
}
function guardaPerfilRol() {
	$("#frmGuardaPerfilRol").validate(
			{

				submitHandler : function(form) {

					$.ajax(form.action, {
						async : false,
						type : "POST",
						data : $(form).serialize(),
						success : function(contenido) {
							var baseURL;

							baseURL = $("#baseURL").val();
							$.get(baseURL + "seguridad/perfil/lista?info="
									+ contenido, function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html(
										"Mantenimiento de Perfil - Busqueda");
							});
						}
					});
				}
			});
}

function chekar(clase) {
	if ($("#" + clase).is(':checked')) {
		$("." + clase).each(function() {
			$(this).attr('checked',true);

		});

	} else {
		$("." + clase).each(function() {
			$(this).attr('checked',false);

		});
	}
}

function cancelar(){
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/perfil/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Perfil - Lista");

	});
}
