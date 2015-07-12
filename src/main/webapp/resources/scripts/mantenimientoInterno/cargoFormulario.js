var baseURL;

$.validator.addMethod("alfanumerico", function(value, element) {
	return this.optional(element) || /^[-._a-z0-9\- ]+$/i.test(value);
}, "Este campo es alfanumerico.");

	$("#frmGuardaCargo").validate({

		rules : {
			nombre : "required",
			codigo : {required:true,alfanumerico:true},
			"area.id" :"required",


			
		},

		messages : {
			nombre : "Ingrese este campo.",
			codigo : {required:"Ingrese este campo.",alfanumerico:"Este campo es alfanumerico."},
			"area.id": "Ingrese este campo.",
		},

		submitHandler : function(form) {

			$.ajax(form.action, {
				async : false,
				type : "POST",
				data : $(form).serialize(),
				success : function(contenido) {	
					if(contenido=="error"){
						var mensaje="Este Cargo ya ha sido registrado";
						alert(mensaje);

					}
					else{
						baseURL = $("#baseURL").val();
						$.get(baseURL + "mantenimientoInterno/listarCargos?info="+contenido, function(respuesta) {
							$("#contenidoPrincipal").html(respuesta);
							$("#title-page").html("Mantenimiento Cargo Organizacional - Listado");
					});
					}
					
					
				}
			});
		}
	});
	
	function cancelarCargo(){
		var baseURL;
		baseURL = $("#baseURL").val();
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "mantenimientoInterno/listarCargos", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento Cargo Organizacional - Listado");

		});
	}
	
	function cargaAreaCargo(){
		cargaAreaEmpresa();
		cargaCargoInmediatoEmpresa();
	}
	
	function cargaAreaEmpresa(){
		var baseURL = $("#baseURL").val();
		$.get(baseURL + "mantenimientoInterno/comboAreaEmpresa?idEmpresa="+$("#idEmpresa").val(), function(respuesta) {
			var string="<option value=''>(Seleccione)</option>";
			
			jQuery.each(respuesta, function(i, val) {
				if(i!=null){
					string = string+"<option value='"+val.id+"'>"+val.value+"</value>";
				}
				});
			
			
			$("#areas").html(string);
			
		});
	}

	function cargaCargoInmediatoEmpresa(){
		var baseURL = $("#baseURL").val();
		$.get(baseURL + "mantenimientoInterno/comboCargoEmpresa?idEmpresa="+$("#idEmpresa").val(), function(respuesta) {
			var string="<option value=''>(Seleccione)</option>";
			
			jQuery.each(respuesta, function(i, val) {
				if(i!=null){
					string = string+"<option value='"+val.id+"'>"+val.value+"</value>";
				}
				});
			
			
			$("#cargos").html(string);
			
		});
	}

