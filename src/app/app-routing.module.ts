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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },

  { path: 'gestionarProyectos', component: GestionarProyectosComponent, canActivate: [LoggedInGuard]},
  { path: 'gestionarUsuarios', component: GestionarUsuariosComponent, canActivate: [LoggedInGuard]},
  { path: 'gestionarClientes', component: GestionarClientesComponent, canActivate: [LoggedInGuard]},

  { path: 'misTareas', component: MisTareasComponent, canActivate: [LoggedInGuard]},

  { path: 'generarLiquidacion', component: GenerarLiquidacionComponent, canActivate: [LoggedInGuard]},

  { path: 'crearModificarProyecto', component: CrearModificarProyectoComponent, canActivate: [LoggedInGuard]},
  { path: 'crearModificarUsuario', component: CrearModificarUsuarioComponent, canActivate: [LoggedInGuard]},
  { path: 'crearModificarCliente', component: CrearModificarClienteComponent, canActivate: [LoggedInGuard]},
  { path: 'crearModificarTareas', component: CrearModificarTareasComponent, canActivate: [LoggedInGuard]},

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
