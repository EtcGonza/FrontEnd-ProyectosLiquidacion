import { Component, OnInit } from '@angular/core';
import { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { Empleado } from 'src/app/models/empleado';
import { Location } from '@angular/common';
import { EmpleadosService } from '../../../services/empleados.service';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.scss']
})

export class GestionarUsuariosComponent implements OnInit {

  empleados: Empleado [] = [];

  constructor(private router: Router,
     private _mensagesAlertServices: MensagesAlertService,
     private storage: StorageMap,
     private location: Location,
     private _empleadoService: EmpleadosService) {}

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().then(response => response.subscribe((empleados: Empleado []) => empleados.forEach((empleado: Empleado) => {
      console.log(empleado);
      this.empleados.push(empleado)
    })));
  }

  editarEmpleado(empleado: Empleado) {
    this.storage.set('_modificarEmpleado', empleado).subscribe({
      next: ()=> console.log('next'),
      error: () => console.log('error')
    });

    this.router.navigateByUrl('crearModificarProyecto', {replaceUrl: false});
  }

  borrarEmpleado(empleado: Empleado) {
    this._mensagesAlertServices.ventanaConfirmar('Borrar empleado', `¿Esta seguro que desea borrar el proyecto '${empleado.NombreEmpleado}'?`)
    .then((result: SweetAlertResult) => {
      if(result.isConfirmed) {
        // Llamo endpoint para borrar proyecto.
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
