<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script
	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>


<!--  FORMULARIO -->

<form class="stdform" action="<c:url value="/seguridad/area/guarda"/>"
	method="POST" id="frmGuardaArea">

	<c:if test="${not empty area}">
		<input type="hidden" id="idArea" name="idArea" value="${area.idArea}" />
	</c:if>

	<p>
		<label>Nombre </label><span class="field"> <input
			class="input-samll" name="descripcion" id="descripcion"
			value="${area.descripcion}">
		</span>
	</p>
	
	


	<p class="stdformbutton">
		<input type="submit" value="Guardar" class="btn btn-primary"
			onclick="guardaArea()" />
			<a href="#" id="" onclick="cancelar()" class="btn btn-primary"> Cancelar</a>
	</p>

</form>


<!--  FIN FORMULARIO -->


<script src="<c:url value="/resources/scripts/seguridad/areaFormulario.js"/>"></script>