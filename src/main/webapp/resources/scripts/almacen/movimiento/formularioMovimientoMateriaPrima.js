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
	

});

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
							tipoMateriaPrima : {
								required : true,
								
							},
							vaucher:"required",
							numeroGuia:"required",
							materiaPrima:"required",
							cantidad:{
								decimal:true,
								required:true
							}
								

						},

						messages : {
							tipoMateriaPrima : {
								required : "Este campo es requerido",
								
							},
							vaucher:"Este campo es requerido",
							numeroGuia:"Este campo es requerido",
							materiaPrima:"Este campo es requerido", 
							cantidad:{
								decimal:"Este campo es decimal",
								required:"Este campo es requerido"
							}
						},

						submitHandler : function(form) {

							// validacion.

							$.ajax(form.action,	{
												async : false,
												type : "POST",
												data : $(form).serialize(),
												success : function(contenido) {
													$.get(baseURL + "almacen/movimiento/materiaPrima/index", function(respuesta) {
														$("#contenidoPrincipal").html(respuesta);
														$("#title-page").html("Materia Prima - Registro de Movimientos");
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
	$.get(baseURL + "almacen/movimiento/materiaPrima/index", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Materia Prima - Registro de Movimientos");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}


$(function() {

});

var baseURL;

$(function() {
	
	var baseURL = $("#baseURL").val();
	$("#desOrdenPedido").autocomplete({
		source : baseURL + "almacen/movimiento/documento/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			var OP = ui.item.id;
			$("#nroOrdenPedido").val(OP);
			cargaTipoMateriaPrimaSalida();
		}
	});

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

function cargaMateriaPrima(){

			
		var baseURL = $("#baseURL").val();
		$("#comboProyecto").html("<option value=''>Seleccione Materia Prima</option>");
		$.get(baseURL + "almacen/comboMateriaPrima/"+$("#tipoMateriaPrima").val(), function(respuesta) {
			var string="<option value=''>Seleccione Materia Prima</option>";
			
			jQuery.each(respuesta, function(i, val) {
				if(i!=null){
					string = string+"<option value='"+val.id+"'>"+val.value+"</value>";
				}
				});
			
			
			$("#materiaPrima").html(string);
			
		});
}

function cargaMateriaPrimaSalida(){
	cambiaMateriaPrima();
		var baseURL = $("#baseURL").val();
		$("#comboProyecto").html("<option value=''>(Seleccione)</option>");
		$.get(baseURL + "almacen/comboMateriaPrimaSalida?tipoMateriaPrima="+$("#tipoMateriaPrima").val()+"&numPedido="+$("#nroOrdenPedido").val(), function(respuesta) {
			var string="<option value=''>(Seleccione)</option>";
			
			jQuery.each(respuesta, function(i, val) {
				if(i!=null){
					string = string+"<option value='"+val.id+"' stock="+val.stock+">"+val.value+"</value>";
				}
				});
			
			
			$("#materiaPrima").html(string);
			
		});
}

function cargaTipoMateriaPrimaSalida(){
	cambiaMateriaPrima();
	if($("#nroOrdenPedido").val()!=""){
			
		var baseURL = $("#baseURL").val();
		$("#tipoMateriaPrima").html("<option value=''>(Seleccione)</option>");
		$.get(baseURL + "almacen/comboTipoMateriaPrimaSalida/"+$("#nroOrdenPedido").val(), function(respuesta) {
			var string="<option value=''>(Seleccione)</option>";
			
			jQuery.each(respuesta, function(i, val) {
				if(i!=null){
					string = string+"<option value='"+val.id+"' >"+val.value+"</value>";
				}
				});
			
			
			$("#tipoMateriaPrima").html(string);
			
		});
	}else{
		alert("Ingrese el Numero de Orden de Pedido");
	}
}

function validaCantidad(){
	var r;
	r=$('option:selected', $("#materiaPrima")).attr('stock')-$("#cantidad").val();
	if(r>=0){
		$("#guardaSalida").removeAttr("disabled");
		$("#alert-cantidad").html(" ");
	}else{
		$("#alert-cantidad").html("No se dispone");
		$("#alert-cantidad").show();
		$("#guardaSalida").attr("disabled", "disabled");
	}
}

function cambiaMateriaPrima(){
	$("#cantidad").val("");
	$("#alert-cantidad").html("");
}

function cargaUnidadMedida(){
	var baseURL = $("#baseURL").val();
		$.get(baseURL + "almacen/movimiento/materiaPrima/unidadMedidaMatPrima?idMateriaPrima="+$("#materiaPrima").val(), function(respuesta) {
			$("#unidadMedida").html(respuesta);
	});
}


