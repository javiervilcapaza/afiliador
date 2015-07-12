<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<c:choose>
	<c:when test="${not empty perfiles}">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				

				<th style="width: 32%">Nombre</th>
				<th style="width: 32%">Descripcion</th>
				<th style="width: 30px">Fecha Registro</th>
				<th style="width: 30px">Estado</th>
				<th style="width: 20px">Editar</th>
				<th style="width: 20px">Asociar</th>
				<th style="width: 20px">Eliminar</th>

			</tr>
		</thead>
		<tbody>
			<c:forEach var="i" items="${perfiles}">
				<tr align="center">
					
					<td>${i.nombrePerfil}</td>
					<td>${i.descripcion}</td>
					<td class="center"><fmt:formatDate value="${i.fechaRegistro}" pattern="dd/MM/yyyy" /></td>
					<td class="center">${i.estado}</td>
					<td width="50px" class="center">

						<button class="sinEstilo" onclick="editarPerfil(${i.idPerfil})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">

						<button class="sinEstilo" onclick="asociarPerfil(${i.idPerfil})">
							<img src="resources/images/contacto.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarPerfil(${i.idPerfil})">
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

<script src="<c:url value="/resources/scripts/seguridad/perfil.js"/>"></script>