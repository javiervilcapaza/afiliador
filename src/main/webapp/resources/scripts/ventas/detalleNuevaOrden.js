var baseURL;
$(function() {
	
	var moneda;
	
	$( ".monedaPeru" ).each(function( index ) {
	moneda = currency($(this).html());
	$(this).html(moneda);
	
	});
	
	baseURL = $("#baseURL").val();
	$("#tablaDetalleNuevaOrden")
			.dataTable(
					{
						"bFilter" : false,
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
});

function nuevoDetalleOrden() {

	abrirDialogoDetalleNuevaOrden();

};

function abrirDialogoDetalleNuevaOrden(){
	
	var baseURL = $("#baseURL").val();
	
	var idCliente=$("#idCliente").val();

    $.get(baseURL + "ventas/formularioDetalleNuevaOrden?idCliente="+idCliente,function(respuesta){
		$(".modal-header #myModalLabel").html("Agregar detalle Orden de Pedido");
		$(".modal-body").html(respuesta);
		$(".modal-footer").hide();
		$("#myModal").modal('show');  
	
	});
}

function editarDetalle(idDetalle){
	var baseURL = $("#baseURL").val();
	
	var idCliente=$("#idCliente").val();
    $.get(baseURL + "ventas/formularioDetalleNuevaOrden?idCliente="+idCliente+"&idDetalle="+idDetalle,function(respuesta){
		$(".modal-header #myModalLabel").html("Editar detalle Orden de Pedido");
		$(".modal-body").html(respuesta);
		$(".modal-footer").hide();
		$("#myModal").modal('show');  
	
	});
	
}

function eliminarDetalle(idDetalle){
	var confirmacion = confirm("Esta seguro que desea quitar el Producto seleccionado?");

	if (confirmacion == true) {
	
	var baseURL = $("#baseURL").val();
	   $.get(baseURL + "ventas/detalle/elimina?idDetalle="+idDetalle,function(respuesta){
		   if(respuesta=="1"){
			   $.get(baseURL + "ventas/detalleNuevaOrden/"+$("#idDocumento").val(), function(respuesta) {
					$("#detalleOrdenPedido").html(respuesta);
					$("#myModal").modal('hide');  
					jQuery.jGrowl("Se ha eliminado correctamente.", {life : 5000});
			   });
			   
		   }else{
			   alert("No se ha podido eliminar.");
		   }
		});
	}
	   
}



function crearDialogoDetalleNuevarden(){
	$("#ventanaDetalleNuevaOrden").dialog({
		width: 1000,
		height: 400,
        resizable: false
	});
}

function cancelarProduccion(){
	var baseURL = $("#baseURL").val();
	$.get(baseURL + "produccion/listaOrdenPedido", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Produccion - Orden de Pedido");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function cancelar(){
	var baseURL = $("#baseURL").val();
	$.get(baseURL + "ventas/listaOrdenPedido", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Pedido Cliente - Lista");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}