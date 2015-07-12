
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/mantenimientoInterno/tipoDocumentoFormulario.js"/>"></script>

<form class="stdform"
	action="<c:url value="/mantenimientoInterno/guardaTipoDocumento"/>"
	method="POST" id="frmGuardaTipoDocumento">

	<c:if test="${not empty tipoDocumento}">
		<input type="hidden" id="idTipoDocumento" name="idTipoDocumento"
			value="${tipoDocumento.idTipoDocumento}" />
	</c:if>

	<p>
		<label>Código : </label><span class="field"> <input
			class="input-small" name="codigo" id="codigo" maxlength="5" size="6"
			value="${tipoDocumento.codigo}">
		</span>
	</p>
	<p>
		<label>Descripción :</label><span class="field"> <input
			class="input-xlarge" name="descripcion" id="descripcion"
			maxlength="50" value="${tipoDocumento.descripcion}">
		</span>
	</p>

	<p class="stdformbutton">
		<button type="submit" class="btn btn-primary btn-rounded">
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelarTipoDocumento()"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



