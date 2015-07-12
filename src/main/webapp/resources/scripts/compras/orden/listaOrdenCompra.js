$(function() {
	

	
	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "compras/orden/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       { sClass: "center"},
                       { sClass: "center"},  
                       {},  
                       {},  
                       { sClass: "center"},  
                        
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
	
	var baseURL = $("#baseURL").val();
	$("#decripcionProveedor").autocomplete({
		source : baseURL + "compras/autcompleteProveedor",
		minLength : 2,
		select : function(event, ui) {
			idUbigeo = ui.item.id;
			$("#idProveedor").val(idUbigeo);
		}
	});

	
});


function crearOrdenCompra() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("");
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "compras/orden/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Compra - Nuevo");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});

};

function editarOrdenPedido(idOP) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$.get(baseURL + "compras/orden/formulario/?idDocumento="+idOP, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Compra - Edicion");
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

function limpiarFormularioBusqueda() {
	var baseURL, info;

	baseURL = $("#baseURL").val();
	$.get(baseURL + "compras/orden/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

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
	
	
	if ($("#numeroOP").val() != "" || $("#idProveedor").val() != ""
			|| $("#fechaEmisionInicio").val() != "" || $("#fechaEmisionFin").val() != "" 
			|| $("#fechaEntregaInicio").val() != "" || $("#fechaEntregaFin").val() != "" || $("#estado").val() != "") {
		
		
				$.ajax({
					url  : baseURL + "compras/orden/buscaOrdenCompra",
					type : "POST",
					data : {
						codigoDocumento : $("#numeroOC").val(),
						idProveedor : $("#idProveedor").val(),
						fechaEmisionInicio : fechaEmisionInicio,
						fechaEmisionFin : fechaEmisionFin,
						fechaEntregaInicio : fechaEntregaInicio,
						fechaEntregaFin : fechaEntregaFin,
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
