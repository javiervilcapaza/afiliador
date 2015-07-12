var baseURL;
$(function() {
	baseURL = $("#baseURL").val();
});

function buscarEmpresa() {

	var baseURL = $("#baseURL").val();
	if ($("#nombreComercial").val() != "" || $("#razonSocial").val() != ""
			|| $("#estado").val() != "" ) {
				$.ajax({
					url : baseURL + "mantenimientoInterno/buscarEmpresa",
					type : "POST",
					data : {
						nombreComercial : $("#nombreComercial").val(),
						razonSocial : $("#razonSocial").val(),
						estado : $("#estado").val()
					}
				}).done(function( html ) {
					$("#lista").html(html);
				});
	} else {
		alert("Inserte algun filtro de busqueda");
	}

};


function eliminarEmpresa(idEmpresa) {

	var confirmacion = confirm("Desea eliminar permanentemente esta Empresa?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarEmpresa?id=" + idEmpresa, function(
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

			$.get(baseURL + "mantenimientoInterno/listarEmpresa?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Estado - Listado");
			});

		});

	}
}

function limpiarEmpresa() {
	$.get(baseURL + "mantenimientoInterno/listarEmpresa", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Empresa Origen - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarEmpresa(idEmpresa) {

	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarEmpresa/"+idEmpresa, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Empresa Origen - Edicion");

	});
};

function nuevaEmpresa() {
	var baseURL;
    var idEstado=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarEmpresa/"+idEstado, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Empresa Origen - Nuevo");

	});

};


