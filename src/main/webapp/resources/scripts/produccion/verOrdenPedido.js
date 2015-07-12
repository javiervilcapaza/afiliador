var baseURL;
$(function() {
	var baseURL;
	baseURL = $("#baseURL").val();
	new AjaxUpload($("#subirPlanProduccion"),{
		action :baseURL + "produccion/subePlanProduccion/"+$("#idPlanProduccion").val(),
		name : "archivo",
		onSubmit : function(file, ext) {

			if (!(ext && /^(jpg|png|gif|doc|docx|xls|xlsx|rar|pdf|pdfx)$/.test(ext))) {

				// extensiones permitidas
				alert('Solo se permiten archivos .jpg .png .gif .doc .docx .rar .pdf');
				// cancela upload
				return false;
			} else {
				$('#loaderAjax').show();
				jQuery.jGrowl("Cargando...", { life: 5000});
				this.disable();
			}
		},
		onComplete : function(file, response) {
			respuesta = $.parseJSON(response);
			if(respuesta.respuesta==null){
				jQuery.jGrowl("No se ha subido el archivo correctamente", { life: 8000});
			}else{
			
				$.get(baseURL + "produccion/verOrdenPedido?idDocumento="+$("#idDocumento").val(), function(respuesta) {
					$("#contenidoPrincipal").html(respuesta);
					$("#title-page").html("Produccion - Orden de Pedido - Detalle");
					jQuery.jGrowl("Se ha subido correctamente.", { life: 8000});
				});
			}
		}
	});
	
});
$(function() {
	
	var moneda;
	
	$( ".monedaPeru" ).each(function( index ) {
	moneda = currency($(this).html());
	$(this).html(moneda);
	
	});
	
});


function cancelarProduccion(){
	var baseURL = $("#baseURL").val();
	$.get(baseURL + "produccion/listaOrdenPedido", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Produccion - Orden de Pedido");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function eliminarArchivoVersion(idArchivoVersion){
	var baseURL = $("#baseURL").val();
	baseURL = $("#baseURL").val();
	if (confirm("Esta seguro que desea eliminar este archivo ?")) {
		$.get(baseURL+ "/produccion/eliminarArchivoVersion?idArchivoVersion="+idArchivoVersion,function(respuesta) {
			if(respuesta==1){
				$.get(baseURL + "produccion/verOrdenPedido?idDocumento="+$("#idDocumento").val(), function(respuesta) {
					$("#contenidoPrincipal").html(respuesta);
					$("#title-page").html("Produccion - Orden de Pedido - Detalle");
				});
				jQuery.jGrowl("El archivo se ha eliminado correctamente", { life: 8000});				
			}
			if(respuesta==0){
				jQuery.jGrowl("El archivo no existe", { life: 8000});
			}
			if(respuesta==3){
				jQuery.jGrowl("No se pudo elimar", { life: 8000});
			}	

		});

	}
	
}

function pasarAProduccion(){
	
	if (confirm("Esta Seguro de Pasar a Produccion?")) {
	var baseURL = $("#baseURL").val();
		if($("#planProduccionArchivos").val()==''){
			alert('Aun no se Subio el Plan de Produccion');
		}else{
			$.get(baseURL + "produccion/ordenPedidoProducir/"+$("#idDocumento").val(), function(respuesta) {
				jQuery.jGrowl("Se Paso a Produccion Satisfactoriamente.", {life : 5000});
		   });
		}
	}	
}

function verProducto(id){
	var baseURL = $("#baseURL").val();
	$.get(baseURL + "produccion/verProducto?idOP="+$("#idDocumento").val()+"&idProducto="+id, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Produccion - Producto - Detalle");
	});
}
