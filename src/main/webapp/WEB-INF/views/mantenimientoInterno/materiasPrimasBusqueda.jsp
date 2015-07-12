<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<c:choose>
	<c:when test="${not empty listaMateriasPrimas}">
	<table class="table table-bordered" id="tabla">
		<thead>
			<tr align="center">
				<th style="width: 350px" class="center">Codigo</th>
				<th style="width: 300px" class="center">Color</th>
				<th style="width: 25%">Nombre</th>
				<th style="width: 150px">Tipo Materia Prima</th>
				<th style="width: 150px">Unidad de medida</th>	
				<th style="width: 120px" class="center">Costo Unitario (S/.)</th>
			    <th style="width: 120px" class="center">Costo Unitario (USD $)</th>
				<th style="width: 30px">Editar</th>
				<th style="width: 30px">Eliminar</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="materiaPrima" items="${listaMateriasPrimas}">
				<tr align="center">
				<td class="center">${materiaPrima.codigo}</td>
				<td class="center">${materiaPrima.color}</td>
					<td>${materiaPrima.nombreMateriaPrima}</td>
					<td class="center">${materiaPrima.tipoMateriaPrima.descripcion}</td>
					<td class="center">${materiaPrima.unidadMedida.descripcion}</td>
					<td class="right"><fmt:formatNumber type="number" maxFractionDigits="2" minFractionDigits="2" value="${materiaPrima.costoUnitario}" /></td>
					<td class="right"><fmt:formatNumber type="number" maxFractionDigits="2" minFractionDigits="2" value="${materiaPrima.costoUnitarioDolares}" /></td>
					
					
					
					<td width="30px" class="center">


						<button class="sinEstilo" onclick="editarMateriaPrima(${materiaPrima.id})">
							<img src="resources/images/ver.gif" width="16" height="17"
								border="0">
						</button>

					</td>
					<td width="30px" class="center">
						<button class="sinEstilo" onclick="eliminarMateriaPrima(${materiaPrima.id})">
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