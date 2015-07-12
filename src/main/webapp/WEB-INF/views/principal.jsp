
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Sistema Afiliador V1.0</title>
<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<!-- Ionicons -->
<link href="//code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css" rel="stylesheet" type="text/css" />
<!-- Morris chart -->
<link href="<c:url value="/resources/admin-theme/css/morris/morris.css"/>" rel="stylesheet" type="text/css" />
<!-- jvectormap -->
<link href="<c:url value="/resources/admin-theme/css/jvectormap/jquery-jvectormap-1.2.2.css"/>" rel="stylesheet" type="text/css" />
<!-- Date Picker -->
<link href="<c:url value="/resources/admin-theme/css/datepicker/datepicker3.css"/>" rel="stylesheet" type="text/css" />
<!-- Daterange picker -->
<link href="<c:url value="/resources/admin-theme/css/daterangepicker/daterangepicker-bs3.css"/>" rel="stylesheet" type="text/css" />
<!-- Theme style -->
<link href="<c:url value="/resources/admin-theme/css/AdminLTE.css"/>" rel="stylesheet" type="text/css" />
<link href="<c:url value="/resources/jquery.orgchart.css"/>" rel="stylesheet" type="text/css" />
<!-- DATA TABLES -->
<link href="<c:url value="/resources/admin-theme/css/datatables/dataTables.bootstrap.css"/>" rel="stylesheet" type="text/css" />
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
</head>
<body class="skin-blue">
    <input type="hidden" id="baseURL" value="<c:url value='/' />" />
    <!-- header logo: style can be found in header.less -->
    <header class="header">
        <a href="" class="logo">
            <!-- Add the class icon to your logo image or logo icon to add the margining -->
            Sistema Afiliador
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <div class="navbar-right">
                <ul class="nav navbar-nav">
                    <!-- Messages: style can be found in dropdown.less-->
                    
                    <li class="dropdown user user-menu"><a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="glyphicon glyphicon-user"></i>
                            <span><%=SecurityContextHolder.getContext().getAuthentication()
					.getName()%><i class="caret"></i>
                            </span>
                        </a>
                        <ul class="dropdown-menu">
                                <!-- User image -->
                                <li class="user-header bg-light-blue">
                                    <img src="resources/images/avatar3.png" class="img-circle" alt="User Image">
                                    <p>
                                        <%=SecurityContextHolder.getContext().getAuthentication()
					.getName()%> - Afiliado
                                    </p>
                                </li>
                                <!-- Menu Body -->
                                <!-- Menu Footer-->
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <a href="#" class="btn btn-default btn-flat">Perfil Afiliado</a>
                                    </div>
                                    <div class="pull-right">
                                        <a href="logout" class="btn btn-default btn-flat">Salir</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                </ul>
            </div>
        </nav>
    </header>
    <div class="wrapper row-offcanvas row-offcanvas-left">
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="left-side sidebar-offcanvas">
            <!-- sidebar: style can be found in sidebar.less -->
            <jsp:include page="estructura/menu.jsp" />
            <!-- /.sidebar -->
        </aside>
        <!-- Right side column. Contains the navbar and content of the page -->
        <aside class="right-side">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1 id="title-page">Principal</h1>
                <ol class="breadcrumb">
                    <%@ page import="java.util.*"%>
                    <%@ page import="java.text.SimpleDateFormat"%>
                    <%
                    	Date dNow = new Date();
                    	SimpleDateFormat formateador = new SimpleDateFormat(
                    			"dd 'de' MMMM 'de' yyyy", new Locale("es_ES"));
                    	String currentDate = formateador.format(dNow);
                    %>
                    Lima,
                    <%=currentDate%>
                </ol>
            </section>
            <!-- Main content -->
            <section class="content" id="contenidoPrincipal">
            
            
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

            
            
            </section>
            <!-- /.content -->
        </aside>
        <!-- /.right-side -->
    </div>
    <!-- ./wrapper -->
    <!-- add new calendar event modal -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="//code.jquery.com/ui/1.11.1/jquery-ui.min.js" type="text/javascript"></script>
    <!-- Morris.js charts -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <!-- Sparkline -->
    <script src="<c:url value="/resources/admin-theme/js/plugins/sparkline/jquery.sparkline.min.js"/>" type="text/javascript"></script>
    <!-- jvectormap -->
    <script src="<c:url value="/resources/admin-theme/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"/>" type="text/javascript"></script>
    <script src="<c:url value="/resources/admin-theme/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"/>" type="text/javascript"></script>
    <!-- jQuery Knob Chart -->
    <script src="<c:url value="/resources/admin-theme/js/plugins/jqueryKnob/jquery.knob.js"/>" type="text/javascript"></script>
    <!-- daterangepicker -->
    <script src="<c:url value="/resources/admin-theme/js/plugins/daterangepicker/daterangepicker.js"/>" type="text/javascript"></script>
    <!-- datepicker -->
    <script src="<c:url value="/resources/admin-theme/js/plugins/datepicker/bootstrap-datepicker.js"/>" type="text/javascript"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="<c:url value="/resources/admin-theme/js/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"/>" type="text/javascript"></script>
    <!-- iCheck -->
    <script src="<c:url value="/resources/admin-theme/js/plugins/iCheck/icheck.min.js"/>" type="text/javascript"></script>
    <!-- AdminLTE App -->
    <script src="<c:url value="/resources/admin-theme/js/AdminLTE/app.js"/>" type="text/javascript"></script>
    <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
    <script src="<c:url value="/resources/admin-theme/js/AdminLTE/dashboard.js"/>" type="text/javascript"></script>
    <script src="<c:url value="/resources/admin-theme/js/plugins/datatables/jquery.dataTables.js"/>" type="text/javascript"></script>
    <script src="<c:url value="/resources/admin-theme/js/plugins/datatables/dataTables.bootstrap.js"/>" type="text/javascript"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="<c:url value="/resources/admin-theme/js/AdminLTE/demo.js"/>" type="text/javascript"></script>
    <script src="<c:url value="/resources/scripts/menu.js"/>" type="text/javascript"></script>
    <script src="<c:url value="/resources/scripts/principal.js"/>" type="text/javascript"></script>
    
    
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
</body>
</html>
