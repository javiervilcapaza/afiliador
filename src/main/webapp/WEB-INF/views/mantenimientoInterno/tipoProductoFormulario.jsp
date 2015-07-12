<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/tipoProductoFormulario.js"/>"></script>

<form class="stdform" action="<c:url value="/mantenimientoInterno/guardaTipoProducto"/>"
	method="POST" id="frmGuardaTipoProducto">

	<c:if test="${not empty tipoProducto}">
		<input type="hidden" id="id" name="id" value="${tipoProducto.id}" />
	</c:if>
	<p>
		<label>Código : </label><span class="field"> <input
			class="input-small" name="codigo" id="codigo" maxlength="5"
			value="${tipoProducto.codigo}">
		</span>
	</p>
	<p>
		<label>Descripción : </label><span class="field"> <input
			class="input-xlarge" name="descripcion" id="descripcion"
			value="${tipoProducto.descripcion}">
		</span>
	</p>
	
	
		<p class="stdformbutton">
			<button type="submit" class="btn btn-primary btn-rounded"
				>
				<span class="icon-white  icon-check"></span> Guardar
			</button>
			<a href="#" id="" onclick="cancelarTipoProducto()"
				class="btn btn-primary btn-rounded""><span
				class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
		</p>

</form>



