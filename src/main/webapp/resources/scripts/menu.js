
$(function(){

		
	var baseURL;
	baseURL = $("#baseURL").val();
	

	$("#menuPrincipal").accordion({
		navigation : true,
		heightStyle: "content"
	});


	
	$("#menuUsuarios").click(function() {
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "seguridad/usuario/lista", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento de Usuario - Lista");

		}).fail(function() {
			$("#contenidoPrincipal").html("No se ha podido visualizar esta pagina");
		});
	});
	
	$("#menuPerfiles").click(function() {
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "seguridad/perfil/lista", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento de Perfil - Lista");

		});
	});
	
	$("#menuRoles").click(function() {
		$("#contenidoPrincipal").html("Cargando . . .");
		$.get(baseURL + "seguridad/rol/lista", function(respuesta) {
			$("#contenidoPrincipal").html(respuesta);
			$("#title-page").html("Mantenimiento de Rol - Lista");

		});
	});
});