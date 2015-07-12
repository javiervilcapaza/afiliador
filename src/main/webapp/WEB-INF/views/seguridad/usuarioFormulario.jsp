<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<!--  FORMULARIO -->
<form class="stdform" action="<c:url value="/seguridad/usuario/guarda"/>" method="POST" id="frmGuardaUsuario">
    <c:if test="${not empty usuario}">
        <input type="hidden" id="idUsuario" name="idUsuario" value="${usuario.idUsuario}" />
    </c:if>
    <div class="row">
        <div class="col-md-6">
            <div class="box">
                <div class="box-body">
                    <div class="form-group">
                        <label for="username">Nombre de usuario :</label>
                        <input class="form-control input-sm" placeholder="Ingresa Nombre de Usuario" name="username" id="username" value="${usuario.username}">
                    </div>
                    <div class="form-group">
                        <label for="clave">Contraseña :</label>
                        <input type="password" class="form-control input-sm" placeholder="Ingrese Contraseña" name="clave" id="clave" value="${usuario.password}">
                    </div>
                    <div class="form-group">
                        <label for="estado">Estado :</label>
                        <select class="form-control input-sm" name="estado" id="estado">
                            <option value="">Seleccione estado</option>
                            <option value="1" <c:if test="${usuario.estado==1}">selected="selected"</c:if>>Activo</option>
                            <option value="0" <c:if test="${usuario.estado==0}">selected="selected"</c:if>>Inactivo</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box">
                <div class="box-body">
                    <div class="form-group">
                        <label for="username">Perfil :</label>
                        <select class="form-control input-sm " name="perfil">
                            <option value="" selected="SELECTED">Seleccione Perfil</option>
                            <c:forEach var="i" items="${perfiles}">
                                <c:if test="${i.estado!='Inactivo'}">
                                    <option value="${i.idPerfil}" <c:if test="${i.nombrePerfil==perfil}">selected="selected"</c:if>>${i.nombrePerfil}</option>
                                </c:if>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <div class="box-footer">
                    <button type="submit" class="btn btn-primary btn-sm" onclick="guardaUsuario()">
                        <span class="icon-white  icon-check"></span>
                        Guardar
                    </button>
                    <a href="#" id="" onclick="cancelar()" class="btn btn-primary btn-sm">
                        <span class=" icon-ban-circle icon-white"></span>
                        <spring:message code="label.formulario.cancelar" />
                    </a>
                </div>
            </div>
        </div>
    </div>
   
</form>
<!--  FIN FORMULARIO -->
<script src="<c:url value="/resources/scripts/seguridad/usuarioFormulario.js"/>"></script>