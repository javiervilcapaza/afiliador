<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/plantilla/TableTools.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/plantilla/ZeroClipboard.js"/>"></script>

<c:choose>
	<c:when test="${info!=null}">

		<div class="alert alert-info">
			<button type="button" class="close" data-mismiss="alert">x</button>
			${info}
		</div>
	</c:when>
</c:choose>


<!--  FORMULARIO BUSQUEDA -->

<form class="stdform formBusqueda"
	action="<c:url value="/seguridad/rol/buscar"/>" method="POST"
	id="frmBusquedaRol">
	<p>
		<label>Nombre :</label> <span class="field"> <input
			class="input-samll" name="nombreRol" id="nombreRol">
		</span>
	</p>
	<p class="stdformbutton">
		<button class="btn btn-primary btn-rounded" onclick="buscarRol()">
			<span class="icon-search icon-white"></span> Buscar
		</button>
		<a class="btn btn-primary btn-rounded"
			onclick="limpiarFormularioBusqueda()"><span
			class="icon-repeat icon-white"></span> Limpiar</a>
	</p>
</form>


<!--  FIN FORMULARIO -->

<!--  LISTA USUARIOS -->


<div id="listaRoles">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				<th>Nombre</th>
				<th>Nivel</th>
				<th>Editar</th>
				<th>Eliminar</th>

			</tr>
		</thead>
		<tbody>
			<c:forEach var="i" items="${roles}">
				<tr align="center">
					<td>${i.nombreRol}</td>
					<td class="center"><c:if test="${i.dependencia==0||i.dependencia==-1}">1</c:if><c:if test="${i.dependencia!=0&&i.dependencia!=-1}">2</c:if></td>
					<td width="50px" class="center">

						<button class="sinEstilo" onclick="editarRol(${i.idRol})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarRol(${i.idRol})">
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
	<button class="btn btn-primary btn-rounded" onclick="crearRol()">
		<span class="icon-plus icon-white"></span> Nuevo
	</button>
</p>


<!--  FIN LISTA -->


<!--widgetcontent-->

<script src="<c:url value="/resources/scripts/seguridad/rol.js"/>"></script>