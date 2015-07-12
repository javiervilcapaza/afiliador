<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<!--  FORMULARIO -->
<form class="stdform" action="<c:url value="/seguridad/rol/guarda"/>" method="POST" id="frmGuardaRol">
    <c:if test="${not empty rol}">
        <input type="hidden" id="idRol" name="idRol" value="${rol.idRol}" />
    </c:if>
    <div class="box">
        <div class="box-body">
            <div class="form-group">
                <span>Nombre :</span>
                <input class="form-control input-sm" name="nombreRol" id="nombreRol" value="${rol.nombreRol}">
            </div>
            <div class="form-group">
                <span>Dependencia :</span>
                <select name="dependenciaRol" class="form-control input-sm">
                    <option value="0">Seleccione una dependencia</option>
                    <c:forEach var="role" items="${roles}">
                        <c:if test="${role.dependencia==0 or role.dependencia==-1}">
                            <option value="${role.idRol}" <c:if test="${role.idRol==rol.dependencia}"> selected="selected"</c:if>>${role.nombreRol}</option>
                        </c:if>
                    </c:forEach>
                </select>
            </div>
        </div>
        <div class="box-footer">
            <button type="submit" class="btn btn-primary btn-rounded" onclick="guardaRol()">
                <span class="icon-white  icon-check"></span>
                Guardar
            </button>
            <a href="#" id="" onclick="cancelar()" class="btn btn-primary btn-rounded"">
                <span class=" icon-ban-circle icon-white"></span>
                <spring:message code="label.formulario.cancelar" />
            </a>
        </div>
    </div>
</form>
<!--  FIN FORMULARIO -->
<script src="<c:url value="/resources/scripts/seguridad/rolFormulario.js"/>"></script>