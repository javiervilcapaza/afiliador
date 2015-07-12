$(function() {
	
	var baseURL = $("#baseURL").val();

	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": baseURL + "venta/proyecto/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       { },
                       { },  
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center"},  
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
	if ($("#idCliente").val() != ""
			|| $("#nombreProyecto").val() != "" || $("#estado").val() != "") {
				// alert($("#idCliente").val()+("#tipoProducto").val()+("#nombreProducto").val()+$("#estado").val());
				$.ajax({
					url : baseURL + "/venta/proyecto/busca",
					type : "POST",
					data : {
						idCliente : $("#idCliente").val(),
						nombreProyecto : $("#nombreProyecto").val(),
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

function crearProyecto() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/proyecto/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proyecto por Cliente - Nuevo");

	});

};

function editar(idProyecto) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/proyecto/formulario?idProyecto=" + idProyecto,
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Proyecto por Cliente - Edicion");

			});
};

function eliminar(idProducto) {

	var confirmacion = confirm("Desea eliminar permanentemente este Proyecto?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "venta/proyecto/elimina?idProyecto=" + idProducto,
				function(respuesta) {
					if (respuesta!=null && respuesta!=-1 ) {
						info = "Eliminado Correctamente";
					}
					else if(respuesta==-1){
						info="No se puede eliminar porque se hace referencia a este proyecto";
					}
					else {
						info = "El Proyecto no fue eliminado";
					}

					$.get(baseURL + "venta/proyecto/lista?info=" + info,
							function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html(
										"Proyecto por Cliente - Lista");
							});

				});

	}
}
function limpiarFormularioBusqueda() {
	var baseURL, info;

	baseURL = $("#baseURL").val();
	$.get(baseURL + "venta/proyecto/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Proyecto por Cliente - Lista");
	});
}
