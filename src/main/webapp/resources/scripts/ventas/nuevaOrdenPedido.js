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
	
	baseURL = $("#baseURL").val();
	$("#descripcionCliente").autocomplete({
		source : baseURL + "ventas/cliente/autocomplete",
		minLength : 2,
		select : function(event, ui) {
			idCliente = ui.item.id;
			$("#idCliente").val(idCliente);
			cargaProyecto();
			
		}
	});
	

	// $('#loaderAjax').hide();
	// Botón para subir archivos adjuntos
	new AjaxUpload(
			$("#ordenPedidoArchivo"),
			{
				
				action : baseURL + "ventas/subeArchivos/"
						+ $("#idArchivo").val() + "/op",
				name : "archivo",
				onSubmit : function(file, ext) {
					
					if($("#idTipoArchivo").val()==""){
						alert("Seleccione tipo archivo");
						return false;
					}

					if (!(ext && /^(jpg|png|gif|doc|docx|rar|pdf|xls|xlsx|pdfx)$/.test(ext))) {
						// extensiones permitidas
						alert('Solo se permiten archivos .jpg .png .gif .doc .xdoc .rar .pdf . xls');
						// cancela upload
						return false;
					} else {
						$('#loaderAjax').show();
						jQuery.jGrowl("Cargando...", {life : 8000});
						this.disable();
					}
				},
				onComplete : function(file, response) {
					
					

					respuesta = $.parseJSON(response);

					if (respuesta.respuesta == null) {
						jQuery.jGrowl("No se ha subido el archivo correctamente", {life : 8000	});
					} else {
						
						$.get(baseURL + "ventas/archivo/cambiaTipoArchivo?id="+respuesta.archivo+"&idTipoArchivo="+ $("#idTipoArchivo").val(), function(respuesta) {						});
						
						$.get(baseURL + "ventas/nuevaOrdenPedido?idDocumento="+ $("#idDocumento").val(), function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Orden de Pedido Cliente - Edicion");
							jQuery.jGrowl("Se ha subido el archivo correctamente", {life : 5000});
						});
					}

				}

			});

	/* Adjuntar Archivo */
	
	
});

function guarda(){
	$.validator.addMethod("alfanumerico", function(value, element) {
		return this.optional(element) || /^[-._a-z0-9\- ´]+$/i.test(value);
	}, "Este campo es alfanumerico.");

	$("#frmGuardaOrdenPedido").validate({

		rules : {
			titulo : {
				required:true,
				alfanumerico:true,
			},
			fechaEmision : "required",
			fechaEntrega : "required",
			descripcionCliente : "required",
			// razonsocialCliente: "required",
			descripcionProyecto : "required",
			// descripcion: "required",
			estado : "required",
			idTipoDocumento : "required",
			idProyecto : "required"

		},

		messages : {
			titulo : {
				required:"Ingrese titulo",
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
					$.get(baseURL + "ventas/nuevaOrdenPedido?idDocumento="+contenido, function(respuesta) {
						$("#contenidoPrincipal").html(respuesta);
						$("#title-page").html("Orden de Pedido Cliente - Edicion");
						jQuery.jGrowl("Guardado Exitosamente", {life : 5000});
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


function cancelar(){
	$.get(baseURL + "ventas/listaOrdenPedido", function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html("Orden de Pedido Cliente - Lista");

	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
}

function emitir(id){
	
	
	
	if (confirm("Recuerde que debe emitir a produccion el folder fisico correspondiente. \n \n Desea emitir esta orden de pedido?")) {
	$.get(baseURL + "ventas/ordenPedido/emitido/"+id, function(respuesta) {
		
		if(respuesta=="emitido"){
		
			$.get(baseURL + "ventas/listaOrdenPedido?info=Emitido Correntamente", function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Orden de Pedido Cliente - Lista");

			});
		}
	
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
	}
}

function anular(id){
	if (confirm("Esta seguro que quiere anular esta orden de pedido?")) {
	$.get(baseURL + "ventas/ordenPedido/anulado/"+id, function(respuesta) {
		
		if(respuesta=="anulado"){
		
			$.get(baseURL + "ventas/listaOrdenPedido?info=Anulado Correntamente", function(respuesta) {
				$("#contenidoPrincipal").html(respuesta);
				$("#title-page").html("Orden de Pedido Cliente - Lista");

			});
		}
	
	}).fail(function() {
		$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
	});
	}
}
