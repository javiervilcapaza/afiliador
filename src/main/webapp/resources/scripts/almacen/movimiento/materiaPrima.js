$(function() {
	
	var baseURL = $("#baseURL").val();
	

	
	$('#tabla').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": baseURL + "almacen/movimiento/materiaPrima/listaJson",
        "bFilter" : false,
        "aoColumns" : [   
                       
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center"},  
                       { sClass: "center" },
                       { sClass: "center" },
                       { sClass: "center" },
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

	
	$("#fechaMovimientoInicio").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
	        $( "#fechaMovimientoFin" ).datepicker( "option", "minDate", selectedDate );
	        
	      }
	});
	
	$("#fechaMovimientoFin").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		onClose: function( selectedDate ) {
		        $( "#fechaMovimientoInicio" ).datepicker( "option", "maxDate", selectedDate );
		        
		      },
	});
});

function limpiarFormularioBusqueda() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "almacen/movimiento/materiaPrima/index", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Materia Prima - Registro de Movimientos");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function limpiarFechaMovimiento(){
	$("#fechaMovimientoInicio").val("");
	$("#fechaMovimientoFin").val("");
	$("#btnFechaMovimiento").hide();
}

function cargaMateriaPrima(){
	var baseURL = $("#baseURL").val();
	$("#comboProyecto").html("<option value=''>Seleccione Materia Prima</option>");
	$.get(baseURL + "almacen/comboMateriaPrima/"+$("#tipoMateriaPrima").val(), function(respuesta) {
		var string="<option value=''>Seleccione Materia Prima</option>";
		
		jQuery.each(respuesta, function(i, val) { 
			if(i!=null){
				string = string+"<option value='"+val.id+"'>"+val.value+"</value>";
			}
			});
		
		
		$("#materiaPrima").html(string);
		
	});
}

function nuevoIngreso(){
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "almacen/movimiento/materiaPrima/formulario?info=ingreso", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Materia Prima - Registro de Ingreso");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function nuevaSalida(){
	var baseURL;
	baseURL = $("#baseURL").val();
	$.get(baseURL + "almacen/movimiento/materiaPrima/formulario?info=salida", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Materia Prima - Registro de Salida");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function eliminarMovimientoMateriaPrima(id){
	var confirmacion = confirm("Desea eliminar permanentemente esta MATERIA PRIMA?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "almacen/movimiento/materiaPrima/eliminar?id=" + id, function(
				respuesta) {
			if (respuesta!=null && respuesta!=-1) {
				info = "Eliminado Correctamente";
			} 
			else if(respuesta==-1){
				info="No se puede eliminar porque la MATERIA PRIMA se utilizo";
			}
			else {
				info = "No fue eliminado";
			}

			$.get(baseURL + "almacen/movimiento/materiaPrima/index?info=" + info, function(
					respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Materia Prima - Registro de Movimientos");
			});

		});

	}
}

function buscar() {

	var baseURL = $("#baseURL").val();
	if ($("#materiaPrima").val() != "" || $("#codigo").val() != ""
			|| $("#fechaMovimientoInicio").val() != "" || $("#fechaMovimientoFin").val() != "" || $("#tipoMovimiento").val() != "" ) {
				$.ajax({
					url : baseURL + "/almacen/movimiento/materiaPrima/busca",
					type : "POST",
					data : {
						materiaPrima : $("#materiaPrima").val(),
						codigo : $("#codigo").val(),
						fechaMovimientoInicio : $("#fechaMovimientoInicio").val(),
						fechaMovimientoFin : $("#fechaMovimientoFin").val(),
						tipoMovimiento: $("#tipoMovimiento").val()
					}
				}).done(function( html ) {
					$("#lista").html(html);
				});;

				// validacion.

	} else {
		alert("Inserte algun filtro de busqueda");
	}

};


