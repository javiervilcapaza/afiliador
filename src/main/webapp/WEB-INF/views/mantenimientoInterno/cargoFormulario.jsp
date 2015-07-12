<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/cargoFormulario.js"/>"></script>

<form class="stdform" action="<c:url value="/mantenimientoInterno/guardaCargo"/>"
	method="POST" id="frmGuardaCargo">

	<c:if test="${not empty cargo}">
		<input type="hidden" id="id" name="id" value="${cargo.idCargo}" />
	</c:if>

	<p>
		<label>Nombre :</label><span class="field"> <input
			class="input-large" name="nombre" id="nombre"
			value="${cargo.nombre}">
		</span>
	</p>
	<p>
		<label>Descripción :</label><span class="field"> <input
			class="input-large" name="descripcion" id="descripcion"
			value="${cargo.descripcion}">
		</span>
	</p>
		<p>
		<label>Empresa Origen :</label><span class="field"> 
		<select name="empresa.id" id="idEmpresa" onchange="cargaAreaCargo()"  class="input-large">
		<option value="">Seleccione</option>
		<c:forEach var="empresa" items="${empresas}">
		<option value="${empresa.id}" <c:if test="${empresa.id==cargo.empresa.id}"> selected="selected"</c:if>>${empresa.nombreEmpresa}</option>
		</c:forEach>
		</select>
		</span>
	</p>
	
	<p>
		<label>Área :</label><span class="field"> 
		<select name="area.id" id="areas" class="input-large">
		<c:if test="${not empty cargo}"><option value="${cargo.area.id}">${cargo.area.nombre}</option></c:if>
		<option value="">(Seleccione)</option>
		</select>
		</span>
	</p>
	
	
	<p>
		<label>Cargo Inmediato Superior : </label><span class="field"> 
		<select name="cargoSuperior" id="cargos"  class="input-large">
		<c:if test="${not empty cargo}"><option value="${cargo.cargoSuperior}">${cargoSuperior}</option></c:if>
		<option value="">(Seleccione)</option>
		</select>
		</span>
	</p>
	

		<p class="stdformbutton">
		<button type="submit" class="btn btn-primary btn-rounded">
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelarCargo()"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



