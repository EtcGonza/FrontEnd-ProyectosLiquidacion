import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { PrimeNgModule } from './prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { GestionarUsuariosComponent } from '../components/gestiones/gestionar-usuarios/gestionar-usuarios.component';
import { GestionarClientesComponent } from '../components/gestiones/gestionar-clientes/gestionar-clientes.component';
import { CrearModificarClienteComponent } from '../components/crearModificar/crear-modificar-cliente/crear-modificar-cliente.component';
import { CrearModificarProyectoComponent } from '../components/crearModificar/crear-modificar-proyecto/crear-modificar-proyecto.component';
import { CrearModificarUsuarioComponent } from '../components/crearModificar/crear-modificar-usuario/crear-modificar-usuario.component';
import { GestionarProyectosComponent } from '../components/gestiones/gestionar-proyectos/gestionar-proyectos.component';
import { CrearModificarTareasComponent } from '../components/crearModificar/crear-modificar-tareas/crear-modificar-tareas.component';
import { AsignarEmpleadoProyectoComponent } from '../components/crearModificar/crear-modificar-proyecto/asignar-empleado-proyecto/asignar-empleado-proyecto.component';
import { AsignarPerfilEmpleadoComponent } from '../components/crearModificar/crear-modificar-usuario/asignar-perfil-empleado/asignar-perfil-empleado.component';
import { MisTareasComponent } from '../components/gestiones/mis-tareas/mis-tareas.component';
import { GenerarLiquidacionComponent } from '../components/generar-liquidacion/generar-liquidacion.component';


@NgModule({
  declarations: [
  HeaderComponent,
  LoginComponent,
  HomeComponent,
  GestionarUsuariosComponent,
  GestionarProyectosComponent,
  CrearModificarProyectoComponent,
  CrearModificarTareasComponent,
  CrearModificarUsuarioComponent,
  CrearModificarClienteComponent,
  GestionarClientesComponent,
  AsignarEmpleadoProyectoComponent,
  AsignarPerfilEmpleadoComponent,
  MisTareasComponent,
  GenerarLiquidacionComponent
],
  exports:[
  HeaderComponent,
  LoginComponent,
  HomeComponent,
  GestionarUsuariosComponent,
  GestionarProyectosComponent,
  CrearModificarProyectoComponent,
  CrearModificarTareasComponent,
  CrearModificarUsuarioComponent,
  CrearModificarClienteComponent,
  GestionarClientesComponent,
  AsignarEmpleadoProyectoComponent,
  AsignarPerfilEmpleadoComponent,
  MisTareasComponent,
  GenerarLiquidacionComponent
],
  imports: [
    CommonModule, PrimeNgModule,
    FormsModule,ReactiveFormsModule]
})

export class MyComponentsModule { }
