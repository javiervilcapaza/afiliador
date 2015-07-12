<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<!--  FORMULARIO -->
<form class="stdform" action="<c:url value="/seguridad/perfil/guarda"/>" method="POST" id="frmGuardaPerfil">
    <c:if test="${not empty perfil}">
        <input type="hidden" id="idPerfil" name="idPerfil" value="${perfil.idPerfil}" />
    </c:if>
    <div class="row">
        <div class="col-md-6">
            <div class="box">
                <div class="box-body">
                    <div class="form-group">
                        <label for="username">Nombre :</label>
                        <input class="form-control input-sm" name="nombrePerfil" id="nombrePerfil" value="${perfil.nombrePerfil}">
                    </div>
                    <div class="form-group">
                        <label for="clave">Descripción :</label>
                        <input class="form-control input-sm" name="descripcion" id="descripcion" value="${perfil.descripcion}">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box">
                <div class="box-body">
                    <div class="form-group">
                        <label for="username">Perfil :</label>
                        <select class="form-control input-sm" name="estado" id="estado">
                            <option value="">Seleccione estado</option>
                            <option value="S" <c:if test="${perfil.estado =='Activo' }">selected="selected" </c:if>>Activo</option>
                            <option value="N" <c:if test="${perfil.estado =='Inactivo' }">selected="selected" </c:if>>Inactivo</option>
                        </select>
                    </div>
                </div>
                <div class="box-footer">
                    <button type="submit" class="btn btn-primary btn-sm" onclick="guardaPerfil()">
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
<script src="<c:url value="/resources/scripts/seguridad/perfilFormulario.js"/>"></script>