<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script src="<c:url value="/resources/scripts/mantenimientoInterno/manoObraFormulario.js"/>"></script>

<form class="stdform" action="<c:url value="/mantenimientoInterno/guardaManoObra"/>"
	method="POST" id="frmGuardaManoObra">

	<c:if test="${not empty manoObra}">
		<input type="hidden" id="id" name="id" value="${manoObra.id}" />
	</c:if>

<p>
		<label>Código </label><span class="field"> <input
			class="input-samll" name="codigo" id="codigo"
			value="${manoObra.codigo}">
		</span>
	</p>
	<p>
		<label>Descripción </label><span class="field"> <input
			class="input-samll" name="descripcion" id="descripcion"
			value="${manoObra.descripcion}">
		</span>
	</p>
	
	
	
	
	<p>
		<label>Tipo Mano Obra </label><span class="field"> 
		<select name="tipoManoObra.id">
		<option value="">Seleccione Tipo Mano Obra</option>
		<c:forEach var="tipoManoObra" items="${tiposManosObras}">
		<option value="${tipoManoObra.id}"<c:if test="${tipoManoObra.id==manoObra.tipoManoObra.id}"> selected="selected"</c:if>>${tipoManoObra.descripcion}</option>	
		</c:forEach>
		</select>
		</span>
	</p>
	
	<p>
		<label>Costo</label><span class="field"> <input
			class="input-samll" name="costo" id="costo"
			value="${manoObra.costo}">
		</span>
	</p>


		<p class="stdformbutton">
			<button type="submit" class="btn btn-primary btn-rounded"
				>
				<span class="icon-white  icon-check"></span> Guardar
			</button>
			<a href="#" id="" onclick="cancelarManoObra()"
				class="btn btn-primary btn-rounded""><span
				class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
		</p>

</form>



