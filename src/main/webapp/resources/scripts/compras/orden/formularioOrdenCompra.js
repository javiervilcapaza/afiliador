$(function($){
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

var baseURL;

function cambiaFecha(){

}

function cargaProyecto(){
	$("#comboProyecto").html("<option value=''>Seleccione Proyecto</option>");
	$.get(baseURL + "ventas/proyecto/combo/"+$("#idCliente").val(), function(respuesta) {
		var string="";
		
		jQuery.each(respuesta, function(i, val) {
			if(i!=null){
				string = string+"<option value='"+val.id+"'>"+val.value+"</value>";
			}
			});
		
		
		$("#comboProyecto").html(string);
		
	});
}

$(function() {
	$( ".monedaPeru" ).autoNumeric('init', {aSep: false, aDec: '.'});
	
	baseURL = $("#baseURL").val();

	$("#fechaEmision").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		maxDate : $("#fechaEntrega").val(),
		onClose: function( selectedDate ) {
		        $( "#fechaEntrega" ).datepicker( "option", "minDate", selectedDate );
		      },
	});
	$("#fechaEntrega").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		yearRange : '-100:+1',
		minDate   : $( "#fechaEmision" ).val(),
		onClose: function( selectedDate ) {
	        $( "#fechaEmision" ).datepicker( "option", "maxDate", selectedDate );
	      }
	});
	
	var baseURL;

	baseURL = $("#baseURL").val();
	$("#descripcionProveedor").autocomplete({
		source : baseURL + "compras/autcompleteProveedor",
		minLength : 2,
		select : function(event, ui) {
			idUbigeo = ui.item.id;
			$("#idProveedor").val(idUbigeo);
		}
	});
	/* Adjuntar Archivo */
	
	
});

function subeArchivo(){
	
	var baseURL = $("#baseURL").val();
	
	new AjaxUpload($("#subirArchivoAdjunto"),{
		action :baseURL + "compras/orden/subeArchivos/"+$("#idDocumento").val()+"/"+$("#idTipoArchivo").val(),
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
				jQuery.jGrowl("No se ha subido el archivo correctamente", { life: 3000});
			}else{
			

				$.get(baseURL+ "compras/orden/formulario?idDocumento=" + $("#idDocumento").val(),
				function(respuesta) {
					$("#contenidoPrincipal").html(respuesta);
					jQuery.jGrowl("Se ha subido el archivo correctamente", { life: 3000});
				});
			
			}
		}

	});
	
}

function guarda(){
	
	var baseURL = $("#baseURL").val();
	
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ´]+$/i.test(value);
	}, "Este campo es alfanumerico.");

	$("#frmGuardaOrdenPedido").validate({

		rules : {
			idProveedor: "required",
			descripcionProveedor : "required",
			titulo : {
				required:true,
				alfanumerico:true,
			},
			fechaEmision : "required",
			fechaEntrega : "required",
			// descripcion: "required",
			estado : "required",


		},

		messages : {
			idProveedor: "Ingrese campo es requerido",
			descripcionProveedor : "Ingrese campo es requerido",
			titulo : {
				required:"Ingrese campo es requerido",
				alfanumerico:"Este campo es alfanumerico",
			},
			fechaEmision : "Seleccione fecha de emision",
			fechaEntrega : "Seleccione fecha de entrega",
			descripcionCliente : "Busque cliente",
			descripcionProyecto : "Busque proyecto",
			// descripcion: "INGRESE DESCRIPCION",
			estado : "Seleccione estado",
			idTipoDocumento : "Seleccione tipo documento",
			idProyecto : "Seleccione Proyecto",
		},

		submitHandler : function(form) {
				
			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {
				
					if(contenido!=0){
					$("#contenidoPrincipal").html('');
					$.get(baseURL + "compras/orden/formulario?idDocumento="+contenido, function(respuesta) {
						$("#contenidoPrincipal").html(respuesta);
						jQuery.jGrowl("Se ha subido el archivo correctamente", {life : 5000});
						$("#title-page").html("Orden de Compra - Edicion");

					}).fail(function() {
						$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
					});
					}else{
						alert("...");
					}

				}
			});
		}
	});

}

function abrirDialogoBuscarCliente() {

	$.get(baseURL + "ventas/buscarCliente", function(respuesta) {

		$("#buscarCliente").html(respuesta);
		crearDialogoBuscarCliente();

	});

}

function crearDialogoBuscarCliente() {
	$("#buscarCliente").dialog({
		width : 800,
		height : 280,
		resizable : false
	});
}

function buscarCliente() {

	// $.get(baseURL + "ventas/buscarCliente",function(paginaBusqueda){

	window.open("ventas/buscarCliente.jsp", "detalle",
			"resizable=1,width=1000,height=280");
	// $("#headerJugar_busqueda").html(resultado);

	// });

}

function limpiar() {
	$("#numPedido").val("");
	$("#titulo").val("");
	$("#fechaEmision").val("");
	$("#fechaEntrega").val("");
	$("#rucCliente").val("");
	$("#razonsocialCliente").val("");
	$("#descripcionProyecto").val("");
	$("#descripcion").val("");
	var miValue = "";
	$("#comboEstado option[value=" + miValue + "]").attr("selected", true);
	$("#tipoArchivo option[value=" + miValue + "]").attr("selected", true);

}


function cancelarOC(){
	var baseURL = $("#baseURL").val();
	$.get(baseURL + "compras/orden/lista", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Compra - Listado");
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}


// Agregar Detalle

function formularioDetalleOC(){
	
	var baseURL = $("#baseURL").val();
	
	var idCliente=$("#idCliente").val();

    $.get(baseURL + "compras/orden/formularioDetalle?idDocumento="+$("#idDocumento").val(),function(respuesta){
		$(".modal-header #myModalLabel").html("Agregar detalle Orden de Compra");
		$(".modal-body").html(respuesta);
		$(".modal-footer").hide();
		$("#myModal").modal('show');  
	
	});
}

// Editar Detalle

function editarDetalleOC(id){
	
	var baseURL = $("#baseURL").val();
	

    $.get(baseURL + "compras/orden/formularioDetalle?idDocumento="+$("#idDocumento").val()+"&idDetalle="+id,function(respuesta){
		$(".modal-header #myModalLabel").html("Editar detalle Orden de Compra");
		$(".modal-body").html(respuesta);
		$(".modal-footer").hide();
		$("#myModal").modal('show');  
	
	});
}

function eliminarArchivoVersion(idArchivoVersion){
	baseURL = $("#baseURL").val();
	if (confirm("Esta seguro que desea eliminar este archivo ?")) {
		$.get(baseURL+ "/compras/orden/eliminarArchivoVersion?idArchivoVersion="+idArchivoVersion,function(respuesta) {
			if(respuesta==1){
				$.get(baseURL+ "compras/orden/formulario?idDocumento=" + $("#idDocumento").val(),
						function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
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


function eliminarDetalleOC(idDetalle, idOC) {

	var confirmacion = confirm("Esta seguro que desea eliminar el Detalle?");

	if (confirmacion == true) {

		var baseURL, info;

		baseURL = $("#baseURL").val();

		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "compras/orden/eliminarDetalleOC?idDetalleOC="+ idDetalle+"&idOC="+idOC, function(respuesta) {

			if (respuesta != null) {
				info = "Eliminado Correctamente";
			} else {
				info = "El Contacto no fue eliminado";
			}

			$.get(baseURL + "compras/orden/formulario?info=" + info
					+ "&idDocumento=" + idOC, function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				jQuery.jGrowl(info, { life: 8000});
			});

		});

	}
}

