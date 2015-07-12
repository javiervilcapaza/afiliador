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
<div class="row">
    <div class="col-xs-9">
        <div class="box">
            <form class="stdform stdform2" action="<c:url value="configuracion/guardaConfiguracion"/>" method="POST" id="frmGuarda">
                <div class=box-body>
                    <div class="form-group">
                        <label> Nombre Empresa :</label>
                        <input class="form-control input-sm" maxlength="8" type="text" name="nombreEmpresa" value="${configuracion.nombreEmpresa}" maxlength="8">
                    </div>
                    <div class="form-group">
                        <label> Bono Nivel 1:</label>
                        <input name="comision1" id="comision1" class="form-control input-sm" value="${configuracion.comision1}" type="text">
                    </div>
                    <div class="form-group">
                        <label>Bono Nivel 2:</label>
                        <input name="comision2" id="comision2" class="form-control input-sm" value="${configuracion.comision2}" type="text">
                    </div>
                    <div class="form-group">
                        <label>Dirección :</label>
                        <input name="direccion" id="direccion" class="form-control input-sm" value="${configuracion.direccion}" type="text">
                    </div>
                    <div class="form-group">
                        <label>Teléfono:</label>
                        <input name="telefono" id="telefono" class="form-control input-sm" value="${configuracion.telefono}" type="text">
                    </div>
                    <div class="form-group">
                        <label>Correo:</label>
                        <input name="correo" id="correo" class="form-control input-sm" value="${configuracion.correo}" type="text">
                    </div>
                </div>
                <div class="box-footer">
                    <button onclick="guarda()" type="button" class="btn btn-primary btn-sm">Guardar</button>
                </div>
            </form>
        </div>
    </div>
    <div class="col-xs-3">
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Restablecer Puntos</h3>
            </div>
            <div class=box-body>
                <button class="btn btn-danger" onclick="restablecePuntos()">Restablecer Puntos</button>
            </div>
        </div>
    </div>
</div>
<script src="<c:url value="/resources/scripts/configuracion/formularioConfiguracion.js"/>"></script>