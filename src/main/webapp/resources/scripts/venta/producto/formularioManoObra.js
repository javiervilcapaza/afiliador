function guarda(idProducto) {

	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
	}, "Este campo es alfanumerico.");
	
	$.validator.addMethod('decimal', function(value, element) {
	    return this.optional(element) || /^\d+(\.\d{0,2})?$/.test(value); 
	}, "Este campo es decimal");

	$("#frmGuarda").validate(
			{

				rules : {
					costoUnitario : {
						required : true,
						maxlength : 50,
						decimal:true
					},
					proceso:{
						required:true
					}
				},

				messages : {
					costoUnitario : {
						required : "este campo es necesario",
						maxlength : "maximo 50 caracteres",
						decimal:"este campo es de tipo decimal"
					},
					proceso:{
						required: "este campo es necesario",
					}
				},

				submitHandler : function(form) {

					// validacion.

					$.ajax(form.action, {
						async : false,
						type : "POST",
						data : $(form).serialize(),
						success : function(contenido) {
							
							if(contenido!=0){
								var baseURL;

							baseURL = $("#baseURL").val();
							$.get(baseURL + "venta/producto/formulario?info="
									+ contenido + "&idProducto=" +idProducto, function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html(
										"Producto por Cliente - Lista");
							});
							}else{
								alert("El proceso ya se ha definido para este producto");
							}
							
							
						}
					}).fail(
							function() {
								alert("No se ha podido guardar...");
							});;
				}
			});
}

function cancelar(idProducto) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/producto/formulario?idProducto="+idProducto, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Producto por Cliente - Edicion");

	});
}
