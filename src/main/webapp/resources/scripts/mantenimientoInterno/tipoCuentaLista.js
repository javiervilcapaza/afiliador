var baseURL;
$(function() {
	baseURL = $("#baseURL").val();
});

function buscar() {

	$("#frmBusqueda").validate({

		rules : {
			nombre:"required"
		},

		messages : {
			nombre:"Este campo es requerido"
		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#lista").html(contenido);
				}
			});
		}
	});
};


function eliminar(idBanco) {

	var confirmacion = confirm("Desea eliminar permanentemente este TIPO DE CUENTA?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarTipoCuenta?id=" + idBanco, function(
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

			$.get(baseURL + "mantenimientoInterno/listarTipoCuenta?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Tipo de Cuenta - Listado");
			});

		});

	}
}

function limpiar() {
	$("#descripcionEstado").val("");
	$.get(baseURL + "mantenimientoInterno/listarTipoCuenta", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Cuenta - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editar(idTipoCuenta) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoCuenta/"+idTipoCuenta, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Cuenta - Edicion");

	});
};

function nuevo() {
	var baseURL;
    var idEstado=-1;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoCuenta/"+idEstado, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Cuenta - Nuevo");
	});

};


