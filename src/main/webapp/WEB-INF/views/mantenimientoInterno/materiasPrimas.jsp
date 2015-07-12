<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/TableTools.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/ZeroClipboard.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/materiaPrima.js"/>"></script>

<c:choose>
	<c:when test="${info!=null}">

		<div class="alert alert-info">
			<button type="button" class="close" data-mismiss="alert">x</button>
			${info}
		</div>
	</c:when>
</c:choose>

<form class="stdform formBusqueda"	action="<c:url value="/mantenimientoInterno/buscarMateriaPrima"/>" method="POST" id="frmBusquedaMateriaPrima">
	<p>
		<label>Codigo : </label><span class="field"> <input
			class="input-samll" name="codigo" id="codigo">
		</span>
	</p>
	<p>
		<label>Color : </label><span class="field"> <input
			class="input-samll" name="color" id="color">
		</span>
	</p>
	<p>
		<label>Nombre : </label><span class="field"> <input
			class="input-samll" name="descripcionMateriaPrima" id="descripcionMateriaPrima">
		</span>
	</p>
		<p>
		<label>Tipo Materia Prima:</label><span class="field"> <select
			class="uniformselect" name="tipoMateriaPrima" id="tipoMateriaPrima">
				<option value="">Seleccione</option>
				<c:forEach var="i" items="${tipoMateriaPrima}">
					<option value="${i.id}">${i.descripcion}</option>
				</c:forEach>
		</select>
		</span>
	</p>
	<p class="stdformbutton">
		<button class="btn btn-primary btn-rounded" onclick="buscarMateriaPrima()"><span class="icon-search icon-white"></span>  Buscar</button>
		<a class="btn btn-primary btn-rounded" onclick="limpiarMateriaPrima()"><span class="icon-repeat icon-white"></span>  Limpiar</a>
	</p>
</form>

<div id="listaMateriaPrima">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr>
				<th style="width: 350px" class="center">Codigo</th>
				<th style="width: 300px" class="center">Color</th>
				<th style="width: 25%">Nombre</th>
				<th style="width: 150px">Tipo Materia Prima</th>
				<th style="width: 150px">Unidad de medida</th>	
				<th style="width: 120px" class="center">Costo Unitario (S/.)</th>
			    <th style="width: 120px" class="center">Costo Unitario (USD $)</th>
				<th style="width: 30px">Editar</th>
				<th style="width: 30px">Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<td class="center" colspan="6">Cargando...</td>
		</tbody>
	</table>
	
</div>
<p>
	<button class="btn btn-primary btn-rounded" onclick="nuevoMateriaPrima()"><span class="icon-plus icon-white"></span> Nuevo</button>
</p>

