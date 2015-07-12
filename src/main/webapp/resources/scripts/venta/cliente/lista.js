
$(function() {
	
	var baseURL = $("#baseURL").val();

	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": baseURL + "venta/cliente/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       { },
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { },  
                       { sClass: "center"},  
                        
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
	if ($("#nombre").val() != "" || $("#ruc").val() != ""
			|| $("#grupoCorporativo").val() != "" || $("#vendedor").val() != "" || $("#estado").val() != "") {
				
				$.ajax({
					url : baseURL + "/venta/cliente/busca",
					type : "POST",
					data : {
						nombre : $("#nombre").val(),
						ruc : $("#ruc").val(),
						grupoCorporativo : $("#grupoCorporativo").val(),
						vendedor : $("#vendedor").val(),
						estado : $("#estado").val()
					}
				}).done(function( html ) {
					$("#lista").html(html);
				});;

				// validacion.

	} else {
		alert("Inserte algun filtro de busqueda");
	}
};

function crearArea() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/cliente/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Informacion del Cliente - Nuevo");

	});

};

function editarCliente(idCliente) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/cliente/formulario?idCliente=" + idCliente, function(
			respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Informacion del Cliente - Edicion");

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
	$.get(baseURL + "venta/cliente/lista", function(
			respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Informacion del Cliente - Lista");
	});
}
