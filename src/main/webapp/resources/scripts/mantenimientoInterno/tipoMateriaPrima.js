var baseURL;
$(function() {
	baseURL = $("#baseURL").val();

});

function buscarTipoMateriaPrima() {

	$("#frmBusquedaTipoMateriaPrima").validate({

		rules : {
			descripcionTipoMateriaPrima:"required"
		},

		messages : {
			descripcionTipoMateriaPrima:"Este campo es requerido"
		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaTipoMateriaPrima").html(contenido);
				}
			});
		}
	});
};


function eliminarTipoMateriaPrima(idTipoMateriaPrima) {

	var confirmacion = confirm("Desea eliminar permanentemente este TIPO DE MATERIA PRIMA?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarTipoMateriaPrima?idTipoMateriaPrima=" + idTipoMateriaPrima, function(
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

			$.get(baseURL + "mantenimientoInterno/listarTiposMateriasPrimas?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Tipo de Materia Prima - Lista");
			});

		});

	}
}

function limpiarTipoMateriaPrima() {
	$("#descripcionTipoMateriaPrima").val("");
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/listarTiposMateriasPrimas", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Materia Prima - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarTipoMateriaPrima(idTipoMateriaPrima) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoMateriaPrima/"+idTipoMateriaPrima, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Materia Prima - Edicion");

	});
};

function nuevoTipoMateriaPrima() {
	var baseURL;
    var idTipoMateriaPrima=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoMateriaPrima/"+idTipoMateriaPrima, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Materia Prima - Nuevo");

	});

};


