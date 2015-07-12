<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/TableTools.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/ZeroClipboard.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/empresaLista.js"/>"></script>

<c:choose>
	<c:when test="${info!=null}">

		<div class="alert alert-info">
			<button type="button" class="close" data-mismiss="alert">x</button>
			${info}
		</div>
	</c:when>
</c:choose>

<div class="stdform formBusqueda" >
	<p>
		<label>Nombre Comercial :</label><span class="field"> <input
			class="input-samll" name="nombreComercial" id="nombreComercial" required="required">
		</span>
	</p>
	<p>
		<label>Razon Social :</label><span class="field"> <input
			class="input-samll" name="razonSocial" id="razonSocial" required="required">
		</span>
	</p>
	<p>
		<label>Estado :</label><span class="field"> <input
			class="input-samll" name="estado" id="estado" required="required">
		</span>
	</p>
	
	<p class="stdformbutton">
		<button class="btn btn-primary btn-rounded" onclick="buscarEmpresa()"><span class="icon-search icon-white"></span>  Buscar</button>
		<a class="btn btn-primary btn-rounded" onclick="limpiarEmpresa()"><span class="icon-repeat icon-white"></span>  Limpiar</a>
	</p>
</div>

<div id="lista">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				<th style="width: 30%">Nombre Comercial</th>
				<th style="width: 30%">Razon Social</th>
				<th style="width: 30%">RUC</th>
				<th style="width: 20px">Editar</th>
				<th style="width: 20px">Eliminar</th>

			</tr>
		</thead>
		<tbody>
			<c:forEach var="empresa" items="${empresas}">
				<tr align="center">
					<td class="center">${empresa.nombreEmpresa}</td>
					<td class="center">${empresa.razonSocial}</td>
					<td class="center">${empresa.ruc}</td>
					
					<td width="50px" class="center">


						<button class="sinEstilo" onclick="editarEmpresa(${empresa.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarEmpresa(${empresa.id})">
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
	<button class="btn btn-primary btn-rounded" onclick="nuevaEmpresa()"><span class="icon-plus icon-white"></span> Nuevo</button>
</p>

