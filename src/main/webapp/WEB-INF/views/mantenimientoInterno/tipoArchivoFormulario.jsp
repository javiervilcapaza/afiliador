<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/mantenimientoInterno/tipoArchivoFormulario.js"/>"></script>

<form class="stdform"
	action="<c:url value="/mantenimientoInterno/guardaTipoArchivo"/>"
	method="POST" id="frmGuardaTipoArchivo">

	<c:if test="${not empty tipoArchivo}">
		<input type="hidden" id="id" name="id" value="${tipoArchivo.id}" />
	</c:if>

	<p>
		<label>Código : </label><span class="field"> <input
			class="input-samll" name="codigo" id="codigo" maxlength="5"
			value="${tipoArchivo.codigo}">
		</span>
	</p>

	<p>
		<label>Descripción :</label><span class="field"> <input
			class="input-samll" name="descripcion" id="descripcion"
			value="${tipoArchivo.descripcion}">
		</span>
	</p>

	<p class="stdformbutton">
		<button type="submit" class="btn btn-primary btn-rounded">
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelarTipoArchivo()"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



