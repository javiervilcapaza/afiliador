var baseURL;

$(function() {
	$('#nombre').keypress(function(event){
		 
		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if(keycode == '13'){
			buscarClientePopup();	
		}
		event.stopPropagation();
	});
	
	
	baseURL = $("#baseURL").val();
	
	$("#tablaAdministrarJugadores tbody tr").mouseover(function() {
	     // a la fila sobre la que esté el ratón (this)
	     // le añado la clase que la resaltará
	     $(this).addClass("tr_hover");
	});
	
	$("#tablaAdministrarJugadores tbody tr").mouseout(function() {
	     // a la fila sobre la que esté el ratón (this)
	     // le quito la clase que hace que resalte
	     $(this).removeClass("tr_hover");
	});
});

function buscarClientePopup() {
	
	if($("#nombre").val().length > 1){
			$.ajax({
				url : baseURL + "/ventas/buscarClientePopPup",
				type : "POST",
				data : {nombre : $("#nombre").val()},
				success : function(contenido) {
					if(contenido!=""){
						$("#resultadoBusqueda").html(contenido);
					}					
				}
			});
	}else{
		alert("Filtro de busqueda mayor a 2 digitos");
	}
};

function cancelarBusqueda() {
	
	$("#buscarCliente").dialog("close");
	$("#buscarCliente").html("");
	
}
	
	