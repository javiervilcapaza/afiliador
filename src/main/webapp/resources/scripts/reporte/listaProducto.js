$(function() {
	
	var baseURL = $("#baseURL").val();
	$( "#descripcionCliente" ).autocomplete({
	    source: baseURL + "reporte/cliente/autocomplete",
	    minLength: 2,
	    select: function( event, ui ) {
			idCliente=ui.item.id;
			$("#idCliente").val(idCliente);
	    }
	  });
	
	
	
	
	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "reporte/producto/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       {},
                       { sClass: "center"},  
                       {  sClass: "center"},  
                       { },  
                       {sClass: "center" },  
                        
                        
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

	
	
});

function buscar() {

	var baseURL = $("#baseURL").val();
	if ($("#idCliente").val() != "" || $("#tipoProducto").val() != ""
		|| $("#codigoProducto").val() != "" || $("#nombreProducto").val() != "" || $("#estado").val() != "") {
				// alert($("#idCliente").val()+("#tipoProducto").val()+("#nombreProducto").val()+$("#estado").val());
				$.ajax({
					url : baseURL + "/reporte/producto/busca",
					type : "POST",
					data : {
						idCliente : $("#idCliente").val(),
						tipoProducto : $("#tipoProducto").val(),
						nombreProducto : $("#nombreProducto").val(),
						estado : $("#estado").val(),
						codigoProducto : $("#codigoProducto").val()
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
	
	$.get(baseURL + "/reporte/producto/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}


function html(pedido){
	var baseURL = $("#baseURL").val();
	abreReporte(baseURL + "reporte/producto/analisisCosto?tipo=XHTML&idProducto="+pedido);
}
function pdf(pedido){
	var baseURL = $("#baseURL").val();
	abreReporte(baseURL + "reporte/producto/analisisCosto?tipo=PDF&idProducto="+pedido);
}
function xls(pedido){
	var baseURL = $("#baseURL").val();
	abreReporte(baseURL + "reporte/producto/analisisCosto?tipo=XLS&idProducto="+pedido);
}

function abreReporte(url){
	window.open(url,"abrir","scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,top=60,left=100");
};


