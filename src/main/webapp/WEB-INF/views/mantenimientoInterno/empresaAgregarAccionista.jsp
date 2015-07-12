<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/mantenimientoInterno/empresaAgregarAccionista.js"/>"></script>

<form class="stdform"
	action="<c:url value="/mantenimientoInterno/guardaAccionista"/>"
	method="POST" id="frmGuarda">

	<c:if test="${not empty Accionista}">
		<input type="hidden" id="id" name="id" value="${Accionista.id}" />
	</c:if>
	
	<p>
		<label id="lblRazonSocial">Empresa :</label><span class="field"> <input
			class="input-small" name="empresa.id"
			id="idEmpresa" value="${empresa.id}" type="hidden">
			${empresa.nombreEmpresa}
		</span>
	</p>
	
	<p>
		<label id="lblRazonSocial">DNI :</label><span class="field"> <input
			maxlength="8" class="input-small" name="dni"
			id="razonSocial" value="${Accionista.dni}">
		</span>
	</p>
	
		<p>
		<label id="lblNombreComercial">Nombre Completo :</label><span class="field"> <input
			maxlength="250" class="input-xxlarge" name="nombreCompleto"
			id="nombreCompleto" value="${Accionista.nombreCompleto}">
		</span>
	</p>
		<p>
		<label id="lblNombreComercial">Cargo :</label><span class="field"> <input
			maxlength="250" class="input-xxlarge" name="cargo"
			id="cargo" value="${Accionista.cargo}">
		</span>
	</p>
			<p>
		<label id="lblNombreComercial">% Acciones :</label><span class="field"> <input
			maxlength="250" class="input-small" name="porcentaje" type="number" max="100" min="0"
			id="porcentaje" value="${Accionista.porcentaje}">
		</span>
	</p>
			<p>
		<label id="lblNombreComercial">Observaciones :</label><span class="field"> 
		<textarea name="observaciones" id="observaciones">${Accionista.observaciones }</textarea>
		</span>
	</p>

	<p class="stdformbutton">
		<button type="submit" class="btn btn-primary btn-rounded" onclick="guarda()">
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelar(${empresa.id})"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



