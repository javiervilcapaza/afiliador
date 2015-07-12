<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/areaFormulario.js"/>"></script>

<form class="stdform" action="<c:url value="/mantenimientoInterno/guardaArea"/>"
	method="POST" id="frmGuardaArea">

	<c:if test="${not empty area}">
		<input type="hidden" id="id" name="id" value="${area.idArea}" />
	</c:if>
	
		<p>
		<label>Nombre :</label><span class="field"> <input
			class="input-samll" name="nombre" id="nombre"
			value="${area.nombre}">
		</span>
	</p>
	
		<p>
		<label>Empresa Origen :</label><span class="field"> 
		<select name="empresa.id">
		<option value="">Seleccione</option>
		<c:forEach var="empresa" items="${empresas}">
		<option value="${empresa.id}" <c:if test="${empresa.id==area.empresa.id}"> selected="selected"</c:if>>${empresa.nombreEmpresa}</option>
			
		</c:forEach>
		</select>
		</span>
	</p>
	

	<p>
		<label>Descripción :</label><span class="field"> <input
			class="input-xlarge" name="descripcion" id="descripcion"
			value="${area.descripcion}">
		</span>
	</p>
	
	
	<p class="stdformbutton">
		<button type="submit" class="btn btn-primary btn-rounded">
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelarArea()"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



