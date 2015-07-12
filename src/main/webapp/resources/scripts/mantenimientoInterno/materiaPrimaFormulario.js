var baseURL;
/*function validar(elemento){
	alert("validar:"+ elemento);
	return true;
}*/
$.validator.addMethod('Decimal', function(value, element) {
    return this.optional(element) || /^\d+(\.\d{0,2})?$/.test(value); 
}, "Please enter a correct number, format xxxx.xxx");
    
	$("#frmGuardaMateriaPrima").validate({
		
		

		rules : {
			nombreMateriaPrima : "required",
			costoUnitario: {
			      //number: true,
			      Decimal:true
			    },
			numMateriaPrima: {
				required: true,
				digits: true,
			},
			"tipoMateriaPrima.id": "required",
			"unidadMedida.id": "required",
			


			
		},

		messages : {
			nombreMateriaPrima : "Este campo es requerido",
			costoUnitario:{
			      //number: "Ingrese formato adecuado",
			      Decimal:"Ingrese en formato decimal"

			    },
			numMateriaPrima:  {
				required: "Este campo es requerido",
				digits: "Ingrese en formato numerico",
			},
			"tipoMateriaPrima.id": "Seleccione este campo",
			"unidadMedida.id": "Seleccione este campo",




		},
		
		

		submitHandler : function(form) {

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {		
					
					if(contenido=="error"){
						var mensaje="La Materia Prima ya ha sido registrado";
						alert(mensaje);

					}
					else{
						baseURL = $("#baseURL").val();
						$.get(baseURL + "mantenimientoInterno/listarMateriasPrimas?info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Mantemiento Materia Prima - Listado");
					});
					}
					
				}
			});
		}
	});
	
	function cancelarMateriaPrima(){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/listarMateriasPrimas", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento Materia Prima - Listado");

		});
	}
	
	$(function() {
		
		$( ".monedaPeruInput" ).autoNumeric('init', {aSep: false, aDec: '.'});
		
		
		var baseURL;
		baseURL = $("#baseURL").val();
		var fotografia = $("#fotografia").val();
		
		

		new AjaxUpload($("#subirFotografia"),{
			action :baseURL + "mantenimientoInterno/subeImagenMateriaPrima/"+$("#fotografia").val(),
			name : "archivo",
			onSubmit : function(file, ext) {

				if (!(ext && /^(jpg|png|gif|doc|docx|rar|pdf|pdfx)$/.test(ext))) {

					// extensiones permitidas
					alert('Solo se permiten archivos .jpg .png .gif .doc .docx .rar .pdf');
					// cancela upload
					return false;
				} else {
					$('#loaderAjax').show();
					jQuery.jGrowl("Cargando...", { life: 3000});
					this.disable();
				}
			},
			onComplete : function(file, response) {
				respuesta = $.parseJSON(response);
				if(respuesta.respuesta==null){
					jQuery.jGrowl("No se ha subido el archivo correctamente", { life: 3000});
				}else{
					$("#fotografia").val(respuesta.idArchivo);
					
					
					jQuery.jGrowl("Se ha subido el archivo correctamente", { life: 3000});
					if(fotografia!="1"){
						var id = $("#id").val();
						$.get(baseURL + "mantenimientoInterno/editarMateriaPrima/"+id, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
						});
						
					}else{
						$("#subirFotografia").html("Subido Correctamente");
					};
					
				}
			}

		});
	});




