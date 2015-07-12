<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
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
        <h4 class="box-title">Buscar</h4>
    </div>
    <div class="box-body">
        <form class="stdform stdform2" method="post" action="forms.html">
            <div class="row">
                <div class="col-xs-5">
                    <div class="input-group">
                        <span class="input-group-addon">D.N.I.</span>
                        <input type="text" name="dni" id="dni" class="form-control input-sm">
                    </div>
                </div>
                <div class="col-xs-5">
                    <div class="input-group">
                        <span class="input-group-addon">Apellidos o Nombres</span>
                        <input type="text" name="nombresApellidos" id="nombresApellidos" class="form-control input-sm">
                    </div>
                </div>
                <div class="col-xs-2">
                    <div class="btn-group">
                        <a href="#" class="btn btn-sm btn-default">Limpiar</a>
                        <a href="#" class="btn btn-sm btn-default" onclick="recarga()">Buscar</a>
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
    <div id="lista" class="box-body table-responsive">
        <table class="table table-bordered" id="tabla">
            <thead>
                <tr>
                    <th style="width: 15%">DNI</th>
                    <th style="width: 30%">Apellidos y Nombres</th>
                    <th style="width: 15%">Fecha Afiliación</th>
                    <th style="width: 150px">Puntos</th>
                    <th style="width: 250px">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr align="center">
                    <td class="center" colspan="7">Cargando</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!--  FIN LISTA -->
<script src="<c:url value="/resources/scripts/afiliado/listaAfiliadoPuntos.js"/>"></script>