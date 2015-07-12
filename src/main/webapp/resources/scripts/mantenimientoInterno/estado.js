var baseURL;
$(function() {
	baseURL = $("#baseURL").val();
});

function buscarEstado() {

	$("#frmBusquedaEstado").validate({

		rules : {
			descripcionEstado:"required"
		},

		messages : {
			descripcionEstado:"Este campo es requerido"
		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaEstado").html(contenido);
				}
			});
		}
	});
};


function eliminarEstado(idEstado) {

	var confirmacion = confirm("Desea eliminar permanentemente este ESTADO?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarEstado?idEstado=" + idEstado, function(
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

			$.get(baseURL + "mantenimientoInterno/listarEstados?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Estado - Listado");
			});

		});

	}
}

function limpiarEstado() {
	$("#descripcionEstado").val("");
	$.get(baseURL + "mantenimientoInterno/listarEstados", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Estados - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarEstado(idEstado) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarEstado/"+idEstado, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Estado - Edicion");

	});
};

function nuevoEstado() {
	var baseURL;
    var idEstado=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarEstado/"+idEstado, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Estado - Nuevo");

	});

};


