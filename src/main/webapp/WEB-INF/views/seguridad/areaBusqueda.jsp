<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
	<table class="table table-bordered" id="tablaAreas">
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