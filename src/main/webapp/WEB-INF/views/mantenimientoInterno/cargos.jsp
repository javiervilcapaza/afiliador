<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/TableTools.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/ZeroClipboard.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/cargo.js"/>"></script>

<c:choose>
	<c:when test="${info!=null}">

		<div class="alert alert-info">
			<button type="button" class="close" data-mismiss="alert">x</button>
			${info}
		</div>
	</c:when>
</c:choose>

<form class="stdform formBusqueda"
	action="<c:url value="/mantenimientoInterno/buscarCargo"/>" method="POST" id="frmBusquedaCargo">
	<p>
		<label>Nombre :</label><span class="field"> <input
			class="input-samll" name="descripcionCargo" id="descripcionCargo">
		</span>
	</p>
	<p>
		<label>Empresa Origen :</label><span class="field"> 
		<select name="idEmpresa">
		<option value="">Seleccione</option>
		<c:forEach var="empresa" items="${empresas}">
		<option value="${empresa.id}">${empresa.nombreEmpresa}</option>	
		</c:forEach>
		</select>
		</span>
	</p>
		<p>
		<label>Área :</label><span class="field"> 
		<select name="area">
		<option value="">Seleccione</option>
		<c:forEach var="area" items="${areas}">
		<option value="${area.id}">${area.nombre}</option>	
		</c:forEach>
		</select>
		</span>
	</p>
	<p class="stdformbutton">
		<button class="btn btn-primary btn-rounded" onclick="buscarCargo()"><span class="icon-search icon-white"></span>  Buscar</button>
		<a class="btn btn-primary btn-rounded" onclick="limpiarCargo()"><span class="icon-repeat icon-white"></span>  Limpiar</a>
	</p>
</form>

<div id="listaCargo">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				<th style="width: 30%">Empresa Origen</th>
				<th style="width: 30%">Nombre</th>
				<th style="width: 30%">Área</th>
				<th style="width: 30px">Editar</th>
				<th style="width: 30px">Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="cargo" items="${listaCargos}">
				<tr align="center">
					<td>${cargo.empresa.nombreEmpresa}</td>
					<td>${cargo.nombre}</td>
					<td>${cargo.area.descripcion}</td>
					
					<td width="50px" class="center">


						<button class="sinEstilo" onclick="editarCargo(${cargo.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarCargo(${cargo.id})">
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
	<button class="btn btn-primary btn-rounded" onclick="nuevoCargo()"><span class="icon-plus icon-white"></span> Nuevo</button>
</p>

