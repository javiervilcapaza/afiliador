function calculaDetalle(){
	$("#total").val("");
	
	 var total=$("#cantidad").val()*$("#precioUnitario").val();
	 //alert("sub :" +subTotal);
	 $("#total").val(formatoMoneda(total));
}

$(function() {
	
	$( ".monedaPeruInput" ).autoNumeric('init', {aSep: false, aDec: '.'});
	
	calculaDetalle();
	
	baseURL = $("#baseURL").val();
	
	
	$.validator.addMethod('Decimal', function(value, element) {
		return this.optional(element) || /^\d+(\.\d{0,2})?$/.test(value);
	}, "Please enter a correct number, format xxxx.xxx");

	$("#frmGuardaDetalleNuevaOrden").validate({

		rules : {
			idMateriaPrima:"required",
			descripcionMateriaPrima:"required",
			cantidad : {
				required : true,
				// number: true,
			},
			precioUnitario : {
				required : true,
				// number: true,
				Decimal : true
			},
			subTotal : {
				required : true,
				// number: true,
				Decimal : true
			},
			totalIgv : {
				required : true,
				// number: true,
				Decimal : true
			},
			total : {
				required : true,
				// number: true,
				Decimal : true
			},
			"producto.id" : "required",


		},

		messages : {
			idMateriaPrima:"ESTE CAMPO ES REQUERIDO",
			descripcionMateriaPrima:"ESTE CAMPO ES REQUERIDO",
			cantidad : {
				required : "INGRESE CANTIDAD",
				// number: "Ingrese formato adecuado",
				digits : "INGRESE SOLO NUMEROS"
			},
			precioUnitario : {
				required : "INGRESE PRECIO UNITARIO",
				// number: "Ingrese formato adecuado",
				Decimal : "INGRESE CON EL FORMATO DECIMAL CORRECTO"
			},
			subTotal : {
				required : "INGRESE SUB TOTAL",
				// number: "Ingrese formato adecuado",
				Decimal : "INGRESE CON EL FORMATO DECIMAL CORRECTO"
			},
			totalIgv : {
				required : "INGRESE TOTAL IGV",
				// number: "Ingrese formato adecuado",
				Decimal : "INGRESE CON EL FORMATO DECIMAL CORRECTO"
			},
			total : {
				required : "INGRESE COSTO",
				// number: "Ingrese formato adecuado",
				Decimal : "INGRESE CON EL FORMATO DECIMAL CORRECTO"
			},
			"producto.id" : "SELECCIONE PRODUCTO",


		},

		submitHandler : function(form) {
			var documento=$("#idDocumento").val();
			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {
					
					/*poner denuevo en el id detalleOrdenPedido*/
					if(contenido=="1"){
					$.get(baseURL + "compras/orden/formulario?idDocumento="+documento, function(respuesta) {
						$("#myModal").modal('hide');  
						jQuery.jGrowl("Guardado Exitosamente", {life : 5000});
						$("#contenidoPrincipal").html(respuesta);
						});
					}
					else{
							alert("Este producto ya fue registrado");
						}
				}
			});
		}
	});

});


function formatoMoneda(num) {
    var p = parseFloat(num).toFixed(2);
    return p;
}

function cargaMateriaPrima(){
	var baseURL;

	baseURL = $("#baseURL").val();
	$("#descripcionMateriaPrima").val("");
	$("#unidadMedida").html("");
	$("#descripcionMateriaPrima").autocomplete({
		source : baseURL + "compras/orden/autocompleteMateriaPrima?idTipoMateriaPrima="+$("#idTipoMateriaPrima").val(),
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#idMateriaPrima").val(idCliente);
			cargaUnidadMedida();
		}
	});
}

function cargaUnidadMedida(){
	var baseURL = $("#baseURL").val();
	$.get(baseURL + "compras/orden/comboUnidadMedida?idMateriaPrima="+$("#idMateriaPrima").val(), function(respuesta) {
			$("#unidadMedida").html(respuesta);
		});
	
}