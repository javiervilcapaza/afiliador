var baseURL;

$.validator.addMethod("alfanumerico", function(value, element) {
	return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
}, "Este campo es alfanumerico.");

	$("#frmGuarda").validate({

		rules : {
			nombre : "required",


			
		},

		messages : {
			nombre : "Ingrese este campo.",

		},

		submitHandler : function(form) {

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {	
					
					if(contenido=="error"){
						var mensaje="Este Banco ya ha sido registrado";
						alert(mensaje);

					}
					else{
						baseURL = $("#baseURL").val();
						$.get(baseURL + "mantenimientoInterno/listarTipoCuenta?info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Mantenimiento Tipo de Cuenta - Listado");
					});
					}
					
					
				}
			});
		}
	});
	
	function cancelar(){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/listarTipoCuenta", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento Tipo de Cuenta - Listado");

		});
	}



