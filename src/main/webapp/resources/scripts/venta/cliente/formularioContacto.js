$(function(){
	
	$("#cumpleano").datepicker({dateFormat: 'dd/mm',changeMonth: true,});
	
});

function guardaContacto(idCliente) {
	
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
	}, "Este campo es alfanumerico.");

	
	$("#frmGuarda").validate({

		rules : {
			nombre : {
				required : true,
				alfanumerico : true
			},
			telFijo:{
				alfanumerico : true,
				maxlength : 50
			},
			telMovil1 :{
				alfanumerico : true,
				maxlength : 50
			},
			telMovil2 :{
				alfanumerico : true,
				maxlength : 50
			},
			telDomicilio :{
				alfanumerico : true,
				maxlength : 50
			},
			cargo:"alfanumerico",
			email:"email"
		},

		messages : {
			cargo:"Este campo es alfanumerico",
			email:"Inserte una direccion de correo electronico valido",
			nombre : {
				required : "Este campo es requerido",
				alfanumerico :"Este campo es alfanumerico",
			},
			telFijo:{
				alfanumerico : "Este campo es alfanumerico",
				maxlength : "ingrese un maximo de 50 caracteres",
			},
			telMovil1 :{
				alfanumerico : "Este campo es alfanumerico",
				maxlength : "ingrese un maximo de 50 caracteres",
			},
			telMovil2 :{
				alfanumerico : "Este campo es alfanumerico",
				maxlength : "ingrese un maximo de 50 caracteres",
			},
			telDomicilio :{
				alfanumerico : "Este campo es alfanumerico",
				maxlength : "ingrese un maximo de 50 caracteres",
			},
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
						$.get(baseURL + "venta/cliente/formulario?idCliente="+idCliente+"&info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Informacion del Cliente - Edicion");
					});
				}
			});
		}
	});
}

function cancelar(idCliente){
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/cliente/formulario?idCliente=" + idCliente, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Informacion del Cliente - Edicion");

	});
}

