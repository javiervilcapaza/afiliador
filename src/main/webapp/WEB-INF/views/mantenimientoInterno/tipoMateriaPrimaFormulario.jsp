<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/tipoMateriaPrimaFormulario.js"/>"></script>

<form class="stdform" action="<c:url value="/mantenimientoInterno/guardaTipoMateriaPrima"/>"
	method="POST" id="frmGuardaTipoMateriaPrima">

	<c:if test="${not empty tipoMateriaPrima}">
		<input type="hidden" id="id" name="id" value="${tipoMateriaPrima.id}" />
	</c:if>

<p>
		<label>Código :</label><span class="field"> <input
			class="input-small" name="codigo" id="codigo" maxlength="5"
			value="${tipoMateriaPrima.codigo}">
		</span>
	</p>
	<p>
		<label>Descripción :</label><span class="field"> <input maxlength="50"
			class="input-xlarge" name="descripcion" id="descripcion"
			value="${tipoMateriaPrima.descripcion}">
		</span>
	</p>
		<p class="stdformbutton">
			<button type="submit" class="btn btn-primary btn-rounded"
				>
				<span class="icon-white  icon-check"></span> Guardar
			</button>
			<a href="#" id="" onclick="cancelarTipoMateriaPrima()"
				class="btn btn-primary btn-rounded""><span
				class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
		</p>

</form>



