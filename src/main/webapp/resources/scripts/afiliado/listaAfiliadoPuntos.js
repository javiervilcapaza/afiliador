var tablita;

$.fn.dataTableExt.oApi.fnReloadAjax = function(oSettings, sNewSource) {
	this.fnClearTable(this);
	this.oApi._fnProcessingDisplay(oSettings, true);
	var that = this;

	$.getJSON(oSettings.sAjaxSource, null, function(json) {
		oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
		that.fnDraw(that);
		that.oApi._fnProcessingDisplay(oSettings, false);
	});
};

$(function() {

	var baseURL = $("#baseURL").val();

	tablita = $('#tabla')
			.dataTable(
					{
						"bProcessing" : true,
						"bServerSide" : true,
						"sAjaxSource" : baseURL + "afiliado/listaPuntosJson",
						"fnServerData" : function(sSource, aoData, fnCallback) {
							aoData.push({
								"name" : "dni",
								"value" : $("#dni").val()
							});
							aoData.push({
								"name" : "nombresApellidos",
								"value" : $("#nombresApellidos").val()
							});
							request = $
									.ajax({
										"dataType" : "json",
										"contentType" : "application/json; charset=UTF-8",
										"type" : "GET",
										"url" : sSource,
										"data" : aoData,
										"success" : fnCallback,
										"enctype" : "multipart/form-data"
									});
						},
						"bFilter" : false,
						"columnDefs": [
						               {
						                   "targets": [ 2 ],
						                   "visible": false,
						                   "searchable": false
						               },
						               {
						                   "targets": [ 3 ],
						                   "visible": false
						               }
						           ],
						"boColumns" : [ {
							sClass : "center"
						}, {}, {
							sClass : "center"
						}, {
							sClass : "center"
						}, {
							sClass : "center"
						} ],
						"bLengthChange": false

						
					});
});

function recarga() {
	tablita.fnReloadAjax();
}

function puntos(idAfiliado, puntos){
	var baseURL = $("#baseURL").val(); 
	var url = baseURL + 'afiliado/puntos/?';
	url += "idAfiliado="+idAfiliado;
	url += "&punto="+puntos;
	
	
	$.get(url,function(respuesta){
		if(respuesta == 1){
			$('#'+idAfiliado).html(parseInt($('#'+idAfiliado).html())+1);
			alert("Se ha guardado los cambios");
		}
		if(respuesta == 2){
			$('#'+idAfiliado).html(parseInt($('#'+idAfiliado).html())-1);
			alert("Se ha realizado los cambios");
		}
		if(respuesta == 0){
			alert("Intentelo mas tarde.");
		}
	});
}