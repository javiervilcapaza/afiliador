<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
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
        <form class="stdform formBusqueda" action="<c:url value="/seguridad/usuario/buscar"/>" method="POST" id="frmBusquedaUsuario">
            <div class="row">
                <div class="col-xs-5">
                    <div class="input-group">
                        <span class="input-group-addon">Nombre de Usuario</span>
                        <input class="form-control input-sm" name="username" id="usernameBusqueda">
                    </div>
                </div>
                <div class="col-xs-5">
                    <div class="input-group">
                        <span class="input-group-addon">Estado</span>
                        <input class="form-control input-sm" name="username" id="usernameBusqueda">
                    </div>
                </div>
                <div class="col-xs-2">
                    <div class="btn-group">
                        <button class="btn btn-default btn-sm" onclick="buscarUsuario()">
                            <span class="icon-search icon-white"></span>
                            Buscar
                        </button>
                        <button class="btn btn-default btn-sm" onclick="limpiarFormularioBusqueda()">
                            <span class="icon-repeat icon-white"></span>
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<div class="box box-info">
    <div class="box-header">
        <h3 class="box-title">Lista</h3>
    </div>
    <div id="listaUsuarios" class="box-body table-responsive">
        <table class="table table-bordered table-hover" id="tabla">
            <thead>
                <tr align="center">
                    <th>Nombre de Usuario</th>
                    <th>Fecha de Registro</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="i" items="${usuarios}">
                    <tr align="center">
                        <td>${i.username}</td>
                        <td class="center"><fmt:formatDate value="${i.fechaRegistro}" pattern="dd/MM/yyyy" /></td>
                        <td class="center"><c:choose>
                                <c:when test="${i.estado!=1}">
                                    <button class="btn btn-danger btn-sm" onclick="cambiarEstado(${i.id},1)">Inactivo</button>
                                </c:when>
                                <c:otherwise>
                                    <button class="btn btn-default btn-sm" onclick="cambiarEstado(${i.id},0)">Activo</button>
                                </c:otherwise>
                            </c:choose></td>
                        <td width="150px" class="center">
                            <div class="btn-group">
                                <button type="button" onclick="editarUsuario(${i.id})" class="btn btn-default  btn-sm">Editar</button>
                                <button type="button" onclick="eliminarUsuario(${i.id})" class="btn btn-danger  btn-sm">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
        <script src="<c:url value="/resources/scripts/table.js"/>"></script>
    </div>
    <div class="box-footer">
        <button class="btn btn-primary btn-rounded" onclick="crearUsuario()">
            <span class="icon-plus icon-white"></span>
            Nuevo
        </button>
    </div>
</div>
<!--  FIN LISTA -->
<!--widgetcontent-->
<script src="<c:url value="/resources/scripts/seguridad/usuarios.js"/>"></script>