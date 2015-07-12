<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<c:choose>
	<c:when test="${not empty usuarios}">
			<script
	src="<c:url value="/resources/scripts/plantilla/jquery.dataTables.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/TableTools.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/plantilla/ZeroClipboard.js"/>"></script>
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				
				<th>Nombre de Usuario</th>
				<th>Fecha de Registro</th>
				<th>Estado</th>
				
				<th>Editar</th>
				<th>Eliminar</th>

			</tr>
		</thead>
		<tbody>
			<c:forEach var="i" items="${usuarios}">
				<tr align="center">
					
					<td>${i.username}</td>
					<td class="center"><fmt:formatDate value="${i.fechaRegistro}" pattern="dd/MM/yyyy" /></td>
					<td class="center">
					<c:choose>
							<c:when test="${i.estado!=1}">
								<button class="sinEstilo" onclick="cambiarEstado(${i.id},1)">
									Inactivo
								</button>
							</c:when>
							<c:otherwise>
								<button class="sinEstilo" onclick="cambiarEstado(${i.id},0)">
									Activo
								</button>
							</c:otherwise>
						</c:choose>
						</td>
						
						
					<td width="50px" class="center">


						<button class="sinEstilo" onclick="editarUsuario(${i.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarUsuario(${i.id})">
							<img src="resources/images/eliminar.gif" width="16" height="17"
								border="0">
						</button>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
		<script src="<c:url value="/resources/scripts/table.js"/>"></script>
	</c:when>
	<c:otherwise>
	<spring:message code="label.busqueda.noencontrado"/>
	</c:otherwise>
</c:choose>



