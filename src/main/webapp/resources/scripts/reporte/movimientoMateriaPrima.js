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

	
});

function limpiarFecha(){
	$("#fechaEmisionInicio").val("");
	$("#fechaEmisionFin").val("");
	$("#btnFechaEmision").hide();
}



function generaReporte(tipo){
	if($('#idMateriaPrima').val()!=""){
		var reporte = $("#reporte").val();
		var baseURL = $("#baseURL").val();
		var data="";
		
		if($("#idMateriaPrima").val()!=""){
			data =data + "&materiaPrima="+ $("#idMateriaPrima").val(); 
		}
		if($("#codigo").val()!=""){
			data =data + "&codigo="+$("#codigo").val(); 
		}
		if($("#fechaDesde").val()!=""){
			data =data + "&fechaDesde="+$("#fechaDesde").val(); 
		}
		if($("#fechaHasta").val()!=""){
			data =data + "&fechaHasta="+$("#fechaHasta").val(); 
		}
		if($("#tipoMovimiento").val()!=""){
			data =data + "&tipoMovimiento="+$("#tipoMovimiento").val(); 
		}
		
		abreReporte(baseURL + "reporte/movimiento/materiaPrima/generaMateriaPrima?tipo="+tipo+"&idTipoMateriaPrima="+$("#idTipoMateriaPrima").val()+data);
	}else{
		alert("El Campo Materia Prima es Requerido");
	}
	
	
}

function abreReporte(url){
	window.open(url,"abrir","scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,top=60,left=100");
};

function cargaMateriaPrima(){
	var baseURL = $("#baseURL").val();
	$.get(baseURL + "reporte/comboMateriaPrima/"+$("#idTipoMateriaPrima").val(), function(respuesta) {
		var string="<option value=''>Seleccione Materia Prima</option>";
		
		jQuery.each(respuesta, function(i, val) {
			if(i!=null){
				string = string+"<option value='"+val.id+"'>"+val.value+"</value>";
			}
			});
		
		
		$("#idMateriaPrima").html(string);
		
	});
}


