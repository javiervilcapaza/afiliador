<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<c:choose>
	<c:when test="${not empty empresas}">
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


						<button class="sinEstilo" onclick="editarEstado(${empresa.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarEstado(${empresa.id})">
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