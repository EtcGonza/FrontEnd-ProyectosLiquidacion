import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { GestionarProyectosComponent } from './components/gestionar-proyectos/gestionar-proyectos.component';
import { CrearModificarProyectoComponent } from './components/crear-modificar-proyecto/crear-modificar-proyecto.component';
import { GestionarUsuariosComponent } from './components/gestionar-usuarios/gestionar-usuarios.component';
import { CrearModificarUsuarioComponent } from './components/crear-modificar-usuario/crear-modificar-usuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gestionarProyectos', component: GestionarProyectosComponent },
  { path: 'gestionarUsuarios', component: GestionarUsuariosComponent },
  { path: 'crearModificarProyecto', component: CrearModificarProyectoComponent },
  { path: 'crearModificarUsuario', component: CrearModificarUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
