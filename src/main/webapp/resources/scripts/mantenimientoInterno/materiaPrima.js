var baseURL;
$(function() {

	baseURL = $("#baseURL").val();

	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": baseURL + "mantenimientoInterno/listaJsonMateriaPrima",
        "bFilter" : false,
        "aoColumns" : [   
                       
                       { sClass: "center"},
                       { sClass: "center"},
                       { },
                       { sClass: "center"},
                       { sClass: "center"},  
                       { sClass: "right"},
                       { sClass: "right"},
                                              
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

		},
	 "fnInitComplete": function () {
			var moneda;
			
			$( ".monedaPeru" ).each(function( index ) {
			moneda = currency($(this).html());
			$(this).html(moneda);
			
			});
	 }
    } );
});

function buscarMateriaPrima() {

	$("#frmBusquedaMateriaPrima").validate({


		submitHandler : function(form) {


			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {

					$("#listaMateriaPrima").html(contenido);
				}
			});
		}
	});
};


function eliminarMateriaPrima(idMateriaPrima) {

	var confirmacion = confirm("Desea eliminar permanentemente esta MATERIA PRIMA?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/eliminarMateriaPrima?idMateriaPrima=" + idMateriaPrima, function(
				respuesta) {
			if (respuesta!=null && respuesta!=-1) {
				info = "Eliminado Correctamente";
			} 
			else if(respuesta==-1){
				info="No se puede eliminar porque se hace referencia desde otro mantenimiento";
			}
			else {
				info = "No fue eliminado";
			}

			$.get(baseURL + "mantenimientoInterno/listarMateriasPrimas?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Mantenimiento Materia Prima - Listado");
			});

		});

	}
}

function limpiarMateriaPrima() {
	$("#descripcionMateriaPrima").val("");
	$.get(baseURL + "mantenimientoInterno/listarMateriasPrimas", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Materia Prima - Listado");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function editarMateriaPrima(idMateriaPrima) {

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarMateriaPrima/"+idMateriaPrima, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Materia Prima - Edicion");

	});
};

function nuevoMateriaPrima() {
	var baseURL;
    var idMateriaPrima=-1;
	baseURL = $("#baseURL").val();

	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "mantenimientoInterno/editarMateriaPrima/"+idMateriaPrima, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Mantenimiento Materia Prima - Nuevo");

	});

};


