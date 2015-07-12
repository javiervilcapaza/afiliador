function descargar(type) {
	
	alert(type);
	
	var baseURL = $("#baseURL").val();
		// Retrieve download token
		// When token is received, proceed with download
		$.get(baseURL + "ventas/download/token", function(response) {
			// Store token
			var token = response.message[0];
			
			// Show progress dialog
			$('#msgbox').text('Processing download...');
			$('#msgbox').dialog( 
					{	title: 'Download',
						modal: true,
						buttons: {"Close": function()  {
							$(this).dialog("close");} 
						}
					});
			
			// Start download
			window.location = baseURL + "ventas/download"+'?token='+token+'&type='+type;
			
			// Check periodically if download has started
			var frequency = 1000;
			var timer = setInterval(function() {
				$.get(baseURL + "ventas/download/progress", {token: token}, 
						function(response) {
							// If token is not returned, download has started
							// Close progress dialog if started
							if (response.message[0] != token) {
								$('#msgbox').dialog('close');
								clearInterval(timer);
							}
					});
			}, frequency);
			
		});
	}










jQuery(function($) {
$('input[type="text"]').setMask();
});


$(function() {
	
	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "ventas/OPListaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       { sClass: "center"},
                       { sClass: "center"},  
                       {},  
                       {},  
                       { sClass: "center"},  
                        
                       { sClass: "center" }  ,
                       { sClass: "center" },
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
	});

	
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
		source : baseURL + "ventas/cliente/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#idCliente").val(idCliente);			
		}
	});
	
	$("#descripcionProducto").autocomplete({
		source : baseURL + "ventas/producto/autocomplete",
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
			|| $("#fechaEntregaInicio").val() != "" || $("#fechaEntregaFin").val() != "" || $("#estado").val() != ""|| $("#idVendedor").val() != "") {
		
		
				$.ajax({
					url  : baseURL + "ventas/buscaOrdenPedido",
					type : "POST",
					data : {
						codigoDocumento : $("#numeroOP").val(),
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

function crearOrdenPedido() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("");
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "ventas/nuevaOrdenPedido", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Pedido Cliente - Nuevo");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});

};

function editarOrdenPedido(idOP) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$.get(baseURL + "ventas/nuevaOrdenPedido?idDocumento="+idOP, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Pedido Cliente - Edicion");
	});
};


function verOrdenPedido(idOP) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$.get(baseURL + "ventas/verOrdenPedido?idDocumento="+idOP, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Pedido Cliente - Vista");
	});
};

function eliminarCliente(idCliente) {

	var confirmacion = confirm("Desea eliminar permanentemente este Cliente?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "venta/cliente/eliminar?idCliente=" + idCliente, function(
				respuesta) {
			
			if (respuesta!=null) {
				info = "Eliminado Correctamente";
			} else {
				info = "El cliente no fue eliminado";
			}

			$.get(baseURL + "venta/cliente/lista?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Informacion del Cliente - Lista");
			});

		});

	}
}
function limpiarFormularioBusqueda() {
	var baseURL, info;

	baseURL = $("#baseURL").val();
	$.get(baseURL + "ventas/listaOrdenPedido", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Pedido Cliente - Lista");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}
