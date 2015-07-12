function buscarRol() {

	$("#frmBusquedaRol").validate({

		rules : {
			nombreRol:"required"
		},

		messages : {
			nombreRol:"Este campo es requerido"
		},

		submitHandler : function(form) {

			// validacion.

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {
					$("#listaRoles").html(contenido);
				}
			});
		}
	});
};

function crearRol() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/rol/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Rol - Nuevo");

	});

};

function editarRol(idRol) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/rol/formulario?idRol=" + idRol, function(
			respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Rol - Edicion");

	});
};

function eliminarRol(idRol) {

	var confirmacion = confirm("Desea eliminar permanentemente este rol?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "seguridad/rol/eliminar?idRol=" + idRol, function(
				respuesta) {
			
			if (respuesta!=null && respuesta!=-1 && respuesta!=-2) {
				info = "Eliminado Correctamente";
			}
			else if(respuesta==-1){
				info="No se puede eliminar porque se hace referencia a este rol desde otro mantenimiento";
			}
			else if(respuesta==-2){
				info="No se puede eliminar porque este rol esta referenciado como dependecia de nivel 1";
			}
			else {
				info = "El Rol no fue eliminado";
			}

			$.get(baseURL + "seguridad/rol/lista?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Rol - Lista");
			});

		});

	}
}
function limpiarFormularioBusqueda() {
	var baseURL, info;

	baseURL = $("#baseURL").val();
	$.get(baseURL + "seguridad/rol/lista", function(
			respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Rol - Lista");
	});
}
