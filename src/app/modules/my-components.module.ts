import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { PrimeNgModule } from './prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { GestionarProyectosComponent } from '../components/gestionar-proyectos/gestionar-proyectos.component';
import { CrearModificarProyectoComponent } from '../components/crear-modificar-proyecto/crear-modificar-proyecto.component';
import { GestionarUsuariosComponent } from '../components/gestionar-usuarios/gestionar-usuarios.component';
import { CrearModificarUsuarioComponent } from '../components/crear-modificar-usuario/crear-modificar-usuario.component';


@NgModule({
  declarations: [
  HeaderComponent,
  LoginComponent,
  HomeComponent,
  GestionarUsuariosComponent,
  GestionarProyectosComponent,
  CrearModificarProyectoComponent,
  CrearModificarUsuarioComponent
],
  exports:[
  HeaderComponent,
  LoginComponent,
  HomeComponent,
  GestionarUsuariosComponent,
  GestionarProyectosComponent,
  CrearModificarProyectoComponent,
  CrearModificarUsuarioComponent
],
  imports: [
    CommonModule, PrimeNgModule,
    FormsModule,ReactiveFormsModule]
})

export class MyComponentsModule { }
