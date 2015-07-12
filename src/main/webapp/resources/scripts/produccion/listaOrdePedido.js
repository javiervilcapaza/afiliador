$(function() {
	
	var baseURL = $("#baseURL").val();
	
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
		source : baseURL + "produccion/cliente/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#idCliente").val(idCliente);			
		}
	});
	
	$("#descripcionProducto").autocomplete({
		source : baseURL + "produccion/producto/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idProducto = ui.item.id;
			$("#idProducto").val(idProducto);			
		}
	});
});

function buscar() {
	var baseURL = $("#baseURL").val();
	
	var fechaEmisionInicio=null;
	var fechaEmisionFin=null;
	var fechaEntregaInicio=null;
	var fechaEntregaFin=null;
	
	if($("#fechaEmisionInicio").val()!="" && $("#fechaEmisionFin").val()!=""){
		fechaEmisionInicio = $("#fechaEmisionInicio").val();
		fechaEmisionFin = $("#fechaEmisionFin").val();
	}
	
	if($("#fechaEntregaInicio").val()!="" && $("#fechaEntregaFin").val()!=""){
		fechaEntregaInicio = $("#fechaEntregaInicio").val();
		fechaEntregaFin = $("#fechaEntregaFin").val();
	}
	
	
	if ($("#numeroOP").val() != "" || $("#idCliente").val() != ""
			|| $("#idProducto").val() != ""  
			|| $("#fechaEmisionInicio").val() != "" || $("#fechaEmisionFin").val() != "" 
			|| $("#fechaEntregaInicio").val() != "" || $("#fechaEntregaFin").val() != "" || $("#estado").val() != "" ) {
		
		
				$.ajax({
					url  : baseURL + "produccion/buscaOrdenPedido",
					type : "POST",
					data : {
						codigoDocumento : $("#numeroOP").val(),
						idCliente : $("#idCliente").val(),
						idProducto : $("#idProducto").val(),
						fechaEmisionInicio : fechaEmisionInicio,
						fechaEmisionFin : fechaEmisionFin,
						fechaEntregaInicio : fechaEntregaInicio,
						fechaEntregaFin : fechaEntregaFin,
						estado : $("#estado").val(),
						
					}
				}).done(function( html ) {
					$("#lista").html(html);
					$("#title-page").html("Produccion - Orden de Pedido - Busqueda");
				});;

				// validacion.

	} else {
		alert("Inserte algun filtro de busqueda");
	}
};



function verOrdenPedido(idOP) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$.get(baseURL + "produccion/verOrdenPedido?idDocumento="+idOP, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Produccion - Orden de Pedido - Detalle");
	});
};

function limpiarFormularioBusqueda() {
	var baseURL, info;

	baseURL = $("#baseURL").val();
	$.get(baseURL + "produccion/listaOrdenPedido", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Produccion - Orden de Pedido");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}
