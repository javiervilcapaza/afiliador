<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mundo Moda Sys - Login</title>
<link rel="stylesheet" href="resources/css/estilos.css" type="text/css" />
</head>

<body leftmargin="0" topmargin="0" class="fondoMM">
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
  <tr> 
    <td width="20%" height="5"></td>
	<td width="10%" height="5"></td>
	<td width="40%" height="5"></td>
	<td width="10%" height="5"></td>
	<td width="20%" height="5"></td>
   </tr>
  <tr>
   <td colspan="5">
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
          <td width="25%" align="center" valign="middle" class="titulo2"><img src="resources/img/logo_mundomoda.JPG" width="190" height="100"> 
          </td> 
          <td width="50%" height="60" align="center">&nbsp;</td>
	      <td width="25%" align="center" valign="middle" class="titulo2">&nbsp; </td> 
	  </tr>
	</table>
   </td>
  </tr>
   <tr> 
    <td valign="middle" class="campos3i" align="left" height="25"></td>
    <td valign="middle" colspan="3" class="campos3iSICOM" align="center" height="25">Sistema 
      de Informaci&oacute;n Corporaci&oacute;n Mundo Moda SAC</td>
    <td valign="middle" class="campos3i" align="right" height="25">Lima, 07 de 
      Mayo del 2010</td>
   </tr>
</table>
<p class="message">${message}</p>
 <form name="frmAceptacion" action="j_spring_security_check" method="post"> 
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
   <tr> 
    <td width="34%" rowspan="2"><table width="75%" border="1" cellpadding="1" cellspacing="0" bordercolor="#333333" align="center" bgcolor="ffffff">
	 <tr><td> 
	  <table width="100%" border="0" cellpadding="2" cellspacing="0" class="campos" align="center">
	      <tr> 
                  <td class="campos2i" colspan="2" align="left"><b>Ingreso al 
                    Sistema </b></td>
          </tr>
		  <tr> 
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
		   <tr> 
            <td colspan="2">Ingrese su Usuario y Contraseña :</td>
          </tr>
		   <tr> 
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr> 
            <td align="right" class="camposU"><b>Usuario :</b></td>
            <td> <input name="j_username" type="text" class="campos" id="txt_login" size="17" maxlength="17"></td>
          </tr>
          <tr> 
            <td align="right" class="camposU"><b>Contrase&ntilde;a :</b></td>
            <td><input name="j_password" type="password" class="campos" id="txt_contrasena" size="17" maxlength="17"></td>
          </tr>
          <tr> 
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr> 
            <td align="center" colspan="2"><input type="submit" class="botones" value="Aceptar" ></td>
          </tr>
		   <tr><td align="center" colspan="2">&nbsp;</td></tr>
     </table>
	 </td></tr>
	</table></td>
   </tr>
   <tr> 
    <td><br><br>
	<table>
	<tr><td class="campos2i"><strong><li>Enlaces de Interés : </li></strong></td></tr>
	<tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.sni.gob.pe" class="clase3" target="_blank">Sociedad 
              Nacional de Industrias - SNI</a></td>
          </tr>
	<tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.elcomercioperu.com.pe" class="clase3" target="_blank">Diario 
              El Comercio</a></td>
          </tr>
	<tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.sbs.gob.pe" class="clase3" target="_blank">Superintendencia 
              de Banca y Seguros - SBS</a></td>
          </tr>
	</table>
	<br>
      </td>
    <td width="37%" valign="bottom"><div align="left">
          <p>&nbsp;</p>
          <p><img src="resources/img/foto_principal.jpg" width="307" height="320"></p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <span class="campofondo"></span></div></td>
   </tr>
   <tr> 
    <td valign="middle" colspan="3" align="right" height="26">&nbsp;</td>
   </tr>
   <tr>
    <td align="center" class="campos3">&nbsp;</td>
   </tr>
   <tr> 
    <td valign="middle" colspan="3" align="right" height="20">&nbsp;</td>
   </tr>
   <tr> 
      <td valign="middle" colspan="3" class="campos3i" align="center" height="40">Calle 
        Mart&iacute;n Oviedo 243 - Pueblo Libre - Lima - Per&uacute;<br>
        Teléfono: (511) 462-2553 / (511) 9927-47051</td>
   </tr>
  <br>
</table>
</form>
</body>
</html>