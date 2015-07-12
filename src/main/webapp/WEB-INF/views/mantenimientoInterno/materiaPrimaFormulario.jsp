<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script	src="<c:url value="/resources/scripts/plantilla/jquery.jgrowl.js"/>"></script>
<script	src="<c:url value="/resources/scripts/plantilla/ajaxupload.js"/>"></script>
<script	src="<c:url value="/resources/scripts/plantilla/autoNumeric.js"/>"></script>

<script src="<c:url value="/resources/scripts/mantenimientoInterno/materiaPrimaFormulario.js"/>"></script>
<form class="stdform" action="<c:url value="/mantenimientoInterno/guardaMateriaPrima"/>" method="POST" id="frmGuardaMateriaPrima">

	<c:if test="${not empty materiaPrima}">
		<input type="hidden" id="id" name="id" value="${materiaPrima.id}" />
	</c:if>
	
				<label>Codigo : </label><span class="field"> <input
			class="input-xlarge" name="codigo" id="codigo" maxlength="50"
			value="${materiaPrima.codigo}">
		</span>

	
	<p>
		<label>Color : </label><span class="field"> <input
			class="input-medium" name="color" id="color"
			value="${materiaPrima.color}">
		</span>
	</p>
	
	<p>
		<label>Nombre : </label><span class="field"> <input
			class="input-large" name="nombreMateriaPrima" id="nombreMateriaPrima"
			value="${materiaPrima.nombreMateriaPrima}">
		</span>
	</p>
	
	
	<p>
		<label>Tipo Materia Prima : </label><span class="field"> 
		<select name="tipoMateriaPrima.id">
		<option value="">Seleccione Tipo Materia Prima</option>
		<c:forEach var="tipoMateriaPrima" items="${tiposMateriasPrimas}">
		<option value="${tipoMateriaPrima.id}"<c:if test="${tipoMateriaPrima.id==materiaPrima.tipoMateriaPrima.id}"> selected="selected"</c:if>>${tipoMateriaPrima.descripcion}</option>	
		</c:forEach>
		</select>
		</span>
	</p>
	
	<p>
		<label>Unidad de Medida : </label><span class="field"> 
		<select name="unidadMedida.id">
		<option value="">Seleccione Unidad de Medida</option>
		<c:forEach var="unidadMedida" items="${unidadMedidas}">
		<option value="${unidadMedida.id}"<c:if test="${unidadMedida.id==materiaPrima.unidadMedida.id}"> selected="selected"</c:if>>${unidadMedida.descripcion}</option>	
		</c:forEach>
		</select>
		</span>
	</p>
	
	<p>
		<label>Descripcion : </label><span class="field"> <textarea
			class="input-xlarge" name="descripcion" id="descripcion" maxlength="250">${materiaPrima.descripcion}</textarea>
		</span>
	</p>
	
	<p>
		<label>Fotografia : </label><span class="field">
			<c:if test="${empty Afotografia}">
			<a href="#" class="btn" type="button" id="subirFotografia" >Subir Archivo</a>
			<input type="hidden" name="fotografia" id="fotografia" value="1">
			</c:if>
			<c:if test="${not empty Afotografia}">
			<input type="hidden" name="fotografia" id="fotografia" value="${materiaPrima.fotografia}">
			<a href="#" class="btn" type="button" id="subirFotografia">Cambiar Archivo</a>
			<a href="/archivos/${Afotografia.nombreArchivo}" class="btn"  target="_blank">  Descargar Archivo ${Afotografia.nombreArchivo}</a> 
			</c:if>
		</span>
	</p>
	

	<p>
		<label>Costo Unitario : </label><span class="field"> $. <input onkeypress="return check_digit(event,this,15,2);"
			class="input-small monedaPeruInput" name="costoUnitarioDolares" id="costoUnitarioDolares" style="text-align: right;"
			value="<c:if test="${empty materiaPrima.costoUnitarioDolares}">0.0</c:if><c:if test="${not empty materiaPrima.costoUnitarioDolares}">${materiaPrima.costoUnitarioDolares}</c:if>"> 
		</span>
	</p>
			
	<p>
		<label>Costo Unitario : </label><span class="field"> S/. <input onkeypress="return check_digit(event,this,15,2);"
			class="input-small monedaPeruInput" name="costoUnitario" id="costoUnitario" style="text-align: right;"
			value="<c:if test="${empty materiaPrima.costoUnitario}">0.0</c:if><c:if test="${not empty materiaPrima.costoUnitario}">${materiaPrima.costoUnitario}</c:if>"> 
		</span>
	</p>
	
	
	
	
	

	
		<p class="stdformbutton">
		<button type="submit" class="btn btn-primary btn-rounded"
			>
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelarMateriaPrima()"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



