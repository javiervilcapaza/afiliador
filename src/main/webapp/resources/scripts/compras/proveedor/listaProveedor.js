$(function() {
	
	var baseURL = $("#baseURL").val();
	

	
	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": baseURL + "compras/proveedor/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       
                       { },  
                       { sClass: "center"},  
                       { },  
                       { sClass: "center"},  
                       { sClass: "center"}
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

function limpiarFormularioBusqueda() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "compras/proveedor/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proveedor - Listado");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}



function nuevo(){
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "compras/proveedor/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proveedor - Registro");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editar(id){
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "compras/proveedor/formulario?idProveedor="+id, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proveedor - Edicion");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

//
//function eliminarMovimientoMateriaPrima(id){
//	var confirmacion = confirm("Desea eliminar permanentemente esta MATERIA PRIMA?");
//
//	if (confirmacion == true) {
//
//		var baseURL, info;
//
//		baseURL = $("#baseURL").val();
//
//		$("#contenidoPrincipal").html("Cargando . . .");
//		$.get(baseURL + "almacen/movimiento/materiaPrima/eliminar?id=" + id, function(
//				respuesta) {
//			if (respuesta!=null && respuesta!=-1) {
//				info = "Eliminado Correctamente";
//			} 
//			else if(respuesta==-1){
//				info="No se puede eliminar porque la MATERIA PRIMA se utilizo";
//			}
//			else {
//				info = "No fue eliminado";
//			}
//
//			$.get(baseURL + "almacen/movimiento/materiaPrima/index?info=" + info, function(
//					respuesta) {
//				$("#contenidoPrincipal").html(respuesta);
//				$("#title-page").html("Materia Prima - Registro de Movimientos");
//			});
//
//		});
//
//	}
//}

function buscar() {

	var baseURL = $("#baseURL").val();
	if ($("#nombreProveedor").val() != "" || $("#ruc").val() != ""
			|| $("#estado").val() != "" ) {
				$.ajax({
					url : baseURL + "compras/proveedor/busqueda",
					type : "POST",
					data : {
						nombreComercial : $("#nombreProveedor").val(),
						ruc : $("#ruc").val(),
						estado : $("#estado").val()
					}
				}).done(function( html ) {
					$("#lista").html(html);
				});
	} else {
		alert("Inserte algun filtro de busqueda");
	}

};


