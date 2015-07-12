<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/TableTools.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/ZeroClipboard.js"/>"></script>
<c:choose>
    <c:when test="${info!=null}">
        <div class="alert alert-info">
            <button type="button" class="close" data-mismiss="alert">x</button>
            ${info}
        </div>
    </c:when>
</c:choose>
<!--  FORMULARIO BUSQUEDA -->
<div class="box">
    <div class="box-header">
        <h3 class="box-title">Buscar</h3>
    </div>
    <div class="box-body">
        <form class="stdform formBusqueda" action="<c:url value="/seguridad/perfil/buscar"/>" method="POST" id="frmBusquedaPerfil">
            <div class="row">
                <div class="col-xs-5">
                    <div class="input-group">
                        <span class="input-group-addon">Nombre :</span>
                        <input class="form-control input-sm" name="nombrePerfil" id="nombrePerfil">
                    </div>
                </div>
                <div class="col-xs-5">
                    <div class="input-group">
                        <span class="input-group-addon">Estado :</span>
                        <select class="form-control input-sm" name="estado" id="estado">
                            <option value="">Seleccione estado</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-2">
                    <div class="btn-group">
                        <button class="btn btn-default btn-rounded btn-sm" onclick="buscarPerfil()">
                            <span class="icon-search icon-white"></span>
                            Buscar
                        </button>
                        <a class="btn btn-default btn-rounded btn-sm" onclick="limpiarFormularioBusqueda()">
                            <span class="icon-repeat icon-white"></span>
                            Limpiar
                        </a>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<!--  FIN FORMULARIO -->
<!--  LISTA USUARIOS -->
<div class="box box-info">
    <div class="box-header">
        <h3 class="box-title">Lista</h3>
    </div>
    <div id="listaPerfiles" class="box-body table-responsive">
        <table class="table table-bordered" id="tabla">
            <thead>
                <tr align="center">
                    <th style="width: 26%">Nombre</th>
                    <th style="width: 26%">Descripcion</th>
                    <th style="width: 50px">Fecha Registro</th>
                    <th style="width: 30px">Estado</th>
                    <th style="width: 100px">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="i" items="${perfiles}">
                    <tr align="center">
                        <td>${i.nombrePerfil}</td>
                        <td>${i.descripcion}</td>
                        <td class="center"><fmt:formatDate value="${i.fechaRegistro}" pattern="dd/MM/yyyy" /></td>
                        <td class="center"><c:if test="${i.estado == 'S'}">Activo</c:if> <c:if test="${i.estado == 'N'}">Inactivo</c:if></td>
                        <td width="50px" class="center">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-default" onclick="editarPerfil(${i.idPerfil})">Editar</button>
                                <button class="btn btn-sm btn-primary" onclick="asociarPerfil(${i.idPerfil})">Asociar</button>
                                <button class="btn btn-sm btn-danger" onclick="eliminarPerfil(${i.idPerfil})">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
        <script src="<c:url value="/resources/scripts/table.js"/>"></script>
    </div>
    <div class="box-footer">
        <button class="btn btn-primary btn-rounded" onclick="crearPerfil()">
            <span class="icon-plus icon-white"></span>
            Nuevo
        </button>
    </div>
</div>
<!--  FIN LISTA -->
<!--widgetcontent-->
<script src="<c:url value="/resources/scripts/seguridad/perfil.js"/>"></script>