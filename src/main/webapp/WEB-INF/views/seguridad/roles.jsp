<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
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
<form class="stdform formBusqueda" action="<c:url value="/seguridad/rol/buscar"/>" method="POST" id="frmBusquedaRol">
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">Buscar</h3>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-xs-5">
                    <div class="input-group">
                        <span class="input-group-addon">Nombre :</span>
                        <input class="form-control input-sm" name="nombreRol" id="nombreRol">
                    </div>
                </div>
                <div class="col-xs-2">
                    <div class="btn-group">
                        <button class="btn btn-default btn-sm" onclick="buscarRol()">
                            <span class="icon-search icon-white"></span>
                            Buscar
                        </button>
                        <a class="btn btn-default btn-sm" onclick="limpiarFormularioBusqueda()">
                            <span class="icon-repeat icon-white"></span>
                            Limpiar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<!--  FIN FORMULARIO -->
<!--  LISTA USUARIOS -->
<div class="box box-info">
    <div class="box-header">
        <h3 class="box-title">Lista</h3>
    </div>
    <div id="listaRoles" class="box-body table-responsive">
        <table class="table table-bordered" id="tabla">
            <thead>
                <tr align="center">
                    <th width="40%">Nombre</th>
                    <th width="40%">Nivel</th>
                    <th width="150px">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="i" items="${roles}">
                    <tr align="center">
                        <td>${i.nombreRol}</td>
                        <td class="center"><c:if test="${i.dependencia==0||i.dependencia==-1}">1</c:if> <c:if test="${i.dependencia!=0&&i.dependencia!=-1}">2</c:if></td>
                        <td width="50px" class="center">
                            <div class="btn-group">
                                <button class="btn btn-default btn-sm" onclick="editarRol(${i.idRol})">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="eliminarRol(${i.idRol})">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
        <script src="<c:url value="/resources/scripts/table.js"/>"></script>
    </div>
    <div class="box-footer">
        <button class="btn btn-primary btn-rounded" onclick="crearRol()">
            <span class="icon-plus icon-white"></span>
            Nuevo
        </button>
    </div>
</div>
<!--  FIN LISTA -->
<!--widgetcontent-->
<script src="<c:url value="/resources/scripts/seguridad/rol.js"/>"></script>