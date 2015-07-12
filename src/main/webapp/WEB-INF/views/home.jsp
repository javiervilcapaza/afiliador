<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//ES" "http://www.w3.org/TR/html4/strict.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
	
	<link href="<c:url value="/resources/styles/tema/jquery-ui-1.10.1.css" />" rel="stylesheet">
	<link href="<c:url value="/resources/styles/general.css" />" rel="stylesheet">
	
	<script type="text/javascript" src="<c:url value="/resources/scripts/jquery-1.9.1.js" />"></script>
	<script type="text/javascript" src="<c:url value="/resources/scripts/jquery-ui-1.10.1.js" />"></script>
	<script type="text/javascript" src="<c:url value="/resources/scripts/general.js" />"></script>
	
</head>
<body>
	<form action="<c:url value="/guardarUsuario" />" method="post">
		Nombre <input type="text" name="nombre"/> <button id="btnGuardar" type="submit">Guardar</button>
	</form>
</body>
</html>
