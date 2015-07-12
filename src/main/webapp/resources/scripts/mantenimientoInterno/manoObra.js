var baseURL;
$(function() {
	baseURL = $("#baseURL").val();
});

function buscarManoObra() {

	$("#frmBusquedaManoObra").validate({

		rules : {
			descripcionManoObra:"required"
		},

		messages : {
			descripcionManoObra:"Este campo es requerido"
		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaManoObra").html(contenido);
				}
			});
		}
	});
};


function eliminarManoObra(idManoObra) {

	var confirmacion = confirm("Desea eliminar permanentemente esta MANO DE OBRA?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarManoObra?idManoObra=" + idManoObra, function(
				respuesta) {
			if (respuesta!=null && respuesta!=-1) {
				info = "Eliminado Correctamente";
			}
			else if(respuesta==-1){
				info="No se puede eliminar porque se hace referencia a esta MANO DE OBRA desde otro mantenimiento";
			}
			else {
				info = "La MANO DE OBRA no fue eliminada";
			}

			$.get(baseURL + "mantenimientoInterno/listarManosObras?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Mano de Obra - Listado");
			});

		});

	}
}

function limpiarManoObra() {
	$("#descripcionManoObra").val("");
	$.get(baseURL + "mantenimientoInterno/listarManosObras", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Mano de Obra - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarManoObra(idManoObra) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarManoObra/"+idManoObra, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Mano de Obra - Edicion");

	});
};

function nuevoManoObra() {
	var baseURL;
    var idManoObra=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarManoObra/"+idManoObra, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Mano de Obra - Nuevo");

	});

};


