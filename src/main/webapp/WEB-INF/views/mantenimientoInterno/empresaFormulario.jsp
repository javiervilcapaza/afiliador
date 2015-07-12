<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%><%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script	src="<c:url value="/resources/scripts/plantilla/jquery.validate.min.js"/>"></script>
<script	src="<c:url value="/resources/scripts/mantenimientoInterno/empresaFormulario.js"/>"></script>
<script	src="<c:url value="/resources/scripts/plantilla/jquery.jgrowl.js"/>"></script>

<form class="stdform"
	action="<c:url value="/mantenimientoInterno/guardaEmpresa"/>"
	method="POST" id="frmGuarda">

	<c:if test="${not empty empresa}">
		<input type="hidden" id="idEmpresa" name="id" value="${empresa.id}" />
		
	</c:if>
	
	<p>
		<label>Tipo de Persona :</label><span class="field">
			<div style="display: inline-block;">
				<span><input name="tipoPersona" 
					<c:if test="${empresa.tipoPersona=='natural'}"> checked="checked"</c:if>
					type="radio" value="natural" onclick="Natural()"></span>
			</div> Natural &nbsp; &nbsp;
			<div style="display: inline-block;">
				<span><input name="tipoPersona"
					<c:if test="${empresa.tipoPersona=='juridica'}"> checked="checked"</c:if>
					<c:if test="${empty empresa}"> checked="checked"</c:if>
					type="radio" value="juridica" onclick="Juridica()"></span>
			</div> Juridica &nbsp; &nbsp;
		</span>
	</p>
	
	<p>
		<label id="lblRazonSocial">Razon Social :</label><span class="field"> <div class="floatLeft"> <input
			maxlength="250" class="input-xxlarge" name="razonSocial"
			id="razonSocial" value="${empresa.razonSocial}"></div> (*)
		</span>
	</p>
	
		<p>
		<label id="lblNombreComercial">Nombre Comercial :</label><span class="field"> <div class="floatLeft"><input
			maxlength="250" class="input-xxlarge" name="nombreEmpresa"
			id="nombreEmpresa" value="${empresa.nombreEmpresa}"> </div>(*)
		</span>
	</p>
	
		
	<p id="pRUC">
		<label>RUC :</label><span class="field"> <input
			maxlength="11" class="input-small" name="ruc" id="ruc"
			value="${empresa.ruc}">
		</span>
	</p>
	
	<p id="pDNI" style="display:none">
		<label>DNI :</label><span class="field"> <input
			maxlength="8" class="input-small" name="dni" id="dni"
			value="${empresa.ruc}">
		</span>
	</p>
	
	
	<p>
		<label>Direccion :</label><span class="field"> <input
			maxlength="250" class="input-xxlarge" name="direccion"
			id="direccion" value="${empresa.direccion}">
		</span>
	</p>
	
		<p>
			<label>Distrito - Provincia - Departamento :</label><span
				class="field"> <input type="hidden" name="ubigeo.id"
				id="idUbigeo" value="${proveedor.ubigeo.id}"> <input
				type="text" name="distritoAutocomplete" id="distritoAutocomplete"
				class="input-xxlarge"
				value="<c:if test="${not empty empresa}"> ${empresa.ubigeo.distrito} - ${empresa.ubigeo.provincia} - ${empresa.ubigeo.departamento}</c:if>">
			</span>
	</p>
	
		<p>
		<label>Fecha de Inicio de Actividades : </label><span class="field"> <input
			type="text" name="fechaInicios" id="fechaInicio"
			value="<fmt:formatDate value="${empresa.fechaInicio}" pattern="dd/MM/yyyy" />"  class="input-small">
		</span>
	</p>

	<p>
		<label>Descripcion :</label><span class="field"> 
			<textarea name="descripcion" id="descripcion"  class="input-xxlarge">${empresa.descripcion}</textarea>
		</span>
	</p>
	
	<c:if test="${ empty empresa}">
	<button class="btn" type="button" id="subirArchivoAdjunto" style="display:none"></button>
	</c:if>
	
	<c:if test="${not empty empresa}">
	
		<p id="fotografiasDescriptiva">
		<label><b>Documentos Adjuntos : </b></label>
		<span class="field">
		<div class="input-append">
			<input type="text" class="span3" name="documentoDescripcion"  id="documentoDescripcion" placeholder="Descripción" maxlength="250">
			<button class="btn" type="button" id="subirArchivoAdjunto" onclick="subeArchivo()">Subir Archivo</button>
		</div>
		
		<c:if test="${not empty documentos}">
		
			<table class="table table-bordered detalleTabla">
				<thead>
					<tr align="center">
						<th width="30px">Item</th>
						<th width=70px>F. Registro</th>
						<th style="width: 28%">Nombre</th>
						<th>Descripcion</th>
						<th>Ver</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
		<c:forEach var="i" items="${documentos}" varStatus="status">
						<tr align="center">
							<td class="center">${status.count}</td>
							<td class="center"><fmt:formatDate value="${i.fechaRegistro}" pattern="dd/MM/yyyy" /></td>
							<td>${i.nombreArchivo}</td>
							<td>${i.descripcion}</td>
							<td width="50px" class="center"><a class="sinEstilo"
								href="javascript:abrir('/archivos/${i.nombreArchivo}');"> <img style="vertical-align: middle; display:inline;" src="resources/images/lupa.gif" width="16" height="17"
									border="0">
							</a></td>
							<td width="40px" class="center"><a class="sinEstilo"
								href="#fotografiasDescriptiva" onclick="eliminarArchivoVersion(${i.id})"> <img  style="vertical-align: middle; display:inline;"
									src="resources/images/eliminar.gif" width="16" height="17"
									border="0">
							</a></td>
						</tr>
					</c:forEach>
					</tbody>
					</table>
					</c:if>
		</span>
		</span>
	</p>
	
	</c:if>
	
	<hr>

		<div class="row topMargin">
			<div class="span7 subtitulo">Informacion Registral</div>
			<div style="float: right;">
				
			</div>
		</div>

	<p>
		<label>Nro Partida Registral :</label><span class="field"> 
			<input name="nroPartidaRegistral" id="nroPartidaRegistral" value="${empresa.nroPartidaRegistral}" class="input-small">
			<span style="display: inline-block;">Nro Asiento :</span>
			<input name="nroAsient" id="nroAsient" value="${empresa.nroAsient}"  class="input-small">
		</span>
	</p>
		<p>
		<label>Zona Registral :</label><span class="field"> 
			<input name="zonaRegistral" id="zonaRegistral" value="${empresa.zonaRegistral}"  class="input-xlarge">
		</span>
	</p>
		<p>
		<label>Nro Titulo :</label><span class="field"> 
			<input name="nroTitulo" id="nroTitulo" value="${empresa.nroTitulo}"  class="input-small">
		</span>
	</p>
	
	<p>
		<label>Fecha de Presentacion: </label><span class="field"> <input
			type="text" name="fechaPresentacions" id="fechaPresentacion"
			value="<fmt:formatDate value="${empresa.fechaPresentacion}" pattern="dd/MM/yyyy" />"  class="input-small">
		</span>
	</p>
	
		<p>
		<label>Nombre de la Notaria :</label><span class="field"> 
			<input name="nombreNotaria" id="nombreNotaria" value="${empresa.nombreNotaria}"  class="input-xlarge">
		</span>
	</p>

	<c:if test="${not empty empresa}">
	
		<div class="row topMargin">
			<div class="span7 subtitulo">Detalle de Accionistas</div>
			<div style="float: right;">
				<p>
					<a href="#" id="" onclick="agregarAccionista(${empresa.id})"
						class="btn btn-primary btn-rounded"> <i
						class="icon-plus icon-white"></i> Agregar
					</a>
				</p>

			</div>
		</div>
		
		
	<div id="lista">
	<c:if test="${not empty accionistas}">	
		<table class="table table-bordered" id="tabla">
			<thead>
				<tr align="center">
					<th width="60%">Nombre Completo</th>
					<th width="15%">Cargo</th>
					<th width="10%">DNI</th>
					<th width="10%">% de Acciones</th>
					<th>Editar</th>
					<th>Eliminar</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach var="i" items="${accionistas}">
					<tr align="center">
						<td class="center">${i.nombreCompleto}</td>
						<td class="center">${i.cargo}</td>
						<td class="center">${i.dni}</td>
						<td class="center">${i.porcentaje}</td>
						<td width="50px" class="center">
							<a class="sinEstilo" href="#"
								onclick="editarAccionista(${empresa.id},${i.id})">
								<img src="resources/images/ver.gif" width="16" height="17"  style="display: inline-block;"
									border="0">
							</a>
						</td>
						<td width="50px" class="center">
							<a class="sinEstilo" href="#"
								onclick="eliminarAccionista(${i.id})">
								<img src="resources/images/eliminar.gif" width="16" height="17" style="display: inline-block;"
									border="0">
							</a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		</c:if>
		<c:if test="${empty accionistas }">
		Aun no se agregaron accionistas.
		<hr>
		</c:if>
	</div>
	
</c:if>


	<p class="stdformbutton"  style="margin-left: 40%">
		<button type="submit" class="btn btn-primary btn-rounded" onclick="guarda()">
			<span class="icon-white  icon-check"></span> Guardar
		</button>
		<a href="#" id="" onclick="cancelar()"
			class="btn btn-primary btn-rounded""><span
			class=" icon-ban-circle icon-white"></span> <spring:message code="label.formulario.cancelar"/></a>
	</p>

</form>



