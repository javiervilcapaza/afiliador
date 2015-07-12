<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<c:choose>
	<c:when test="${not empty listaManosObras}">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				<th>Código</th>
				<th>Descripción</th>
				<th>Tipo Mano Obra</th>
				<th>Costo</th>
				<th>Editar</th>
				<th>Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="manoObra" items="${listaManosObras}">
				<tr align="center">
					<td>${manoObra.codigo}</td>
					<td>${manoObra.descripcion}</td>
					<td>${manoObra.tipoManoObra.descripcion}</td>
					<td>${manoObra.costo}</td>
					
					
					<td width="50px" class="center">


						<button class="sinEstilo" onclick="editarManoObra(${manoObra.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarManoObra(${manoObra.id})">
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