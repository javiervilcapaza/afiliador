<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/TableTools.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/ZeroClipboard.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/manoObra.js"/>"></script>

<c:choose>
	<c:when test="${info!=null}">

		<div class="alert alert-info">
			<button type="button" class="close" data-mismiss="alert">x</button>
			${info}
		</div>
	</c:when>
</c:choose>

<form class="stdform formBusqueda"
	action="<c:url value="/mantenimientoInterno/buscarManoObra"/>" method="POST" id="frmBusquedaManoObra">
	<p>
		<label>Descripción </label><span class="field"> <input
			class="input-samll" name="descripcionManoObra" id="descripcionManoObra" required="required">
		</span>
	</p>
	<p class="stdformbutton">
		<button class="btn btn-primary btn-rounded" onclick="buscarManoObra()"><span class="icon-search icon-white"></span>  Buscar</button>
		<a class="btn btn-primary btn-rounded" onclick="limpiarManoObra()"><span class="icon-repeat icon-white"></span>  Limpiar</a>
	</p>
</form>

<div id="listaManoObra">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				<th>Código</th>
				<th>Descripción</th>
				<th>Tipo Mano Obra</th>
				<th>Costo</th>
				<th>Editar</th>
				<th>Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="manoObra" items="${listaManosObras}">
				<tr align="center">
					<td>${manoObra.codigo}</td>
					<td>${manoObra.descripcion}</td>
					<td>${manoObra.tipoManoObra.descripcion}</td>
					<td class="right">S/. ${manoObra.costo}</td>
					
					
					<td width="50px" class="center">


						<button class="sinEstilo" onclick="editarManoObra(${manoObra.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarManoObra(${manoObra.id})">
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
	<button class="btn btn-primary btn-rounded" onclick="nuevoManoObra()"><span class="icon-plus icon-white"></span> Nuevo</button>
</p>

