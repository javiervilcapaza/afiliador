$(function() {

	$("#tablaAreas")
			.dataTable(
					{
						"bFilter" : false,
						"sPaginationType" : "full_numbers",
						"oLanguage" : {
							"oPaginate" : {
								"sPrevious" : "Anterior",
								"sNext" : "Siguiente",
								"sLast" : "Ultima",
								"sFirst" : "Primera"
							},

							"sLengthMenu" : 'Mostrar <select>'
									+ '<option value="5">5</option>'
									+ '<option value="10">10</option>'
									+ '<option value="30">30</option>'
									+ '<option value="40">40</option>'
									+ '<option value="50">50</option>'
									+ '<option value="-1">Todos</option>'
									+ '</select> registros',

							"sInfo" : "Mostrando del _START_ a _END_ (Total: _TOTAL_ resultados)",

							"sInfoFiltered" : " - filtrados de _MAX_ registros",

							"sInfoEmpty" : "No hay resultados de búsqueda",

							"sZeroRecords" : "No hay registros a mostrar",

							"sProcessing" : "Espere, por favor...",

							"sSearch" : "Buscar:",

						}
					});
});

function buscarArea() {

	$("#frmBusquedaArea").validate({

		rules : {
			descripcion:"required"
		},

		messages : {
			descripcion:"Este campo es requerido"
		},

		submitHandler : function(form) {

			// validacion.

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {
					$("#listaAreas").html(contenido);
				}
			});
		}
	});
};

function crearArea() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/area/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Area - Nuevo");

	});

};

function editarArea(idArea) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "seguridad/area/formulario?idArea=" + idArea, function(
			respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento de Area - Edicion");

	});
};

function eliminarArea(idArea) {

	var confirmacion = confirm("Desea eliminar permanentemente este Area?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "seguridad/area/eliminar?idArea=" + idArea, function(
				respuesta) {
			
			if (respuesta!=null) {
				info = "Eliminado Correctamente";
			} else {
				info = "El area no fue eliminado";
			}

			$.get(baseURL + "seguridad/area/lista?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Area - Lista");
			});

		});

	}
}
function limpiarFormularioBusqueda() {
	$("#nombreArea").val("");
}
