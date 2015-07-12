var baseURL;

function buscarTipoProducto() {

	$("#frmBusquedaTipoProducto").validate({

		rules : {
			descripcionTipoProducto:"required"
		},

		messages : {
			descripcionTipoProducto:"Este campo es requerido"
		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaTipoProducto").html(contenido);
				}
			});
		}
	});
};


function eliminarTipoProducto(idTipoProducto) {

	var confirmacion = confirm("Desea eliminar permanentemente este TIPO DE PRODUCTO?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarTipoProducto?idTipoProducto=" + idTipoProducto, function(
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

			$.get(baseURL + "mantenimientoInterno/listarTiposProductos?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Tipo de Producto - Lista");
			});

		});

	}
}

function limpiarTipoProducto() {
	baseURL = $("#baseURL").val();
	$("#descripcionTipoProducto").val("");
	$.get(baseURL + "mantenimientoInterno/listarTiposProductos", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Producto - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarTipoProducto(idTipoProducto) {
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoProducto/"+idTipoProducto, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Producto - Edicion");

	});
};

function nuevoTipoProducto() {
	var baseURL;
    var idTipoProducto=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoProducto/"+idTipoProducto, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo de Producto - Nuevo");

	});

};


