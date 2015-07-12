function cancelar(id){
	var baseURL;

	baseURL = $("#baseURL").val();

	$.get(baseURL + "produccion/verOrdenPedido?idDocumento="+id, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Produccion - Orden de Pedido - Detalle");
	});
}