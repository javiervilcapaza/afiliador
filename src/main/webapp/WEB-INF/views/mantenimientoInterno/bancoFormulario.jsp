<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script
	src="<c:url value="/resources/scripts/mantenimientoInterno/bancoFormulario.js"/>"></script>

<form class="stdform"
	action="<c:url value="/mantenimientoInterno/guardaBanco"/>"
	method="POST" id="frmGuarda">

	<c:if test="${not empty banco}">
		<input type="hidden" id="id" name="id" value="${banco.id}" />
	</c:if>
	<p>
		<label>Código :</label><span class="field"> <input
			maxlength="50" class="input-small" name="codigo" id="codigo"
			value="${banco.codigo}">
		</span>
	</p>
	<p>
		<label>Nombre :</label><span class="field"> <input
			maxlength="250" class="input-xlarge" name="nombre"
			id="nombre" value="${banco.nombre}">
		</span>
	</p>

	<p>
		<label>Descripcion :</label><span class="field">
		<textarea id="descripcion" name="descripcion" maxlength="250" >${banco.descripcion}</textarea>
		</span>
	</p>


	<p class="stdformbutton">
		<button type="submit" class="btn btn-primary btn-rounded">
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelar()"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



