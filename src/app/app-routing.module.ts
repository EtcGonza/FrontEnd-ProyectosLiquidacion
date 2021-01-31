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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },

  { path: 'gestionarProyectos', component: GestionarProyectosComponent },
  { path: 'gestionarUsuarios', component: GestionarUsuariosComponent },
  { path: 'gestionarClientes', component: GestionarClientesComponent },

  { path: 'crearModificarProyecto', component: CrearModificarProyectoComponent },
  { path: 'crearModificarUsuario', component: CrearModificarUsuarioComponent },
  { path: 'crearModificarCliente', component: CrearModificarClienteComponent },
  { path: 'crearModificarTareas', component: CrearModificarTareasComponent },

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
