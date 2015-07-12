


function generaReporte(tipo){

		var baseURL = $("#baseURL").val();
		
		abreReporte(baseURL + "reporte/movimiento/tipoMateriaPrima/generaMateriaPrima?tipo="+tipo+"&idTipoMateriaPrima="+$("#idTipoMateriaPrima").val());

	
	
}

function abreReporte(url){
	window.open(url,"abrir","scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,top=60,left=100");
};
