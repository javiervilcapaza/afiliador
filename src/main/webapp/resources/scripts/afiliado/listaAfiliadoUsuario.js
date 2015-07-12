var tablita;

$.fn.dataTableExt.oApi.fnReloadAjax = function(oSettings, sNewSource) {
	this.fnClearTable(this);
	this.oApi._fnProcessingDisplay(oSettings, true);
	var that = this;

	$.getJSON(oSettings.sAjaxSource, null, function(json) {
		oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
		that.fnDraw(that);
		that.oApi._fnProcessingDisplay(oSettings, false);
	});
};

$(function() {

	var baseURL = $("#baseURL").val();

	tablita = $('#tabla')
			.dataTable(
					{
						"bProcessing" : true,
						"bServerSide" : true,
						"sAjaxSource" : baseURL + "afiliado/listaJson",
						"fnServerData" : function(sSource, aoData, fnCallback) {
							aoData.push({
								"name" : "dni",
								"value" : $("#dni").val()
							});
							aoData.push({
								"name" : "nombresApellidos",
								"value" : $("#nombresApellidos").val()
							});
							request = $
									.ajax({
										"dataType" : "json",
										"contentType" : "application/json; charset=UTF-8",
										"type" : "GET",
										"url" : sSource,
										"data" : aoData,
										"success" : fnCallback,
										"enctype" : "multipart/form-data"
									});
						},
						"bFilter" : false,
						"boColumns" : [ {
							sClass : "center"
						}, {}, {
							sClass : "center"
						}, {
							sClass : "center"
						} ],
						"bLengthChange": false

						
					});
});

function recarga() {
	tablita.fnReloadAjax();
}

function editarAfiliado(id) {
	contentLoader("Editar Afiliado", "afiliado/formularioAfiliado?idAfiliado="
			+ id);
}

function eliminarAfiliado(id) {
	
	var mensaje = "Esta Seguro de Eliminar Afiliado?";
	if(confirm(mensaje)){
		var estadoEliminado = 'E';
		cambiaEstado(id, estadoEliminado);
	}
	
}

function cambiaEstado(id, estado) {
	var baseURL = $("#baseURL").val();
	var url;
	
	cargandoContenedor();
	
	url = baseURL + "afiliado/cambiaEstado?" +
			"id=" + id +
			"&estado=" + estado;
	
	$.get(url, function(respuesta) {
		contentLoader("Modulo Afiliado", "afiliado/lista");
	});
}

function asociarAfiliado(id){
	$("#idAfiliado").val(id);
	$("#username").val("");
	$("#password").val("");
	$("#password2").val("");
	$("#correo").val("");
	$("#myModal").modal('show');
	
}

function guardarUsuarioAsociacion(){
	var baseURL = $("#baseURL").val();
	var url;
	
	var idAfiliado = $("#idAfiliado").val();
	var username = $("#username").val();
	var password = $("#password").val();
	var password2 = $("#password2").val();
	var correo = $("#correo").val();
	
	if(!validacion(username, password, password2)){
		return;
	}
	

	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(correo)) {
		alert("Ingrese un correo valido");
		$("#correo").focus();
		return;
	}
	
	url = baseURL + "afiliado/asociarUsuario?" +
			"idAfiliado=" + idAfiliado +
			"&correo=" + correo +
			"&username=" + username +
			"&password=" + password;
	
	$.get(url, function(respuesta) {
		if(respuesta.idUsuario!=-1){
			$("#myModal").modal('hide');
			$(".modal-backdrop").hide();
			contentLoader("Modulo Afiliado", "afiliado/lista");
		}
	}).fail(function() {
		alert("Nombre de Usuario ya existe");
	});
	
}
function validacion(username, password, password2){
	if (username == "") {
		alert("Error: Username cannot be blank!");
		$("#username").focus();
		return false;
	}
	re = /^\w+$/;
	if (!re.test(username)) {
		alert("Error: Username must contain only letters, numbers and underscores!");
		$("#username").focus();
		return false;
	}

	if (password != "" && password == password2) {
		if (password.length < 6) {
			alert("Error: La contraseña debe contener al menos 6 letras!");
			$("#password").focus();
			return false;
		}
		if (password == username) {
			alert("Error: La contraseña debe ser diferente al nombre de usuario!");
			$("#password").focus();
			return false;
		}
		re = /[0-9]/;
		if (!re.test(password)) {
			alert("Error: La contraseña debe contener al menos un numero (0-9)!");
			$("#password").focus();
			return false;
		}
		re = /[a-z]/;
		if (!re.test(password)) {
			alert("Error: La contraseña debe contener al menos una letra minuscula (a-z)!");
			$("#password").focus();
			return false;
		}
		re = /[A-Z]/;
		if (!re.test(password)) {
			alert("Error: La contraseña debe contener al menos una letra mayuscula (A-Z)!");
			$("#password").focus();
			return false;
		}
	} else {
		alert("Error: Por favor, compruebe que ha introducido y confirmado su contraseña!");
		$("#password").focus();
		return false;
	}
	return true;
}
