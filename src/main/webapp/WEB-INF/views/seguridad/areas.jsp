<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
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

<form class="stdform formBusqueda"
	action="<c:url value="/seguridad/area/buscar"/>" method="POST"
	id="frmBusquedaArea">
	<p>
		<label>Descripcion </label><span class="field"> <input
			class="input-samll" name="descripcion" id="descripcion" required="required">
		</span>
	</p>
	<p class="stdformbutton">
		<button class="btn btn-primary btn-rounded" onclick="buscarArea()"><span class="icon-search icon-white"></span>  Buscar</button>
		<a class="btn btn-primary btn-rounded" onclick="limpiarFormularioBusqueda()"><span class="icon-repeat icon-white"></span>  Limpiar</a>
	</p>
</form>


<!--  FIN FORMULARIO -->

<!--  LISTA USUARIOS -->


<div id="listaAreas">
	<table class="table table-bordered" id="tablaAreas">
		<thead>
			<tr align="center">
				
				<th>Nombre</th>
				<th>Editar</th>
				<th>Eliminar</th>

			</tr>
		</thead>
		<tbody>
			<c:forEach var="i" items="${areas}">
				<tr align="center">
					
					<td>${i.descripcion}</td>
					<td width="50px" class="center">
					
						<button class="sinEstilo" onclick="editarArea(${i.idArea})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarArea(${i.idArea})">
							<img src="resources/images/eliminar.gif" width="16" height="17"
								border="0">
						</button>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</div>
<p>
	<button class="btn btn-primary btn-rounded" onclick="crearArea()"><span class="icon-plus icon-white"></span>   Nuevo</button>
</p>


<!--  FIN LISTA -->


<!--widgetcontent-->

<script src="<c:url value="/resources/scripts/seguridad/area.js"/>"></script>