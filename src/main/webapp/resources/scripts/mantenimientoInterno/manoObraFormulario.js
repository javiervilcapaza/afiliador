var baseURL;
/*function validar(elemento){
	alert("validar:"+ elemento);
	return true;
}*/
$.validator.addMethod('Decimal', function(value, element) {
    return this.optional(element) || /^\d+(\.\d{0,2})?$/.test(value); 
}, "Please enter a correct number, format xxxx.xxx");
    
	$("#frmGuardaManoObra").validate({
		
		

		rules : {
			descripcion : "required",
			codigo : "required",
			costo: {
			      required: true,
			      //number: true,
			      Decimal:true
			    },
			"tipoManoObra.id": "required",
			


			
		},

		messages : {
			descripcion : "Ingrese este campo.",
			codigo : "Ingrese este campo.",
			costo:{
			      required: "Ingrese este campo.",
			      //number: "Ingrese formato adecuado",
			      Decimal:"Este campo es de formato decimal"

			    },
			"tipoManoObra.id": "Seleccione este campo",




		},
		
		

		submitHandler : function(form) {

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {	
					if(contenido=="error"){
						var mensaje="Esta Mano de Obra ya ha sido registrado";
						alert(mensaje);

					}
					else{
						baseURL = $("#baseURL").val();
						$.get(baseURL + "mantenimientoInterno/listarManosObras?info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Mano de Obra - Listado");
					});
					}
					
				}
			});
		}
	});
	
	function cancelarManoObra(){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/listarManosObras", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento Mano de Obra - Listado");

		});
	}



