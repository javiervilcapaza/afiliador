var baseURL;
$(function() {
	baseURL = $("#baseURL").val();
});

function buscarTipoArchivo() {

	$("#frmBusquedaTipoArchivo").validate({

		rules : {
			descripcionTipoArchivo:"required"
		},

		messages : {
			descripcionTipoArchivo:"Este campo es requerido"
		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaTipoArchivo").html(contenido);
				}
			});
		}
	});
};


function eliminarTipoArchivo(idTipoArchivo) {

	var confirmacion = confirm("Desea eliminar permanentemente este TIPO DE ARCHIVO?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarTipoArchivo?idTipoArchivo=" + idTipoArchivo, function(
				respuesta) {
			
			if (respuesta!=null && respuesta!=-1) {
				info = "Eliminado Correctamente";
			} 
			else if(respuesta==-1){
				info="No se puede eliminar porque se hace referencia desde otro mantenimiento";
			}
			else {
				info = "No fue eliminado";
			}

			$.get(baseURL + "mantenimientoInterno/listarTiposArchivos?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Tipo de Archivo - Listado");
			});

		});

	}
}

function limpiarTipoArchivo() {
	$("#descripcionTipoArchivo").val("");
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/listarTiposArchivos", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipos de Archivos - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarTipoArchivo(idTipoArchivo) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoArchivo/"+idTipoArchivo, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Archivo - Edicion");

	});
};

function nuevoTipoArchivo() {
	var baseURL;
    var idTipoArchivo=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoArchivo/"+idTipoArchivo, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Archivo - Nuevo");

	});

};


