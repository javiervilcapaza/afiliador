<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html class="bg-black">
<head>
<meta charset="UTF-8">
<title>Sistema Afiliador</title>
<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<!-- Theme style -->
<link href="<c:url value="/resources/admin-theme/css/AdminLTE.css" />" rel='stylesheet' type="text/css" />
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
</head>
<body class="bg-black">
    <div class="form-box" id="login-box" style="margin-top: 10px">
        <div class="header">Sistema Afiliador</div>
        <form>
            <input type="hidden" value="${idLink}" id="idLink">
            <div class="body bg-gray">
                <div class="form-group">
                    <label> D.N.I. :</label>
                    <input type="text" id="dni" maxlength="8" class="form-control" placeholder="DNI" />
                </div>
                <div class="form-group">
                    <label> Nombres :</label>
                    <input type="text" id="nombres" class="form-control" placeholder="Nombres" maxlength="100" />
                </div>
                <div class="form-group">
                    <label> Apellidos :</label>
                    <input type="text" id="apellidos" class="form-control" placeholder="Apellidos" maxlength="100" />
                </div>
                <div class="form-group">
                    <label> Correo :</label>
                    <input type="email" id="correo" class="form-control" placeholder="Correo" maxlength="200" />
                </div>
                <div class="form-group">
                    <label> Teléfono :</label>
                    <input type="text" id="telefono"  maxlength="20"  class="form-control" placeholder="Teléfono" maxlength="200" />
                </div>
                <div class="form-group">
                    <label> Dirección :</label>
                    <input type="text" id="direccion" maxlength="200" class="form-control" placeholder="Dirección" maxlength="200" />
                </div>
                <div class="form-group">
                    <label> Nombre de Usuario :</label>
                    <input type="text" id="username" class="form-control" placeholder="Nombre de Usuario" maxlength="50" />
                </div>
                <div class="form-group">
                    <label> Contraseña :</label>
                    <input type="password" id="password" class="form-control" placeholder="Contraseña" maxlength="20" />
                </div>
                <div class="form-group">
                    <label> Repetir Contraseña :</label>
                    <input type="password" id="password2" class="form-control" placeholder="Repetir Contraseña" />
                </div>
                <div class="form-group">
                    <input type="checkbox" id="terminos" />
                    <label>
                        Acepto los
                        <a href="#">Terminos y Condiciones</a>
                    </label>
                </div>
            </div>
            <div class="footer">
                <button type="button" class="btn bg-olive btn-block" onclick="guardarAfiliado()">Registrar</button>
                <a href="/login" class="text-center">Si ya eres miembro puedes iniciar sesion desde aquí</a>
            </div>
        </form>
    </div>
    <script src="<c:url value="/resources/admin-theme/js/jquery.min.js" />"></script>
    <script src="<c:url value="/resources/admin-theme/js/bootstrap.min.js" />" type="text/javascript"></script>
    <script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
    <script src="<c:url value="/resources/scripts/afiliado/afiliarse.js"/>"></script>
</body>
</html>