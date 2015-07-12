<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder"%>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/ajaxupload.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/jquery.jgrowl.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/autoNumeric.js"/>"></script>
<form class="stdform stdform2" action="<c:url value="afiliado/guardaAfiliado"/>" method="POST" id="frmGuarda">
    <div class="row">
        <div class="col-xs-6">
            <div class="box">
                <div class=box-body>
                    <c:if test="${not empty afiliado }">
                        <input type="hidden" id="idAfiliado" name="id" value="${afiliado.id}">
                        <input type="hidden" id="idPersona" name="persona.id" value="${afiliado.persona.id}">
                    </c:if>
                    <div class="form-group">
                        <label> D.N.I. :</label>
                        <input class="form-control input-sm" maxlength="8" type="text" name="persona.dni" value="${afiliado.persona.dni}" maxlength="8">
                    </div>
                    <div class="form-group">
                        <label>Nombres:</label>
                        <input type="text" name="persona.nombres" class="form-control input-sm" value="${afiliado.persona.nombres}" maxlength="100">
                    </div>
                    <div class="form-group">
                        <label>Apellidos:</label>
                        <input type="text" name="persona.apellidos" class="form-control input-sm" value="${afiliado.persona.apellidos}" maxlength="100">
                    </div>
                    <div class="form-group">
                        <label>Sexo :</label>
                        <input <c:if test="${afiliado.persona.sexo == 'M' }"> checked="checked"</c:if> type="radio" name="persona.sexo" value="M">Masculino &nbsp; &nbsp; <input
                            <c:if test="${afiliado.persona.sexo == 'F' }"> checked="checked"</c:if> type="radio" name="persona.sexo" value="F">Femenino
                    </div>
                    <div class="form-group">
                        <label>Fecha Nacimiento:</label>
                        <input name="fechaNacimiento" id="fechaNacimiento" class="form-control input-sm"
                            value="<fmt:formatDate pattern="dd/MM/yyyy" value="${afiliado.persona.fechaNacimiento}"/>" type="text">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="box">
                <div class=box-body>
                    <sec:authorize access="hasRole('ROLE_ADMIN')">
                        <div class="form-group">
                            <label>Afiliado a:</label>
                            <input type="hidden" name="afiliadoPadre" id="afiliadoPadre"> <input type="text" name="afiliadoPadreDescripcion" id="afiliadoPadreDescripcion"
                                class="form-control input-sm" value="" maxlength="50">
                        </div>
                    </sec:authorize>
                    <div class="form-group">
                        <label>Direccion:</label>
                        <input type="text" name="persona.direccion" class="form-control input-sm" value="${afiliado.persona.direccion}" maxlength="200">
                    </div>
                    <div class="form-group">
                        <label>Telefono:</label>
                        <input type="text" name="persona.telefono" class="form-control input-sm" value="${afiliado.persona.telefono}" maxlength="20">
                    </div>
                    <div class="form-group">
                        <label>Estado Civil:</label>
                        <select name="persona.estadoCivil" class="form-control">
                            <option>Seleccion una Opción</option>
                            <option <c:if test="${afiliado.persona.estadoCivil == 'S' }"> selected="selected"</c:if> value="S">Soltero</option>
                            <option <c:if test="${afiliado.persona.estadoCivil == 'C' }"> selected="selected"</c:if> value="C">Casado</option>
                            <option <c:if test="${afiliado.persona.estadoCivil == 'V' }"> selected="selected"</c:if> value="V">Viudo</option>
                        </select>
                    </div>
                    <c:if test="${esAdmin}">
                        <div class="form-group">
                            <label>Estado:</label>
                            <select name="estado" class="form-control">
                                <option>Seleccion una Opción</option>
                                <option <c:if test="${afiliado.estado == 'S' }"> selected="selected"</c:if> value="S">Activo</option>
                                <option <c:if test="${afiliado.estado == 'N' }"> selected="selected"</c:if> value="N">Inactivo</option>
                            </select>
                        </div>
                    </c:if>
                    <c:if test="${!esAdmin}">
                    <input type="hidden" name="estado" value="S">
                    </c:if>
                </div>
                <div class="box-footer">
                    <button onclick="guarda()" type="button" class="btn btn-primary btn-sm">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="<c:url value="/resources/scripts/afiliado/formularioAfiliado.js"/>"></script>