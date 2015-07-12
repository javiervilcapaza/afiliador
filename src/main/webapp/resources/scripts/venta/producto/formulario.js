function formatoMoneda(num) {
    var p = parseFloat(num).toFixed(2);
    return p;
}

function redondear(num)
{ 		
	var result=Math.round(num*100)/100
	return result;
}

$(function($){
	
	$( ".monedaPeruInput" ).autoNumeric('init', {aSep: false, aDec: '.'});
	
	var moneda;
	
		$( ".monedaPeru" ).each(function( index ) {
		moneda = currency($(this).html());
		$(this).html(moneda);
		
		});
	
	
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mie','Juv','Vie','Sab'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

function guarda() {

	
	
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ´]+$/i.test(value);
	}, "Este campo es alfanumerico.");
	
	$.validator.addMethod('decimal', function(value, element) {
	    return this.optional(element) || /^\d+(\.\d{0,2})?$/.test(value); 
	}, "Este campo es decimal");
	
	
	$("#frmGuarda")
			.validate(
					{

						rules : {
							nombreProducto : {
								required : true,
								
							},
							precioVentaFinal:"decimal",
							precioMin:"decimal",
							precioMax:"decimal",
							costoIndirectosFabricacion:"decimal"
								

						},

						messages : {
							nombreProducto : {
								required : "Este campo es requerido",
								
							},
						},

						submitHandler : function(form) {

							// validacion.

							$.ajax(form.action,	{
												async : false,
												type : "POST",
												data : $(form).serialize(),
												success : function(contenido) {
													
													
													
													if (contenido != 0) {
														
														var baseURL;

														baseURL = $("#baseURL").val();

														$("#contenidoPrincipal").html("Cargando . . .");
														$.get(baseURL + "venta/producto/formulario?idProducto=" + contenido,
																function(respuesta) {
																	$("#contenidoPrincipal").html(respuesta);
																	$("#title-page").html("Producto por Cliente - Edicion");
																	
																	jQuery.jGrowl("Guardado Exitosamente", {life : 5000});

																});
																										}
													 else {
														alert("El producto fue registrado.")
													}
												}
											}).fail(function() {
										alert("No se ha podido guardar...");
									});
							;
						}
					});
	
}

function cancelar() {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/producto/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Producto por Cliente - Lista");

	});
}

function nuevoManoObra(idProducto) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/producto/manobra/formulario?idProducto="
			+ idProducto, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Producto por Cliente - Agregar Mano de Obra");
	});
}
function editarMOP(idProducto, idMOP) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/producto/manobra/formulario?idProducto="
			+ idProducto + "&idManoObraProducto=" + idMOP, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Producto por Cliente - Editar Materia de Obra");
	});
}

function eliminarMOP(idProducto, idMOP) {

	var confirmacion = confirm("Esta seguro que desea eliminar la Mano de Obra seleccionada?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "venta/producto/manobra/eliminar?idManoObraProducto="
				+ idMOP, function(respuesta) {

			if (respuesta != null) {
				info = "Eliminado Correctamente";
			} else {
				info = "El Contacto no fue eliminado";
			}

			$.get(baseURL + "venta/producto/formulario?info=" + info
					+ "&idProducto=" + idProducto, function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Producto por cliente - Edicion");
			});

		});

	}
}

function nuevoMateriaPrima(idProducto) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/producto/materiaprima/formulario?idProducto="
			+ idProducto, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Producto por Cliente - Agregar Materia Prima");
	});
}

function editarMPP(idProducto, idMPP) {
	var baseURL;
	baseURL = $("#baseURL").val();
	$("#contenidoPrincipal").html("Cargando . . .");
	$.get(baseURL + "venta/producto/materiaprima/formulario?idProducto="
			+ idProducto + "&idMateriaPrima=" + idMPP, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Producto por Cliente - Editar Materia Prima");
	});
}

function eliminarMPP(idProducto, idMPP) {

	
		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$
				.get(
						baseURL
								+ "venta/producto/materiaprima/eliminar?idMateriaPrimaProducto="
								+ idMPP,
						function(respuesta) {

							if (respuesta != null) {
								info = "Eliminado Correctamente";
							} else {
								info = "El Contacto no fue eliminado";
							}

							$.get(baseURL+ "venta/producto/formulario?info="
													+ info + "&idProducto=" + idProducto,
											function(respuesta) {
												$("#contenidoPrincipal").html(
														respuesta);
												$("#title-page")
														.html(
																"Producto por cliente - Edicion");
											});

						});

}

function buscarCliente(){
	$.get(baseURL+ "ventas/buscarCliente",
	function(respuesta) {
		
		$(".modal-header #myModalLabel").html("Buscar Cliente");
		$(".modal-body").html(respuesta);
		$(".modal-footer").hide();
		$("#myModal").modal('show');  
		
	});
}

$(function() {

	
	
	
	
	var baseURL;

	baseURL = $("#baseURL").val();
	$("#descripcionCliente").autocomplete({
		source : baseURL + "venta/producto/cliente/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#idCliente").val(idCliente);
		}
	});

	$("#tabla")
			.dataTable(
					{
						"bFilter" : false,
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

							"sInfoEmpty" : "No hay resultados",

							"sZeroRecords" : "No hay registros a mostrar",

							"sProcessing" : "Espere, por favor...",

							"sSearch" : "Buscar:",

						}
					});

});

function totalProduccion() {
	var indirectos = parseFloat($("#costoIndirectosFabricacion").val());
	var cmop = parseFloat($("#costoMOO").val());
	var cmmp = parseFloat($("#costoMPP").val());
	if (this.val != "") {
		$("#totalProduccion").html(formatoMoneda2(indirectos + cmop + cmmp));
	}
}



var baseURL;

$(function() {
	var baseURL;
	baseURL = $("#baseURL").val();
	if ($("#nombreArchivo").val() != "") {
		$('#subirArchivo').val("Cambiar Archivo");
		$('#descargarArchivo').html("<a href='" + baseURL + $("#nombreArchivo").val()+ "'>Descargar Archivo</a>");
	}

	$("#fechaVigencia").datepicker({dateFormat: 'dd/mm/yy'});

	new AjaxUpload($("#subirFotografiaDescripcion"),{
		action :baseURL + "venta/producto/subeArchivos/"+$("#idArchivoFotografiaDescriptiva").val()+"/fd",
		name : "archivo",
		onSubmit : function(file, ext) {

			if (!(ext && /^(jpg|png|gif|doc|docx|xls|xlsx|rar|pdf|pdfx)$/.test(ext))) {

				// extensiones permitidas
				alert('Solo se permiten archivos .jpg .png .gif .doc .docx .rar .pdf');
				// cancela upload
				return false;
			} else {
				$('#loaderAjax').show();
				jQuery.jGrowl("Cargando...", { life: 8000});
				this.disable();
			}
		},
		onComplete : function(file, response) {
			respuesta = $.parseJSON(response);
			if(respuesta.respuesta==null){
				jQuery.jGrowl("No se ha subido el archivo correctamente", { life: 8000});
			}else{
			
			$.get(baseURL+ "venta/producto/asignarDescripcion?idArchivoVersion="+ respuesta.respuesta +"&descripcion="+$("#fotografiaDescripcion").val(),function(respuesta) {
				
				$.get(baseURL+ "venta/producto/formulario?idProducto=" + $("#idProducto").val(),
				function(respuesta) {
					$("#contenidoPrincipal").html(respuesta);
					$("#title-page").html("Producto por cliente - Edicion");
					jQuery.jGrowl("Se ha subido el archivo correctamente", { life: 8000});
				});
			
			});
			}
		}

	});
	
	new AjaxUpload($("#subirEspecificacionTecnica"),{
		action :baseURL + "venta/producto/subeArchivos/"+$("#idArchivoEspecificacionTecnica").val()+"/et",
		name : "archivo",
		onSubmit : function(file, ext) {

			if (!(ext && /^(jpg|png|gif|doc|docx|rar|pdf|xls|xlsx|pdfx)$/.test(ext))) {

				// extensiones permitidas
				alert('Solo se permiten archivos .jpg .png .gif .doc .xdoc .rar .pdf . xls');
				// cancela upload
				return false;
			} else {
				$('#loaderAjax').show();
				jQuery.jGrowl("Cargando...", { life: 8000});
				this.disable();
			}
		},
		onComplete : function(file, response) {
			
			respuesta = $.parseJSON(response);
			
			if(respuesta.respuesta==null){
				jQuery.jGrowl("No se ha subido el archivo correctamente", { life: 8000});
			}else{
			$.get(baseURL+ "venta/producto/asignarDescripcion?idArchivoVersion="+ respuesta.respuesta +"&descripcion="+$("#especificacionesDescripcion").val(),function(respuesta) {
				
				$.get(baseURL+ "venta/producto/formulario?idProducto=" + $("#idProducto").val(),
				function(respuesta) {
					$("#contenidoPrincipal").html(respuesta);
					$("#title-page").html("Producto por cliente - Edicion");
					jQuery.jGrowl("Se ha subido el archivo correctamente", { life: 8000});
				});

			});
			}
			
		}

	});

});

function formatoMoneda(num) {
    var p = parseFloat(num).toFixed(2);
    return p;
}

function formatoMoneda2(num) {
	var p = num.toFixed(2).split(".");
	return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
		return num + (i && !(i % 3) ? "," : "") + acc;
	}, "") + "." + p[1];
}

function eliminarArchivoVersion(idArchivoVersion){
	baseURL = $("#baseURL").val();
	if (confirm("Esta seguro que desea eliminar este archivo ?")) {
		$.get(baseURL+ "/venta/producto/subirArchivo/eliminarArchivoVersion?idArchivoVersion="+idArchivoVersion,function(respuesta) {
			if(respuesta==1){
				$.get(baseURL+ "venta/producto/formulario?idProducto=" + $("#idProducto").val(),
						function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Producto por cliente - Edicion");
						});
				jQuery.jGrowl("El archivo ha eliminado correctamente", { life: 8000});				
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

