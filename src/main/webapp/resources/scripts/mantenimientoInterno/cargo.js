var baseURL;
$(function() {
	baseURL = $("#baseURL").val();
	//alert("aquiiii");
});

function buscarCargo() {

	$("#frmBusquedaCargo").validate({


		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaCargo").html(contenido);
				}
			});
		}
	});
};


function eliminarCargo(idCargo) {

	var confirmacion = confirm("Desea eliminar permanentemente este CARGO?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarCargo?idCargo=" + idCargo, function(
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

			$.get(baseURL + "mantenimientoInterno/listarCargos?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Cargo Organizacional - Listado");
			});

		});

	}
}

function limpiarCargo() {
	$("#descripcionCargo").val("");
	$.get(baseURL + "mantenimientoInterno/listarCargos", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Cargo Organizacional - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarCargo(idCargo) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarCargo/"+idCargo, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Cargo Organizacional - Edicion");

	});
};

function nuevoCargo() {
	var baseURL;
    var idCargo=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarCargo/"+idCargo, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Cargo Organizacional - Nuevo");

	});

};


