$(function() {
	
	$("#tablaBusqueda tbody tr").mouseover(function() {
		//alert("on");
	     // a la fila sobre la que esté el ratón (this)
	     // le añado la clase que la resaltará
	     $(this).addClass("tr_hover");
	});
	
	$("#tablaBusqueda tbody tr").mouseout(function() {
		
		//alert("off");
	     // a la fila sobre la que esté el ratón (this)
	     // le quito la clase que hace que resalte
	     $(this).removeClass("tr_hover");
	});
	
});

function agregarCliente(id,rs,ruc){

		$("#razonSocialBusqueda").val(rs);
		$("#rucBusqueda").val(ruc);
		$("#idCliente").val(id);
		
		$(".modal-body").html('');
		$("#myModal").modal('hide'); 
		

}