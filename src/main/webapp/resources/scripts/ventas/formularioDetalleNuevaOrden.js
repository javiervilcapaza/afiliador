var baseURL;


function calculaDetalle(){
	$("#subTotal").val("");
	$("#totalIgv").val("");
	$("#total").val("");
	
	 var subTotal=redondear($("#cantidad").val()*$("#precioUnitario").val());
	 //alert("sub :" +subTotal);
	 $("#subTotal").val(formatoMoneda(subTotal));
	 var igv=redondear(0.18*subTotal);
	 //alert("igv :" +igv);
	 $("#totalIgv").val(formatoMoneda(igv));
	 var total=redondear(subTotal+igv);
	 //alert("total :" +total);

	 $("#total").val(formatoMoneda(total));
}

$(function() {
	
	calculaDetalle();
	
	baseURL = $("#baseURL").val();
	
	$("#comboProducto").change(function(){
		
	    idProducto = $('#comboProducto option:selected').val();

		
		/*Me traigo los datos de los productosp*/
		
		$.get(baseURL + "ventas/buscarProductoPorId/"+idProducto, function(producto) {
			
			var precio=producto;
			$("#precioUnitario").val(formatoMoneda(precio));
		});
	});
	
	

	
	/*var idProducto=$('comboProducto option:selected').val();
	alert("id producto :" + idProducto);*/
	
	$.validator.addMethod('Decimal', function(value, element) {
		return this.optional(element) || /^\d+(\.\d{0,2})?$/.test(value);
	}, "Please enter a correct number, format xxxx.xxx");

	$("#frmGuardaDetalleNuevaOrden").validate({

		rules : {
			cantidad : {
				required : true,
				// number: true,
				digits : true
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
			
			
			var cliente=$("#idCliente").val();
			var documento=$("#idDocumento").val();
			

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize()+ "&idCliente=" + cliente+"&idDocumento=" + documento,
				success : function(contenido) {
					
					/*poner denuevo en el id detalleOrdenPedido*/
					if(contenido=="1"){
					$.get(baseURL + "ventas/detalleNuevaOrden/"+documento, function(respuesta) {
						$("#detalleOrdenPedido").html(respuesta);
						$("#myModal").modal('hide');  
						jQuery.jGrowl("Guardado Exitosamente", {life : 5000});
						});
					}
					else{
							alert("Este producto ya fue registrado");
						}
				}
			});
		}
	});

	/*
	 * function cancelarManoObra(){ var baseURL; baseURL = $("#baseURL").val();
	 * $("#contenidoPrincipal").html("Cargando . . ."); $.get(baseURL +
	 * "mantenimientoInterno/listarManosObras", function(respuesta) {
	 * $("#contenidoPrincipal").html(respuesta);
	 * $("#title-page").html("Mantenimiento Manos de Obra - Lista");
	 * 
	 * }); }
	 */

});

function redondear(num)
{ 		
	var result=Math.round(num*100)/100
	return result;
}

function cancelarDetalle(){
	
	$("#ventanaDetalleNuevaOrden").dialog("close");
	$("#ventanaDetalleNuevaOrden").html("");
	
	
}
function formatoMoneda(num) {
    var p = parseFloat(num).toFixed(2);
    return p;
}