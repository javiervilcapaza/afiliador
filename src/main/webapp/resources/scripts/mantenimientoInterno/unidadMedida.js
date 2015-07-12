var baseURL;
$(function() {
	baseURL = $("#baseURL").val();
});

function buscarUnidadMedida() {

	$("#frmBusquedaUnidadMedida").validate({

		rules : {
			descripcionUnidadMedida:"required"
		},

		messages : {
			descripcionUnidadMedida:"Este campo es requerido"
		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaUnidadMedida").html(contenido);
				}
			});
		}
	});
};


function eliminarUnidadMedida(idUnidadMedida) {

	var confirmacion = confirm("Desea eliminar permanentemente esta UNIDAD DE MEDIDA?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarUnidadMedida?idUnidadMedida=" + idUnidadMedida, function(
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

			$.get(baseURL + "mantenimientoInterno/listarUnidadesMedidas?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Unidad de Medida - Listado");
			});

		});

	}
}

function limpiarUnidadMedida() {
	$("#descripcionUnidadMedida").val("");
	$.get(baseURL + "mantenimientoInterno/listarUnidadesMedidas", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Unidad de Medida - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarUnidadMedida(idUnidadMedida) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarUnidadMedida/"+idUnidadMedida, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Unidad de Medida - Edicion");

	});
};

function nuevoUnidadMedida() {
	var baseURL;
    var idUnidadMedida=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarUnidadMedida/"+idUnidadMedida, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Unidad de Medida - Nuevo");

	});

};


