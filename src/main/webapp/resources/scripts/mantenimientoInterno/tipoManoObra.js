var baseURL;

function buscarTipoManoObra() {

	$("#frmBusquedaTipoManoObra").validate({

		rules : {
			descripcionTipoManoObra:"required"
		},

		messages : {
			descripcionTipoManoObra:"Este campo es requerido"
		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaTipoManoObra").html(contenido);
				}
			});
		}
	});
};


function eliminarTipoManoObra(idTipoManoObra) {

	var confirmacion = confirm("Desea eliminar permanentemente este PROCESO DE PRODUCCION?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarTipoManoObra?idTipoManoObra=" + idTipoManoObra, function(
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

			$.get(baseURL + "mantenimientoInterno/listarTiposManosObras?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Proceso de Produccion - Listado");
			});

		});

	}
}

function limpiarTipoManoObra() {
	$("#descripcionTipoManoObra").val("");
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/listarTiposManosObras", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Proceso de Produccion - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarTipoManoObra(idTipoManoObra) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoManoObra/"+idTipoManoObra, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Proceso de Produccion - Edicion");

	});
};

function nuevoTipoManoObra() {
	var baseURL;
    var idTipoManoObra=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoManoObra/"+idTipoManoObra, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Proceso de Produccion - Nuevo");

	});

};


