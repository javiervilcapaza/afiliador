jQuery(function($) {
$('input[type="text"]').setMask();
});


$(function() {
	
	var baseURL = $("#baseURL").val();
	
	
	
	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "reporte/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       { },
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center"},  
                        
                       { sClass: "center" }  ,
                       { sClass: "center" } 
                   ],
        
        
		"sPaginationType" : "full_numbers",
		"oLanguage" : {
			"oPaginate" : {
				"sPrevious" : "Anterior",
				"sNext" : "Siguiente",
				"sLast" : "Ultima",
				"sFirst" : "Primera"
			},

			"sLengthMenu" : 'Mostrar <select>'
					+ '<option value="5">5</option>'
					+ '<option value="10">10</option>'
					+ '<option value="30">30</option>'
					+ '<option value="40">40</option>'
					+ '<option value="50">50</option>'
					+ '<option value="-1">Todos</option>'
					+ '</select> registros',

			"sInfo" : "Mostrando del _START_ a _END_ (Total: _TOTAL_ resultados)",

			"sInfoFiltered" : " - filtrados de _MAX_ registros",

			"sInfoEmpty" : "No hay resultados de búsqueda",

			"sZeroRecords" : "No hay registros a mostrar",

			"sProcessing" : "Espere, por favor...",

			"sSearch" : "Buscar:",

		}
    } );

	$("#fechaEmisionInicio").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
	        $( "#fechaEmisionFin" ).datepicker( "option", "minDate", selectedDate );
	        
	      }
	});
	
	$("#fechaEmisionFin").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
		        $( "#fechaEmisionInicio" ).datepicker( "option", "maxDate", selectedDate );
		        
		      },
	});

	$("#fechaEntregaInicio").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
	        $( "#fechaEntregaFin" ).datepicker( "option", "minDate", selectedDate );
	
	      }
	});
	
	$("#fechaEntregaFin").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
		        $( "#fechaEntregaInicio" ).datepicker( "option", "maxDate", selectedDate );
		      
		      },
	});	
	

	
	$("#descripcionCliente").autocomplete({
		source : baseURL + "reporte/cliente/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#idCliente").val(idCliente);			
		}
	});
	
	$("#descripcionProducto").autocomplete({
		source : baseURL + "reporte/producto/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idProducto = ui.item.id;
			$("#idProducto").val(idProducto);			
		}
	});
	
	$("#descripcionProyecto").autocomplete({
		source : baseURL + "reporte/proyecto/autocompleteProyecto",
		minLength : 2,
		select : function(event, ui) {
			idProyecto = ui.item.id;
			$("#idProyecto").val(idProyecto);			
		}
	});
	
	
});

function buscar() {
	var baseURL = $("#baseURL").val();
	
	var fechaEmisionInicio=null;
	var fechaEmisionFin=null;
	var fechaEntregaInicio=null;
	var fechaEntregaFin=null;
	fechaEmisionInicio = $("#fechaEmisionInicio").val();
	fechaEmisionFin = $("#fechaEmisionFin").val();

	fechaEntregaInicio = $("#fechaEntregaInicio").val();
	fechaEntregaFin = $("#fechaEntregaFin").val();

	
	
	if ($("#numeroOP").val() != "" || $("#idCliente").val() != "" || $("#idProyecto").val() != "" || $("#idVendedor").val() != ""
			|| $("#idProducto").val() != ""  
			|| $("#fechaEmisionInicio").val() != "" || $("#fechaEmisionFin").val() != "" 
			|| $("#fechaEntregaInicio").val() != "" || $("#fechaEntregaFin").val() != "" || $("#estado").val() != "") {
		
		
				$.ajax({
					url  : baseURL + "reporte/buscaOrdenPedido",
					type : "POST",
					data : {
						codigoDocumento : $("#numeroOP").val(),
						idProyecto : $("#idProyecto").val(),
						idCliente : $("#idCliente").val(),
						idProducto : $("#idProducto").val(),
						fechaEmisionInicio : fechaEmisionInicio,
						fechaEmisionFin : fechaEmisionFin,
						fechaEntregaInicio : fechaEntregaInicio,
						fechaEntregaFin : fechaEntregaFin,
						idVendedor : $("#idVendedor").val(),
						estado : $("#estado").val(),
					}
				}).done(function( html ) {
					$("#lista").html(html);
				});;

				// validacion.

	} else {
		alert("Inserte algun filtro de busqueda");
	}
};

function limpiarFormularioBusqueda() {
	var baseURL;
	var reporte = $("#reporte").val();
	$("#contenidoPrincipal").html("Cargando...");
	baseURL = $("#baseURL").val();
	
	$.get(baseURL + "/reporte/ordenpedido/lista?reporte="+reporte, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		
		if(reporte=="OP-PorProducto"){
			$("#title-page").html("Reporte - Ventas : Reporte de Requerimiento de Materia Prima segun Producto  ");
		}
		if(reporte=="OP-PorMateriaPrima"){
			$("#title-page").html("Reporte - Ventas : Reporte de Requerimiento de Materia Prima segun OP");
		}
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function limpiarFechaEmision(){
	$("#fechaEmisionInicio").val("");
	$("#fechaEmisionFin").val("");
	$("#btnFechaEmision").hide();
}

function limpiarFechaEntrega(){
	$("#fechaEntregaInicio").val("");
	$("#fechaEntregaFin").val("");
	$("#btnFechaEntrega").hide();
}

function html(pedido){
	var baseURL = $("#baseURL").val();
	var reporte = $("#reporte").val();
	if(reporte=="OP-PorProducto"){
		abreReporte(baseURL + "reporte/ordenpedido/porProducto?tipo=XHTML&OP="+pedido);
	}
	if(reporte=="OP-PorMateriaPrima"){
		abreReporte(baseURL + "reporte/ordenPedido/porMateriaPrima?tipo=XHTML&OP="+pedido);
	}
}
function pdf(pedido){
	var reporte = $("#reporte").val();
	var baseURL = $("#baseURL").val();
	if(reporte=="OP-PorProducto"){
		abreReporte(baseURL + "reporte/ordenpedido/porProducto?tipo=PDF&OP="+pedido);
	}
	if(reporte=="OP-PorMateriaPrima"){
		abreReporte(baseURL + "reporte/ordenPedido/porMateriaPrima?tipo=PDF&OP="+pedido);
	}
}
function xls(pedido){
	var reporte = $("#reporte").val();
	var baseURL = $("#baseURL").val();
	if(reporte=="OP-PorProducto"){
		abreReporte(baseURL + "reporte/ordenpedido/porProducto?tipo=XLS&OP="+pedido);
	}
	if(reporte=="OP-PorMateriaPrima"){
		abreReporte(baseURL + "reporte/ordenPedido/porMateriaPrima?tipo=XLS&OP="+pedido);
	}
}

function abreReporte(url){
	window.open(url,"abrir","scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,top=60,left=100");
};


