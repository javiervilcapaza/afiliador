function abrir(ruta) {
	window
			.open(
					ruta,
					"abrir",
					"scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,top=60,left=100");
}

function onlyNumbersDano(evt) {
	var keyPressed = (evt.which) ? evt.which : event.keyCode;
	return !(keyPressed > 31 && (keyPressed < 48 || keyPressed > 57 || keyPressed == 47));
}

function check_digit(e, obj, intsize, deczize) {

	var keycode;

	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	else
		return true;
	var fieldval = (obj.value);
	var dots = fieldval.split(".").length;

	if (keycode == 46) {
		if (dots > 1) {

			return false;
		} else {

			return true;
		}
	}
	if (keycode == 8 || keycode == 9 || keycode == 46 || keycode == 13) // back
																		// space,
																		// tab,
																		// delete,
																		// enter
	{
		return true;
	}
	if ((keycode >= 32 && keycode <= 45) || keycode == 47
			|| (keycode >= 58 && keycode <= 127)) {
		return false;
	}

	// alert(jQuery(fieldval:contains('.').length));

	if (fieldval == "0" && keycode == 48)
		return false;
	// alert(fieldval.indexOf(".") + ' - '+ fieldval.length);
	if (fieldval.indexOf(".") != -1) {
		if (keycode == 46)
			return false;
		var splitfield = fieldval.split(".");

		// alert('Spilt -> '+ splitfield[1].length);
		if (splitfield[1].length >= deczize && keycode != 8 && keycode != 0)
			return false;
	} else if (fieldval.length >= intsize && keycode != 46) {
		return false;
	} else
		return true;
}

function currency(value, decimals, separators) {
	decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
	separators = separators || [ ',', "'", '.' ];
	var number = (parseFloat(value) || 0).toFixed(decimals);
	if (number.length <= (4 + decimals))
		return number.replace('.', separators[separators.length - 1]);
	var parts = number.split(/[-.]/);
	value = parts[parts.length > 1 ? parts.length - 2 : 0];
	var result = value.substr(value.length - 3, 3)
			+ (parts.length > 1 ? separators[separators.length - 1]
					+ parts[parts.length - 1] : '');
	var start = value.length - 6;
	var idx = 0;
	while (start > -3) {
		result = (start > 0 ? value.substr(start, 3) : value.substr(0,
				3 + start))
				+ separators[idx] + result;
		idx = (++idx) % 2;
		start -= 3;
	}
	return (parts.length == 3 ? '-' : '') + result;
}

$(function() {

	var baseURL;
	baseURL = $("#baseURL").val();

	$("#menuPrincipal").accordion({
		navigation : true,
		heightStyle : "content"
	});

	$("#menuUsuarios").click(
			function() {
				$("#contenidoPrincipal").html("Cargando . . .");
				$.get(baseURL + "seguridad/usuario/lista", function(respuesta) {
					$("#contenidoPrincipal").html(respuesta);
					$("#title-page").html("Mantenimiento de Usuario - Lista");

				}).fail(
						function() {
							$("#contenidoPrincipal").html(
									"No se ha podido visualizar esta pagina");
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

//  FUNCIONES GENERALES

$(function(){
	
	$("input").not( $(":button") ).keypress(function (evt) {
		if (evt.keyCode == 13) {
			iname = $(this).val();
			if (iname !== 'Submit'){	
				var fields = $(this).parents('form:eq(0),body').find('button,input,textarea,select');
				var index = fields.index( this );
				if ( index > -1 && ( index + 1 ) < fields.length ) {
					fields.eq( index + 1 ).focus();
				}
				return false;
			}
		}
	});

	$("#menuPrincipal").accordion({
		navigation : true,
		heightStyle: "content"
	});

	$(".menuLink").click(function() {
		var title = $(this)[0].getAttribute("title");
		var url = $(this)[0].getAttribute("href");
		url = url.substring(1, url.length);
		contentLoader(title, url);
	});
	
	refreshRedirect();
});



function menuActive(este){
	$(".menuLink").each(function(){
		$(this).removeClass('active');
	});
	$(".nav li").each(function(){
		$(this).removeClass('active');
	});
	este.setAttribute('class', 'menuLink active');
	
	$(".nav .active").parents('.nav > li').addClass("active");
	
}


function contentLoader(title, url) {

	document.location.hash = url;

	var baseURL = $("#baseURL").val();

	cargandoContenedor();
	
	$.get(baseURL + url, function(respuesta) {
		$("#contenidoPrincipal").html(respuesta);
		$("#title-page").html(title);
		loadActions();
		titleBody(url);
	}).fail(
			function() {
				$("#contenidoPrincipal").html(
						"No se ha podido visualizar esta pagina");
			});
}

function cargandoContenedor(){
	$("#contenidoPrincipal").html("");
	$("#contenidoPrincipal").html("<div class='cargando'></div>");
}

function loadActions() {
	var buttonRefresh = '<button type="button" class="btn" onclick="reloadBody()"><i class="iconfa-refresh"></i> Actualizar	</button>';
	var acciones = $('#contenidoPrincipal .acciones').html();
	$('.pagetitle .acciones').html("");
	if (acciones != null) {
		$('.pagetitle .acciones').html(buttonRefresh + acciones);
	} else {
		$('.pagetitle .acciones').html(buttonRefresh);
	}

}

function reloadBody() {
	url = document.location.hash;
	url = url.substring(1, url.length);
	title = $("#title-page").html();
	contentLoader(title, url);
}

function refreshRedirect() {
	var str = location.href;
	var arr = str.split("#");
	var title = "";

	if (arr.length == 2) {
		if (arr[1] != "") {
			title = titleBody(arr[1]);
			if (title == "") {
				title = capitaliseFirstLetter(title);
			}
			contentLoader(title, arr[1]);
		}
		;
	}
	;

}

function titleBody(url) {
	url = url.split("/");
	var title = "";
	$(".nav a.menuLink").each(function(index) {
		ref = $(this)[0].getAttribute("href");
		ref = ref.substring(1, ref.length);
		ref = ref.split("/");
		if (url[0] == ref[0]) {
			menuActive($(this)[0]);
			return false;
		}
	});
	return title;
}

function notInitUrlVars(url) {
	for (var i = 0; i < url.length; i++) {
		if (palabra.charAt(i) == "?") {
			return true;
			break;
		}
		;
	}
	return false;
};

function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

//$(function() {
//	timeout = setTimeout('contentLoader("Principal", "#afiliado/principal");', 500);
//});


