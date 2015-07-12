function formatoMoneda(num) {
    var p = parseFloat(num).toFixed(2);
    return p;
}

function redondear(num)
{ 		
	var result=Math.round(num*100)/100;
	return result;
}

$(function($){
	
	var baseURL = $("#baseURL").val();
	
	$("#ordenPedidoDesc").autocomplete({
		source : baseURL + "almacen/movimiento/documento/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			var OP = ui.item.id;
			$("#ordenPedido").val(OP);
		}
	});

});

function cargaProducto(){
	
	cambiaProducto();
	
	if($("#idCliente").val()!=""){
		var baseURL = $("#baseURL").val();
		$("#idProducto").html("<option value=''>(Seleccione)</option>");
		$.get(baseURL + "almacen/movimiento/productoPorCliente?idCliente="+$("#idCliente").val(), function(respuesta) {
			var string="<option value=''>(Seleccione)</option>";
			
			jQuery.each(respuesta, function(i, val) {
				if(i!=null){
					string = string+"<option value='"+val.id+"' stock="+val.stock+">"+val.value+"</value>";
				}
				});
			
			
			$("#idProducto").html(string);
			
		});
	}else{
		$("#idCliente").focus();
	}
}

//function cargaProducto(){
//	if($("#ordenPedido").val()!=""){
//			
//		var baseURL = $("#baseURL").val();
//		$("#idProducto").html("<option value=''>(Seleccione)</option>");
//		$.get(baseURL + "almacen/movimiento/autocompletePorOP?term="+$("#ordenPedido").val(), function(respuesta) {
//			var string="<option value=''>(Seleccione)</option>";
//			
//			jQuery.each(respuesta, function(i, val) {
//				if(i!=null){
//					string = string+"<option value='"+val.id+"' stock="+val.stock+">"+val.value+"</value>";
//				}
//				});
//			
//			
//			$("#idProducto").html(string);
//			
//		});
//	}else{
//		alert("Ingrese el Numero de Orden de Pedido");
//	}
//}
//
//function cargaProductoSalida(){
//	if($("#ordenPedido").val()!=""){
//			
//		var baseURL = $("#baseURL").val();
//		$("#idProducto").html("<option value=''>(Seleccione)</option>");
//		$.get(baseURL + "almacen/movimiento/autocompletePorOPS?term="+$("#ordenPedido").val(), function(respuesta) {
//			var string="<option value=''>(Seleccione)</option>";
//			
//			jQuery.each(respuesta, function(i, val) {
//				if(i!=null){
//					string = string+"<option value='"+val.id+"' stock="+val.stock+">"+val.value+"</value>";
//				}
//				});
//			
//			
//			$("#idProducto").html(string);
//			
//		});
//	}else{
//		alert("Ingrese el Numero de Orden de Pedido");
//	}
//}

function guarda() {

	var baseURL;
	baseURL = $("#baseURL").val();
	
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ´]+$/i.test(value);
	}, "Este campo es alfanumerico.");
	
	$.validator.addMethod('decimal', function(value, element) {
	    return this.optional(element) || /^\d+(\.\d{0,2})?$/.test(value); 
	}, "Este campo es decimal");
	
	
	$("#frmGuarda")
			.validate(
					{

						rules : {
						
							idProducto:"required",
							cantidad:{
								required : true,
								decimal : true
							},
							talla: "required",
							numeroGuia: "required",
							numeroVoucher :"required",
								

						},

						messages : {
							idProducto:"Este campo es requerido",
							cantidad:{
								required : "Este campo es requerido",
								decimal : "Este campo es decimal"
							},
							talla: "Este campo es requerido",
							numeroGuia: "Este campo es requerido",
							numeroVoucher: "Este campo es requerido",
						},

						submitHandler : function(form) {

							// validacion.

							$.ajax(form.action,	{
												async : false,
												type : "POST",
												data : $(form).serialize(),
												success : function(contenido) {
													$.get(baseURL + "almacen/movimiento/producto/index", function(respuesta) {
														$("#contenidoPrincipal").html(respuesta);
														$("#title-page").html("Productos Terminados - Registro de Movimientos");
													}).fail(function() {
														$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
													});
												}
											}).fail(function() {
										alert("No se ha podido guardar...");
									});
							;
						}
					});
	
}

function cancelar() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "almacen/movimiento/producto/index", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Productos Terminados - Registro de Movimientos");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}


$(function() {

});

var baseURL;

$(function() {



});

function formatoMoneda(num) {
    var p = parseFloat(num).toFixed(2);
    return p;
}

function formatoMoneda2(num) {
	var p = num.toFixed(2).split(".");
	return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
		return num + (i && !(i % 3) ? "," : "") + acc;
	}, "") + "." + p[1];
}

function validaCantidad(){
	var r;
	r=$('option:selected', $("#idProducto")).attr('stock')-$("#cantidad").val();
	if(r>=0){
		$("#guardaSalidaProducto").removeAttr("disabled");
		$("#alert-cantidad").html(" ");
	}else{
		$("#alert-cantidad").html("No se dispone");
		$("#alert-cantidad").show();
		$("#guardaSalidaProducto").attr("disabled", "disabled");
	}
}

function cambiaProducto(){
	$("#cantidad").val("");
	$("#alert-cantidad").html("");
}

