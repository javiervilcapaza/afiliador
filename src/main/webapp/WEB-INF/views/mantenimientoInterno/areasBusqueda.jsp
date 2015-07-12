<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<c:choose>
	<c:when test="${not empty listaAreas}">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				
				<th style="width: 45%">Empresa Origen</th>
				<th style="width: 45%">Nombre</th>
				<th style="width: 40px">Editar</th>
				<th style="width: 40px">Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="area" items="${listaAreas}">
				<tr align="center">
					<td>${area.empresa.nombreEmpresa}</td>
					<td>${area.nombre}</td>
					<td width="50px" class="center">


						<button class="sinEstilo" onclick="editarArea(${area.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarArea(${area.id})">
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