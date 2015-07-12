function buscarPerfil() {


		$("#frmBusquedaPerfil").validate({

			submitHandler : function(form) {

				// validacion.

				$.ajax(form.action, {
					async : false,
					type : "POST",
					data : $(form).serialize(),
					success : function(contenido) {
						$("#listaPerfiles").html(contenido);
					}
				});
			}
		});

};

function crearPerfil() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/perfil/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Perfil - Nuevo");

	});

};

function editarPerfil(idPerfil) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/perfil/formulario?idPerfil=" + idPerfil,
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento de Perfil - Edicion");

			});
};

function asociarPerfil(idPerfil) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/perfil/asociarRolFormulario?idPerfil="
			+ idPerfil, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Perfil - Asociar Rol");

	});
};

function eliminarPerfil(idPerfil) {

	var confirmacion = confirm("Desea eliminar permanentemente este Perfil?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "seguridad/perfil/eliminar?idPerfil=" + idPerfil,
				function(respuesta) {

			if (respuesta!=null && respuesta!=-1) {
				info = "Eliminado Correctamente";
			}
			else if(respuesta==-1){
				info="No se puede eliminar porque se hace referencia a este perfil desde otro mantenimiento";
			}
			else {
				info = "El perfil no fue eliminado";
			}

					$.get(baseURL + "seguridad/perfil/lista?info=" + info,
							function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html(
										"Mantenimiento de Perfil - Lista");
							});

				});

	}
}
function limpiarFormularioBusqueda() {
	var baseURL, info;

	baseURL = $("#baseURL").val();
	$.get(baseURL + "seguridad/perfil/lista",
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html(
						"Mantenimiento de Perfil - Lista");
			});
}
