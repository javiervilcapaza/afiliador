function guardaUsuario() {
	$.validator.addMethod("loginRegex", function(value, element) {
		return this.optional(element) || /^[a-z0-9\-]+$/i.test(value);
	}, "Username must contain only letters, numbers, or dashes.");

	$("#frmGuardaUsuario")
			.validate(
					{

						rules : {
							username : {
								required : true,
								loginRegex : true
							},
							clave : {
								required : true,
								loginRegex : true
							},
							estado : "required"

						},

						messages : {
							username : {
								required : "Este campo es requerido",
								loginRegex : "Ingrese letras o numeros"
							},
							clave : {
								required : "Este campo es requerido",
								loginRegex : "Ingrese letras o numeros"
							},
							estado : "Este campo es requerido"
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
													
													if(contenido=="No se ha podido Guardar"){
														alert("El nombre de usuario ya existe");
													}else{
														var baseURL;
													baseURL = $("#baseURL").val();
													$.get(baseURL+ "seguridad/usuario/lista?info="+ contenido,
																	function(respuesta) {
																		$("#contenidoPrincipal").html(respuesta);
																		$("#title-page").html("Mantenimiento de Usuario - Lista");
																	});
													}
													
													
												}
											})
									.fail(
											function() {
												alert("No se ha podido guardar Compruebe la conexion...");
											});
						}
					});
}

function cancelar() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/usuario/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Usuario - Lista");

	});
}

$(function() {

	var baseURL;

	baseURL = $("#baseURL").val();
	$("#nombresApellidos").autocomplete({
		source : baseURL + "seguridad/usuario/buscaEmpleado",
		minLength : 2,
		select : function(event, ui) {
			idEmpleado = ui.item.id;
			$("#idEmpleado").val(idEmpleado);
		}
	})
	
});
