<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/mantenimientoInterno/estadoFormulario.js"/>"></script>

<form class="stdform"
	action="<c:url value="/mantenimientoInterno/guardaEstado"/>"
	method="POST" id="frmGuardaEstado">

	<c:if test="${not empty estado}">
		<input type="hidden" id="id" name="id" value="${estado.idEstado}" />
	</c:if>
	<p>
		<label>Código :</label><span class="field"> <input
			maxlength="5" class="input-small" name="codigo" id="codigo"
			value="${estado.codigo}">
		</span>
	</p>
	<p>
		<label>Descripción :</label><span class="field"> <input
			maxlength="50" class="input-xlarge" name="descripcion"
			id="descripcion" value="${estado.descripcion}">
		</span>
	</p>




	<p>
		<label>Nemónico :</label><span class="field"> <input
			maxlength="50" class="input-large" name="nemonico" id="nemonico"
			value="${estado.nemonico}">
		</span>
	</p>


	<p class="stdformbutton">
		<button type="submit" class="btn btn-primary btn-rounded">
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelarEstado()"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



