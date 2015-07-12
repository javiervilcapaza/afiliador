<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>



<!DOCTYPE html>
<html class="bg-black">
    <head>
        <meta charset="UTF-8">
        <title>MULTIGAS39 - Sistema Afiliador</title>
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

        <div class="form-box" id="login-box">
            <div class="header">Sistema Afiliador</div>
            
            
            <form id="loginform" action="j_spring_security_check" method="post" target="_parent">
            	<c:if test="${not empty message}"><div class="body bg-red">${message}</div></c:if>
                <div class="body bg-gray">
                    <div class="form-group">
                        <input type="text" name="j_username" class="form-control" placeholder="Nombre de Usuario"/>
                    </div>
                    <div class="form-group">
                        <input type="password" name="j_password" class="form-control" placeholder="Contraseña"/>
                    </div>          
                    <div class="form-group">
                        <input type="checkbox" name="remember_me"/> Guardar Sesion?
                    </div>
                </div>
                <div class="footer">                                                               
                    <button type="submit" class="btn bg-olive btn-block">Ingresar</button>  
                    
                    <p><a href="#">Recuperar Contraseña</a></p>
                    
                    <a href="register.html" class="text-center">Registrar Nuevo Usuario</a>
                </div>
            </form>

            <div class="margin text-center">
                <span>Sign in using social networks</span>
                <br/>
                <button class="btn bg-light-blue btn-circle"><i class="fa fa-facebook"></i></button>
                <button class="btn bg-aqua btn-circle"><i class="fa fa-twitter"></i></button>
                <button class="btn bg-red btn-circle"><i class="fa fa-google-plus"></i></button>

            </div>
        </div>

        <script src="<c:url value="/resources/admin-theme/js/jquery.min.js" />"></script>
        <script src="<c:url value="/resources/admin-theme/js/bootstrap.min.js" />" type="text/javascript"></script>

    </body>
</html>