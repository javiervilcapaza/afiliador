$(function() {
	
	var baseURL = $("#baseURL").val();

	$("#fechaDesde").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
	        $( "#fechaHasta" ).datepicker( "option", "minDate", selectedDate );
	        
	      }
	});
	
	$("#fechaHasta").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
		        $( "#fechaDesde" ).datepicker( "option", "maxDate", selectedDate );
		        
		      },
	});
	
	$("#descripcionCliente").autocomplete({
		source : baseURL + "reporte/cliente/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#idCliente").val(idCliente);	
			cargaProducto(idCliente);
			
		}
	});

	
});

function limpiarFecha(){
	$("#fechaEmisionInicio").val("");
	$("#fechaEmisionFin").val("");
	$("#btnFechaEmision").hide();
}



function generaReporte(tipo){
	if($('#idProducto').val()!=""){

		var baseURL = $("#baseURL").val();
		
		
		var data="&talla="+$("#talla").val();
		
		if($("#fechaDesde").val()!=""){
			data =data + "&fechaDesde="+$("#fechaDesde").val(); 
		}
		if($("#fechaHasta").val()!=""){
			data =data + "&fechaHasta="+$("#fechaHasta").val(); 
		}
		if($("#tipoMovimiento").val()!=""){
			data =data + "&tipoMovimiento="+$("#tipoMovimiento").val(); 
		}
		
		abreReporte(baseURL + "reporte/movimiento/producto/generaReporteProducto?tipo="+tipo+"&idProducto="+$("#idProducto").val()+data);
	}else{
		alert("El Campo Producto es Requerido");
	}
	
	
}

function abreReporte(url){
	window.open(url,"abrir","scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,top=60,left=100");
};

function cargaProducto(idCliente){
	var baseURL = $("#baseURL").val();
	
	$.get(baseURL + "reporte/movimiento/producto/comboProducto?idCliente="+idCliente, function(respuesta) {
		var string="<option value=''> Seleccione </option>";
		
		jQuery.each(respuesta, function(i, val) {
			if(i!=null){
				string = string+"<option value='"+val.id+"'>"+val.value+"</value>";
			}
			});
		
		
		$("#idProducto").html(string);
		
	});
}


