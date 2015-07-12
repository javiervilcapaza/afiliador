$(function() {

	var baseURL = $("#baseURL").val();
	$("#afiliadoPadreDescripcion").autocomplete({
		source : baseURL + "afiliado/autocompleteAfiliado",
		minLength : 2,
		select : function(event, ui) {
			var id = ui.item.id;
			$("#afiliadoPadre").val(id);
		}
	});

	$.validator.addMethod("combo", function(value, element, arg) {
		return arg != value;
	}, "Seleccione una opcion.");

	
	$("#frmGuarda").validate({

		errorClass : "has-error",

		errorPlacement : function(error, element) {
			error.appendTo(element.parent("div"));
		},

		rules : {
			"persona.dni" : "required",
			"persona.nombres" : "required",
			"persona.apellidos" : "required",
			"persona.sexo" : "required",
		},

		messages : {
			"persona.dni" : "Este campo es requerido",
			"persona.nombres" : "Este campo es requerido",
			"persona.apellidos" : "Este campo es requerido",
			"persona.tipoIdentificacion.id" : "Este campo es requerido",
			"persona.numeroIdentificacion" : "Este campo es requerido",
			"persona.sexo" : "Este campo es requerido"
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
						contentLoader("Modulo Afiliado", "afiliado/lista");
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

$(function() {
	$("#fechaNacimiento").datepicker({
		format : 'dd/mm/yyyy',
		changeMonth : true,
		changeYear : true,
	});
});
