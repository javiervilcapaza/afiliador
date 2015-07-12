function OPProducto() {
	var baseURL;
	$("#contenidoPrincipal").html("Cargando...");
	baseURL = $("#baseURL").val();
	$.get(baseURL + "/reporte/ordenpedido/lista?reporte=OP-PorProducto", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Reporte - Ventas : Reporte de Requerimiento de Materia Prima según Producto");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}
function OPMateriaPrima() {
	var baseURL;
	$("#contenidoPrincipal").html("Cargando...");
	baseURL = $("#baseURL").val();
	$.get(baseURL + "/reporte/ordenpedido/lista?reporte=OP-PorMateriaPrima", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Reporte - Ventas : Reporte de Requerimiento de Materia Prima según OP");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});}
