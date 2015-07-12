<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/TableTools.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/ZeroClipboard.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/unidadMedida.js"/>"></script>

<c:choose>
	<c:when test="${info!=null}">

		<div class="alert alert-info">
			<button type="button" class="close" data-mismiss="alert">x</button>
			${info}
		</div>
	</c:when>
</c:choose>

<form class="stdform formBusqueda"
	action="<c:url value="/mantenimientoInterno/buscarUnidadMedida"/>" method="POST" id="frmBusquedaUnidadMedida">
	<p>
		<label>Descripción :</label><span class="field"> <input
			class="input-samll" name="descripcionUnidadMedida" id="descripcionUnidadMedida" required="required">
		</span>
	</p>
	<p class="stdformbutton">
		<button class="btn btn-primary btn-rounded" onclick="buscarUnidadMedida()"><span class="icon-search icon-white"></span>  Buscar</button>
		<a class="btn btn-primary btn-rounded" onclick="limpiarUnidadMedida()"><span class="icon-repeat icon-white"></span>  Limpiar</a>
	</p>
</form>

<div id="listaUnidadMedida">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				<th style="width: 20px" class="center">Código</th>
				<th>Descripción</th>
				<th>Editar</th>
				<th>Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="unidadMedida" items="${listaUnidadesMedidas}">
				<tr align="center">
					<td class="center">${unidadMedida.codigo}</td>
					<td>${unidadMedida.descripcion}</td>
					<td width="50px" class="center">


						<button class="sinEstilo" onclick="editarUnidadMedida(${unidadMedida.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarUnidadMedida(${unidadMedida.id})">
							<img src="resources/images/eliminar.gif" width="16" height="17"
								border="0">
						</button>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	<script src="<c:url value="/resources/scripts/table.js"/>"></script>
</div>
<p>
	<button class="btn btn-primary btn-rounded" onclick="nuevoUnidadMedida()"><span class="icon-plus icon-white"></span> Nuevo</button>
</p>

