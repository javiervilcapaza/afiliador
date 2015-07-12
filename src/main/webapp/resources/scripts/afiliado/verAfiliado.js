/**
 * 
 */

function matricular(){
	contentLoader('Matricula', 'alumno/matricula?idAlumno='+$("#idAlumno").val());
}

function imprimirFicha(){
	var idAlumno = $("#idAlumno").val();
	var idSemestre = $("#idSemestre").val();
	var baseURL = $("#baseURL").val();
	abreReporte(baseURL + "/alumno/matricula/generarFichaMatricula?idAlumno="+idAlumno+"&idSemestre="+idSemestre);
}

function abreReporte(url){
	window.open(url,"abrir","scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no,directories=no,resizable=yes,top=60,left=100");
};
