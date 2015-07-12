<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
	<table class="table table-bordered" id="tablaAreas">
		<thead>
			<tr align="center">
				<th>Id</th>
				<th>Descripcion</th>
				<th>Editar</th>
				<th>Eliminar</th>

			</tr>
		</thead>
		<tbody>
			<c:forEach var="i" items="${areas}">
				<tr align="center">
					<td>${i.idArea}</td>
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