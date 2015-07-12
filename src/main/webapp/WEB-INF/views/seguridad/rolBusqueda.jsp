<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<c:choose>
	<c:when test="${not empty roles}">
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
	</c:when>
	<c:otherwise>
	<spring:message code="label.busqueda.noencontrado"/>
	</c:otherwise>
</c:choose>