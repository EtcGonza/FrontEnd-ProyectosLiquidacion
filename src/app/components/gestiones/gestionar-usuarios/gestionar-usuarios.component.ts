import { Component, OnInit } from '@angular/core';
import { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { Empleado } from 'src/app/models/empleado';
import { Location } from '@angular/common';
import { EmpleadosService } from '../../../services/empleados.service';
import { Perfil } from '../../../models/Perfil';
import { PerfilEmpleadoService } from '../../../services/perfil-empleado.service';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.scss']
})

export class GestionarUsuariosComponent implements OnInit {

  empleados: Empleado [] = [];
  empledoBorrar: Empleado = null;

  constructor(
     private _mensagesAlertServices: MensagesAlertService,
     private _perfilesEmpleadoService: PerfilEmpleadoService,
     private _empleadoService: EmpleadosService,
     private router: Router,
     private storage: StorageMap,
     private location: Location) {}

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().then(response => response.subscribe((empleados: Empleado []) => empleados.forEach((empleado: Empleado) => this.empleados.push(empleado)), 
    error => this._mensagesAlertServices.ventanaError('Error', 'No se pudo recuperar la lista de empleados')));
  }

  editarEmpleado(empleado: Empleado) {
    this.storage.set('_modificarEmpleado', empleado).subscribe({
      next: ()=> {},
      error: () => this._mensagesAlertServices.ventanaError('Storage', 'No se pudo guardar el usuario en el storage')
    });

    this.router.navigateByUrl('crearModificarUsuario', {replaceUrl: false});
  }

  getPerfilesEmpleadoBorrar() {
    this._perfilesEmpleadoService.getPerfilesEmpleado(this.empledoBorrar.idempleado).then(response => response.subscribe((perfilesEmpleado: Perfil[]) => this.empledoBorrar.perfilEmpleado, error => {
      this._mensagesAlertServices.ventanaError('Error', 'No se pudo recuperar los perfiles del empleado');
    }));
  }

  borrarEmpleado(empleado: Empleado) {
    this._mensagesAlertServices.ventanaConfirmar('Borrar empleado', `¿Esta seguro que desea borrar el proyecto '${empleado.nombreEmpleado}'?`)
    .then((result: SweetAlertResult) => {
      if(result.isConfirmed) {
        this.empledoBorrar = empleado;
        this.getPerfilesEmpleadoBorrar();

        this._empleadoService.borrarEmpelado(empleado.idempleado).then(response => response.subscribe(respuesta => {
          this._mensagesAlertServices.ventanaExitosa('Exito', `El usuario ${empleado.nombreEmpleado} fue eliminado exitosamente.`);
          this.empleados = [];
          this.getEmpleados();
        }, error => this._mensagesAlertServices.ventanaError('Error', `No se pudo eliminar el usuario ${empleado.nombreEmpleado}.`)));
      }
    });
  }

  crearEmpleado() {
    this.storage.delete('_modificarEmpleado').subscribe(() => {});
    this.router.navigateByUrl('crearModificarUsuario', {replaceUrl: false});
  }

  volver() {
    this.location.back();
  }
}
