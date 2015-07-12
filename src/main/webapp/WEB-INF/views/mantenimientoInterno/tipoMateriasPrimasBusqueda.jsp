<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<c:choose>
	<c:when test="${not empty listaTipoMateriasPrimas}">
<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				<th style="width: 20px" class="center">Código</th>
				<th>Descripción</th>
				<th>Editar</th>
				<th>Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="tipoMateriaPrima" items="${listaTipoMateriasPrimas}">
				<tr align="center">
					<td class="center">${tipoMateriaPrima.codigo}</td>
					<td>${tipoMateriaPrima.descripcion}</td>
					<td width="50px" class="center">


						<button class="sinEstilo" onclick="editarTipoMateriaPrima(${tipoMateriaPrima.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="50px" class="center">
						<button class="sinEstilo" onclick="eliminarTipoMateriaPrima(${tipoMateriaPrima.id})">
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