$(function () {
	
	var baseURL = $("#baseURL").val();
	
	$("#fechaMovimientoInicio").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
	        $( "#fechaMovimientoFin" ).datepicker( "option", "minDate", selectedDate );
	      }
	});
	
	$("#fechaMovimientoFin").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
		        $( "#fechaMovimientoInicio" ).datepicker( "option", "maxDate", selectedDate );
		      },
	});
	
	$("#clienteAutocomplete").autocomplete({
		source : baseURL + "reporte/cliente/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#cliente").val(idCliente);	
			cargaTipoProductos(idCliente);
		}
	});
});

function cargaTipoProductos(idCliente){
	var baseURL = $("#baseURL").val();

	$("#tipoProducto").html("<option value='0'>( Todos )</option>");
	$.get(baseURL + "reporte/movimiento/comboTipoProductoPorCliente?idCliente="+idCliente, function(respuesta) {
		var string="<option value='0'>( Todos )</option>";
		jQuery.each(respuesta, function(i, val) {
			if(i!=null){
				string = string+"<option value='"+val.id+"'>"+val.value+"</value>";
			}
			});
		$("#tipoProducto").html(string);
		
	});
}

function limpiarFormularioMovimiento() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "reporte/productoMovimientos/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Reporte - Almacen : Movimientos de Producto Terminado");
	});
}

function limpiarFormularioSaldo() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "/reporte/productoSaldo/lista?reporte=Saldo-Productos", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Reporte - Almacen : Saldo de Productos Terminados");
	});
}

function pdf(){
	var baseURL = $("#baseURL").val();
	var cliente = $("#cliente").val();
	var tipoProducto = $("#tipoProducto").val();
	
	if (cliente != "" ) {
			abreReporte(baseURL + "/reporte/movimiento/productoSaldo/generaReporte?tipo=PDF&cliente="+cliente+"&tipoProducto="+tipoProducto);
	} else {
		alert("Inserte el campo Cliente");
	}
}

function xls(){

	var baseURL = $("#baseURL").val();
	var cliente = $("#cliente").val();
	var tipoProducto = $("#tipoProducto").val();
	if (cliente != ""  ) {
			abreReporte(baseURL + "/reporte/movimiento/productoSaldo/generaReporte?tipo=XLS&cliente="+cliente+"&tipoProducto="+tipoProducto);
	}else{
		alert("Inserte el campo Cliente");
	}
}

function abreReporte(url){
	window.open(url,"abrir","scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,top=60,left=100");
};

