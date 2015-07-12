$(function() {
	var n = $("#costoUnitario").val();
	calculaSubTotal();
});


function guarda(idProducto) {

	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
	}, "Este campo es alfanumerico.");
	
	$.validator.addMethod('Decimal', function(value, element) {
	    return this.optional(element) || /^\d+(\.\d{0,2})?$/.test(value); 
	}, "este campo es decimal");

	$("#frmGuarda").validate(
			{

				rules : {
					costoUnitario : {
						
						Decimal : true,
						maxlength : 50
					},
					cantidad:{
						required:true,
						number : true,
						maxlength : 15
					},
					materiaPrima:"required"
				},

				messages : {
					costoUnitario : {
						
						Decimal : "este campo tiene el siguiente formato 0.00",
						maxlength : "maximo 50 caracteres"
					},
					cantidad:{
						required:"Este campo es necesario",
						number:"Este campo es de tipo numerico",
						maxlength:"Este campo solo admite 5 digitos"
					},
					materiaPrima:"Este campo es necesario"
				},

				submitHandler : function(form) {

					// validacion.

					$.ajax(form.action, {
						async : false,
						type : "POST",
						data : $(form).serialize(),
						success : function(contenido) {
							
							if(contenido!="0"){
								var baseURL;

							baseURL = $("#baseURL").val();
							$.get(baseURL + "venta/producto/formulario?info="
									+ contenido + "&idProducto=" +idProducto, function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html(
										"Producto por Cliente - Edicion");
							});
							}else{
								alert("El materia prima ya se registro para este producto");
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
function calculaCostoUnitario(idMateriaPrima){
	cambiaUnidadMedida();
	var baseURL;
	baseURL = $("#baseURL").val();
	var id = $("#materiaPrima").val();
	if(id!=""){
	$.get(baseURL + "venta/producto/materiaprima/calculaCostoUnitario?idMateriaPrima="+id, function(respuesta) {
		$("#costoUnitario").val(formatoMoneda(respuesta));
		calculaSubTotal();
	});
	}
}
function llenaComboMateriaPrima(){
	var baseURL;
	baseURL = $("#baseURL").val();
	var id = $("#tipoMateriaPrima").val();
	
	if(id!=""){
	$.get(baseURL + "venta/producto/materiaprima/comboMateriaPrima?idTipoMateriaPrima="+id, function(respuesta) {
		$("#materiaPrima").html(respuesta);
	});
	}
}

function cambiaUnidadMedida(){
	var baseURL;
	baseURL = $("#baseURL").val();
	var id = $("#materiaPrima").val();
	
	if(id!=""){
	$.get(baseURL + "venta/producto/materiaprima/comboUnidadMedida?idMateriaPrima="+id, function(respuesta) {
		$("#unidadMedida").html(respuesta);
	});
	}
}

function calculaSubTotal(){
	var subtotal=$("#costoUnitario").val()*$("#cantidad").val();
	$("#subTotal").val(formatoMoneda(subtotal));
	
}

function formatoMoneda(num) {
    var p = parseFloat(num).toFixed(2);
    return p;
}



