/**
 * 
 */

function guardarAfiliado(){
	var url = "guardaAfiliado";
	
	var dni =  $("#dni").val();
	var nombres =  $("#nombres").val();
	var apellidos =  $("#apellidos").val();
	var correo =  $("#correo").val();
	var telefono =  $("#telefono").val();
	var direccion =  $("#direccion").val();
	var username =  $("#username").val();
	var password =  $("#password").val();
	var password2 =  $("#password2").val();
	var idLink = $("#idLink").val();
	
	if(dni.length < 8){
		alert("Ingrese DNI valido");
		return;
	}
	
	if(nombres.length < 3){
		alert("Por Favor Ingrese Nombre valido");
		return;
	}
	
	if(apellidos.length < 3){
		alert("Por Favor Ingrese Apellido valido");
		return;
	}
	
	if(idLink == ''){
		alert("El registro al sistema es mediante una persona referida");
		return;
	}
	
	if(!validacion(username, password, password2)){
		return;
	}
	
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(correo)) {
		alert("Ingrese un correo valido");
		$("#correo").focus();
		return;
	}
	
	$.post( url, {dni : dni,
				nombres: nombres,
				apellidos: apellidos,
				idLink : idLink,
				correo:correo,
				username:username,
				password:password,
				telefono:telefono,
				direccion:direccion
				},function(respuesta){
		if(respuesta == '1'){
			alert("Se ha registrado correctamente");
			redirige();
		}else{
			alert("No se ha registrado correctamente... ");
		}
	});
}

function redirige(){
	var url = "../";    
	$(location).attr('href',url);
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
	} else {
		alert("Error: Por favor, compruebe que ha introducido y confirmado su contraseña!");
		$("#password").focus();
		return false;
	}
	return true;
}
