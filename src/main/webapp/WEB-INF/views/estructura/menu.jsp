<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder"%>
<section class="sidebar">
    <!-- Sidebar user panel -->
    <div class="user-panel">
        <div class="pull-left image">
            <img src="resources/images/avatar3.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
            <p>
                Hola,
                <%=SecurityContextHolder.getContext().getAuthentication().getName()%></p>
            <a href="#">
                <i class="fa fa-circle text-success"></i> Afiliado
            </a>
        </div>
    </div>
    <!-- search form -->
    <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Buscar..." />
            <span class="input-group-btn">
                <button type='submit' name='search' id='search-btn' class="btn btn-flat">
                    <i class="fa fa-search"></i>
                </button>
            </span>
        </div>
    </form>
    <!-- /.search form -->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu">
        <li class="active"><a href="#afiliado/principal" title="Principal" class="menuLink">
                <i class="fa fa-dashboard"></i>
                <span>Principal</span>
            </a></li>
        <li><a href="#afiliado/lista" title="Afiliados" class="menuLink">
                <i class="fa fa-th"></i>
                <span>Afiliados</span>
            </a></li>
        <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SEGURIDAD','ROLE_SEGURIDAD_USUARIOS','ROLE_SEGURIDAD_PERFILES','ROLE_SEGURIDAD_ROLES')">
            <li class="treeview"><a href="#afiliado/listaPuntos" title="Administracion de Puntos" class="menuLink">
                    <i class="fa fa-th"></i>
                    <span>Puntos</span>
                </a></li>
            <li class="treeview"><a href="#">
                    <i class="fa fa-th"></i>
                    <span>Seguridad</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SEGURIDAD_USUARIOS')">
                        <li><a href="#" id="menuUsuarios">
                                <i class="fa fa-angle-double-right"></i>Usuarios
                            </a></li>
                    </sec:authorize>
                    <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SEGURIDAD_PERFILES')">
                        <li><a href="#" id="menuPerfiles">
                                <i class="fa fa-angle-double-right"></i>Perfiles
                            </a></li>
                    </sec:authorize>
                    <sec:authorize access="hasAnyRole('ROLE_ADMIN','ROLE_SEGURIDAD_ROLES')">
                        <li><a href="#" id="menuRoles">
                                <i class="fa fa-angle-double-right"></i>Roles
                            </a></li>
                    </sec:authorize>
                </ul></li>
                <li class="treeview"><a href="#historial/prueba" title="Prueba" class="menuLink">
                    <i class="fa fa-th"></i>
                    <span>Historial</span>
                </a></li>
            <li class="treeview"><a href="#configuracion/formulario" title="Configuracion" class="menuLink">
                    <i class="fa fa-th"></i>
                    <span>Configuración</span>
                </a></li>
        </sec:authorize>
        <li><a href="#enconstruccion" title="" class="menuLink">
                <i class="fa fa-th"></i>
                <span>Contactenos</span>
            </a></li>
    </ul>
</section>