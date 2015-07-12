$(function() {
	
	var baseURL = $("#baseURL").val();

	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": baseURL + "venta/producto/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       { },
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { },  
                       { sClass: "center"},  
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
			|| $("#nombreProducto").val() != "" || $("#estado").val() != "" || $("#numeroProducto").val() != "" ) {
				// alert($("#idCliente").val()+("#tipoProducto").val()+("#nombreProducto").val()+$("#estado").val());
				$.ajax({
					url : baseURL + "/venta/producto/busca",
					type : "POST",
					data : {
						idCliente : $("#idCliente").val(),
						tipoProducto : $("#tipoProducto").val(),
						nombreProducto : $("#nombreProducto").val(),
						estado : $("#estado").val(),
						numeroProducto: $("#numeroProducto").val()
					}
				}).done(function( html ) {
					$("#lista").html(html);
				});;

				// validacion.

	} else {
		alert("Inserte algun filtro de busqueda");
	}

};

function seleccionaCliente() {
	if (document.getElementById('descripcionCliente').value.length > 2) {
		var baseURL;

		baseURL = $("#baseURL").val();

		var descripcion = document.getElementById('descripcionCliente').value;
		$.get(baseURL + "venta/cliente/busqueda?busca=" + descripcion,
				function(respuesta) {
					if (respuesta != null) {
						$("#contenidoAutocomplete").html(respuesta);
						$("#contenidoAutocomplete").show();

					}
				});

	} else {
		$("#contenidoAutocomplete").hide();
	}

}

function llenaCliente(id, descripcion) {
	$("#idCliente").val(id);
	$("#descripcionCliente").val(descripcion);
	$("#contenidoAutocomplete").hide();
}

function crearProducto() {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/producto/formulario", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Producto por Cliente - Nuevo");

	});

};

function editar(idProducto) {
	var baseURL;

	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/producto/formulario?idProducto=" + idProducto,
			function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Producto por Cliente - Edicion");

			});
};

function eliminarProducto(idProducto) {

	var confirmacion = confirm("Desea eliminar permanentemente este Producto?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "venta/producto/eliminar?idProducto=" + idProducto,
				function(respuesta) {

					if (respuesta != null) {
						info = "Eliminado Correctamente";
					} else {
						info = "El Producto no fue eliminado";
					}

					$.get(baseURL + "venta/producto/lista?info=" + info,
							function(respuesta) {
								$("#contenidoPrincipal").html(respuesta);
								$("#title-page").html(
										"Producto por Cliente - Lista");
							});

				});

	}
}
function limpiarFormularioBusqueda() {
	var baseURL, info;

	baseURL = $("#baseURL").val();
	$.get(baseURL + "venta/producto/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Producto por Cliente - Lista");
	});
}
