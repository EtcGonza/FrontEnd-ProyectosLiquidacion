import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionarProyectosComponent } from './components/gestiones/gestionar-proyectos/gestionar-proyectos.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { GestionarUsuariosComponent } from './components/gestiones/gestionar-usuarios/gestionar-usuarios.component';
import { CrearModificarProyectoComponent } from './components/crearModificar/crear-modificar-proyecto/crear-modificar-proyecto.component';
import { CrearModificarUsuarioComponent } from './components/crearModificar/crear-modificar-usuario/crear-modificar-usuario.component';
import { GestionarClientesComponent } from './components/gestiones/gestionar-clientes/gestionar-clientes.component';
import { CrearModificarClienteComponent } from './components/crearModificar/crear-modificar-cliente/crear-modificar-cliente.component';
import { CrearModificarTareasComponent } from './components/crearModificar/crear-modificar-tareas/crear-modificar-tareas.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { MisTareasComponent } from './components/gestiones/mis-tareas/mis-tareas.component';
import { GenerarLiquidacionComponent } from './components/generar-liquidacion/generar-liquidacion.component';
import { EstadisticasProyectoComponent } from './components/estadisticas-proyecto/estadisticas-proyecto.component';
import { EmpleadoGuard } from './guards/empleado.guard';
import { RootGuard } from './guards/root.guard';
import { ProjectManagerGuard } from './guards/project-manager.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },

  { path: 'gestionarProyectos', component: GestionarProyectosComponent, canActivate: [LoggedInGuard, EmpleadoGuard]},
  { path: 'gestionarUsuarios', component: GestionarUsuariosComponent, canActivate: [LoggedInGuard, EmpleadoGuard, ProjectManagerGuard]},
  { path: 'gestionarClientes', component: GestionarClientesComponent, canActivate: [LoggedInGuard, EmpleadoGuard, ProjectManagerGuard]},

  { path: 'misTareas', component: MisTareasComponent, canActivate: [LoggedInGuard, RootGuard, ProjectManagerGuard]},

  { path: 'generarLiquidacion', component: GenerarLiquidacionComponent, canActivate: [LoggedInGuard, EmpleadoGuard, ProjectManagerGuard]},

  { path: 'estadisticasProyecto', component: EstadisticasProyectoComponent, canActivate: [LoggedInGuard, EmpleadoGuard]},

  { path: 'crearModificarProyecto', component: CrearModificarProyectoComponent, canActivate: [LoggedInGuard, EmpleadoGuard]},
  { path: 'crearModificarUsuario', component: CrearModificarUsuarioComponent, canActivate: [LoggedInGuard, ProjectManagerGuard,EmpleadoGuard]},
  { path: 'crearModificarCliente', component: CrearModificarClienteComponent, canActivate: [LoggedInGuard, EmpleadoGuard, ProjectManagerGuard]},
  { path: 'crearModificarTareas', component: CrearModificarTareasComponent, canActivate: [LoggedInGuard, EmpleadoGuard]},

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
