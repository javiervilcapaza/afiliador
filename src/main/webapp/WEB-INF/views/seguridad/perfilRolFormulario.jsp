<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<!--  FORMULARIO -->
<
<style>
<!--
p.subLista {
	margin-left: 15px;
}
-->
</style>
<form class="stdform" action="<c:url value="/seguridad/perfil/asociarRolGuarda"/>" method="POST" id="frmGuardaPerfilRol">
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">Asociar Roles a: ${perfil.nombrePerfil}</h3>
        </div>
        <div class="box-body">
            <input type="hidden" name="idPerfil" value="${perfil.id}">
            <c:if test="${not empty perfil}"></c:if>
            <input type="hidden" name="roles" value="2">
            <c:forEach var="r" items="${roles}">
                <c:if test="${r.dependencia==0||r.dependencia==-1}">
                    <div class="checkRoles">
                        <c:if test="${r.nombreRol != 'ROLE_USER'}">
                            <p>
                                <span class="field">
                                    <input style="float: left; margin-right: 10px" type="checkbox"
                                        <c:forEach var="rp" items="${perfil.rol}">
								 <c:if test="${r.idRol==rp.idRol}"> checked="checked"</c:if> 
		  				`</c:forEach>
                                        value="${r.idRol}" name="roles" path="roles" id="${r.nombreRol}" onclick="chekar('${r.nombreRol}')">
                                </span>
                                ${r.nombreRol}
                            </p>
                        </c:if>
                        <c:forEach var="rr" items="${roles}">
                            <c:if test="${rr.dependencia==r.idRol}">
                                <p class="subLista">
                                    <span class="field subperfil">
                                        <input style="" type="checkbox"
                                            <c:forEach var="rp" items="${perfil.rol}">
								 <c:if test="${rr.idRol==rp.idRol}"> checked="checked"</c:if> 
		  						 </c:forEach>
                                            value="${rr.idRol}" name="roles" path="roles" class="${r.nombreRol}">
                                    </span>
                                    ${rr.nombreRol}
                                </p>
                            </c:if>
                        </c:forEach>
                    </div>
                </c:if>
            </c:forEach>
        </div>
        <div class="box-footer">
            <input type="submit" value="Guardar" class="btn btn-primary" onclick="guardaPerfilRol()" />
            <a href="#" onclick="cancelar()" class="btn btn-primary">Cancelar</a>
        </div>
    </div>
</form>
<!--  FIN FORMULARIO -->
<script src="<c:url value="/resources/scripts/seguridad/perfilFormulario.js"/>"></script>