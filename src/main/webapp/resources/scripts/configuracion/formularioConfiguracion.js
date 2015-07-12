$(function() {

	
	$("#frmGuarda").validate({

		errorClass : "has-error",

		errorPlacement : function(error, element) {
			error.appendTo(element.parent("div"));
		},

		rules : {
			"nombreEmpresa" : "required",
			"comision1" : "required",
			"comision2" : "required",
			"direccion" : "required",
			"correo" : "required",
			"telefono" : "required",
		},

		messages : {
			
		},

		submitHandler : function(form) {

			// validacion.
			var idAlumno = $('#idAlumno').val();

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(respuesta) {
					if (respuesta == 1) {
						alert('asd');
					} else {
						alert("El registro a presentado errores tecnicos");
					}
				}
			}).fail(function() {
				alert("Error Interno...");
			});
			;
		}
	});

});

function guarda() {
	$("#frmGuarda").submit();
}

function cancelar() {
	contentLoader("Modulo Afiliado", "afiliado/lista");
}


function restablecePuntos(){
	var mensaje = "Esta seguro de restablecer los puntos?";
	if(confirm(mensaje)){
		var baseURL = $("#baseURL").val();
		var url = baseURL+"afiliado/restableceAfiliados";
		$.get(url, function(respuesta){
			if(respuesta == 1){
				alert("Se ha restablecido correctamente");
			}
		});
	}
	
}
