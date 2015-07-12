$(function(){
	
	$("#cumpleano").datepicker({dateFormat: 'dd/mm',changeMonth: true,});
	
});

function guardaCuentaBancaria(idProveedor) {
	
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
	}, "Este campo es alfanumerico.");

	
	$("#frmGuarda").validate({

		rules : {
			idBanco: {
				required : true
			}
		},

		messages : {
			idBanco:"Este campo es requerido",
		},

		submitHandler : function(form) {

			// validacion.

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {
					var baseURL;
					
					baseURL = $("#baseURL").val();
						$.get(baseURL + "compras/proveedor/formulario?idProveedor="+idProveedor+"&info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Proveedor - Edicion");
					});
				}
			});
		}
	});
}

function cancelar(idProveedor){
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "compras/proveedor/formulario?idProveedor=" + idProveedor, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proveedor - Edicion");

	});
}

