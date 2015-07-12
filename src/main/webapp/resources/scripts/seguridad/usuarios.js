function buscarUsuario() {
			$("#frmBusquedaUsuario").validate({
				rules : {},
				messages : {},
				submitHandler : function(form) {
					$.ajax(form.action, {
						async : false,
						type : "POST",
						data : $(form).serialize(),
						success : function(contenido) {
							if($("#estadoBusqueda").val()=="" & $("#usernameBusqueda").val()==""){
								baseURL = $("#baseURL").val();
								$.get(baseURL + "seguridad/usuario/lista",
										function(respuesta) {
											$("#contenidoPrincipal").html(respuesta);
											$("#title-page").html(
													"Mantenimiento de Usuario - Lista");
										});
							}else{$("#listaUsuarios").html(contenido);}
						}
					});
				}
			});
};

function crearUsuario() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/usuario/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Usuario - Nuevo");

	});

};

function editarUsuario(idUsuario) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/usuario/formulario?idUsuario=" + idUsuario,
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento de Usuario - Edicion ");

			});
};

function cambiarEstado(idUsuario, estado) {
	var baseURL;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/usuario/cambiaEstado?idUsuario=" + idUsuario
			+ "&estado=" + estado, function(respuesta) {

		$.get(baseURL + "seguridad/usuario/lista?info=" + respuesta, function(
				respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento de Usuario - Lista");
		});

	});
}

function eliminarUsuario(idUsuario) {

	var confirmacion = confirm("Desea eliminar permanentemente este Usuario?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "seguridad/usuario/eliminar?idUsuario=" + idUsuario,
				function(respuesta) {

			if (respuesta!=null && respuesta!=-1) {
				info = "Eliminado Correctamente";
			}
			else if(respuesta==-1){
				info="No se puede eliminar porque se hace referencia a esta usuario desde otro mantenimiento";
			}
			else {
				info = "El usuario no fue eliminado";
			}

					$.get(baseURL + "seguridad/usuario/lista?info=" + info,
							function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html(
										"Mantenimiento de Usuario - Lista");
							});

				});

	}

}

function limpiarFormularioBusqueda() {
	var baseURL, info;

	baseURL = $("#baseURL").val();
	$.get(baseURL + "seguridad/usuario/lista",
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html(
						"Mantenimiento de Usuario - Lista");
			});
}
