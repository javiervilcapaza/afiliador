var baseURL;

function buscarTipoDocumento() {
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
	}, "Este campo es alfanumerico.");
	$("#frmBusquedaTipoDocumento").validate({

		rules : {
			descripcion : "required",
			codigo : {required:true,alfanumerico:true},


			
		},

		messages : {
			descripcion : "Ingrese este campo.",
			codigo : {required:"Ingrese este campo.",alfanumerico:"Este campo es alfanumerico."},


		},

		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaTipoDocumento").html(contenido);
				}
			});
		}
	});
};


function eliminarTipoDocumento(idTipoDocumento) {

	var confirmacion = confirm("Desea eliminar permanentemente este TIPO ENTIDAD DOCUMENTO?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarTipoDocumento?idTipoDocumento=" + idTipoDocumento, function(
				respuesta) {
			
			if (respuesta!=null && respuesta!=-1) {
				info = "Eliminado Correctamente";
			}
			else if(respuesta==-1){
				info="No se puede eliminar porque se hace referencia desde otro mantenimiento";
			}
			
			else {
				info = "No fue eliminado correctamente";
			}

			$.get(baseURL + "mantenimientoInterno/listarTiposDocumentos?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Tipo Entidad Documento - Listado");
			});

		});

	}
}

function limpiarTipoDocumento() {
	baseURL = $("#baseURL").val();
	$.get(baseURL + "mantenimientoInterno/listarTiposDocumentos", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo Entidad Documento - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarTipoDocumento(idTipoDocumento) {
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoDocumento/"+idTipoDocumento, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo Entidad Documento - Edicion");

	});
};

function nuevoTipoDocumento() {
	var baseURL;
    var idTipoDocumento=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarTipoDocumento/"+idTipoDocumento, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Tipo Entidad Documento - Nuevo");

	});

};


