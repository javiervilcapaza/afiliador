<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder"%>
<div class="row">
    <div class="col-xs-9">
        <div class="row">
        <div class="col-xs-6">
                <div class="small-box ${status.index%2==0? 'bg-green' : 'bg-blue'}">
                    <div class="inner">
                        <h3>S./ <span id="totalGanancias">${totalGanancias}</span></h3>
                        <h4>Total de Ganancias</h4>
                        
                    </div>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="small-box ${status.index%2==0? 'bg-green' : 'bg-blue'}">
                    <div class="inner">
                        <h3>S./ <span id="totalProyeccion">${totalProyeccion}</span></h3>
                        <h4>Proyección Ganancias</h4>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h4 class="box-title">Link Afiliado</h4>
                        <div class="box-tools pull-right">
                            <button class="btn btn-default btn-sm" onclick="copyToClipboard()">
                                <i class="fa fa-fw  fa-link"></i>
                            </button>
                            <button class="btn btn-default btn-sm">
                                <i class="fa fa-fw fa-facebook"></i>
                            </button>
                            <button class="btn btn-default btn-sm">
                                <i class="fa fa-fw fa-twitter"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <input type="hidden" id="clipBoard" value="${idLink}">
                        <span id="idLink">${idLink}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="box-header">
                <h4 class="box-title">Nivel de Afiliados</h4>
            </div>
            <div class="box-body">
                <div id="orgChartContainer">
                    <div id="orgChart" style="overflow: auto"></div>
                </div>
                <div id="consoleOutput"></div>
            </div>
        </div>
    </div>
    <div class="col-xs-3">
        <div class="box  box-solid bg-red" id="info-persona" style="display: none">
            <div class="box-header">
                <h4 class="box-title">Informacion Persona</h4>
            </div>
            <div class="box-body">
                <div class="">
                    <label for="exampleInputEmail1">DNI: </label>
                    <span id="info-dni">23234323</span>
                </div>
                <div class="">
                    <label for="exampleInputEmail1">Apellidos: </label>
                    <span id="info-apellidos">Vilcapaza Luque</span>
                </div>
                <div class="">
                    <label for="exampleInputEmail1">Nombres: </label>
                    <span id="info-nombres">Javier Alfredo</span>
                </div>
                <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SEGURIDAD_USUARIOS')">
                <div class="">
                    <label for="exampleInputEmail1">Dirección: </label>
                    <span id="info-direccion">Jr alfos .</span>
                </div>
                <div class="">
                    <label for="exampleInputEmail1">Telefono: </label>
                    <span id="info-telefono"> 23323232</span>
                </div>
                </sec:authorize>
            </div>
        </div>
        <c:forEach items="${totalNiveles}" var="i" varStatus="status">
            <div class="small-box ${status.index%2==0? 'bg-green' : 'bg-aqua'}">
                <div class="inner">
                    <h3>
                        ${i.total} <sup style="font-size: 20px"> Nivel ${i.nivel}</sup>
                    </h3>
                    <h2 style="padding: 0px; margin: 0px; line-height: 30px;">Afiliados</h2>
                </div>
                <div class="icon">
                    <i class="ion ion ion-person-add"></i>
                </div>
                <a href="#" class="small-box-footer">
                    ... <i class="fa fa-arrow-circle-right"></i>
                </a>
            </div>
        </c:forEach>
    </div>
</div>
<script src="<c:url value="/resources/jquery.orgchart.js"/>"></script>
<script type="text/javascript">
	var testData = ${afiliados};
	$(function() {
		
		var totalGanancias = $('#totalGanancias').html();
		var totalProyeccion = $('#totalProyeccion').html();
		
		var totalGananciasFormat = formatoMoneda2(parseFloat(totalGanancias));
		var totalProyeccionFormat = formatoMoneda2(parseFloat(totalProyeccion));
		
		$('#totalGanancias').html(totalGananciasFormat);
		$('#totalProyeccion').html(totalProyeccionFormat);
		
		org_chart = $('#orgChart').orgChart({
			data : testData,
			showControls : false,
			allowEdit : false,
			onAddNode : function(node) {
				log('Created new node on node ' + node.data.id);
				org_chart.newNode(node.data.id);
			},
			onDeleteNode : function(node) {
				log('Deleted node ' + node.data.id);
				org_chart.deleteNode(node.data.id);
			},
			onClickNode : function(node) {
				informacionPersona(node.data.id);
			}

		});
	});

	function informacionPersona(id) {
		var baseURL;
		var info = $("#info-persona").html();
		$("#info-persona")
				.html(
						info
								+ '<div class="overlay"></div><div class="loading-img"></div>');
		baseURL = $("#baseURL").val();
		$.get(baseURL + "afiliado/datosAfiliado?idAfiliado=" + id, function(
				respuesta) {
			$("#info-persona").html(info);
			$("#info-dni").html(respuesta.dni);
			$("#info-apellidos").html(respuesta.apellidos);
			$("#info-nombres").html(respuesta.nombres);
			$("#info-direccion").html(respuesta.direccion);
			$("#info-telefono").html(respuesta.telefono);
			$("#info-persona").show();
		});

	}
	function copyToClipboard() {
		
		var text = $('#clipBoard').val(); 
		
	    if (window.clipboardData) { 
	        window.clipboardData.setData("Text", text);
	    } else {  
	        unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
	        const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);  
	        clipboardHelper.copyString(text);
	    }
	}
	
	function formatoMoneda2(num) {
		var p = num.toFixed(2).split(".");
		return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
			return num + (i && !(i % 3) ? "," : "") + acc;
		}, "") + "." + p[1];
	}
</script>