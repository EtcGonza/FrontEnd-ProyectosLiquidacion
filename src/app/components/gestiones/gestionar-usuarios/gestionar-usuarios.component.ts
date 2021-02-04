import { Component, OnInit } from '@angular/core';
import { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { Empleado } from 'src/app/models/empleado';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.scss']
})

export class GestionarUsuariosComponent implements OnInit {

  empleados: Empleado [] = [];

  constructor(private router: Router, private _mensagesAlertServices: MensagesAlertService, private storage: StorageMap, private location: Location) {}

  ngOnInit() {
    // let empleado1 = new Empleado();
    // empleado1.NombreEmpleado = 'Gonzalo';
    // empleado1.ApellidoEmpleado = 'Etchegaray';
    // empleado1.DniEmpleado = 39662738;
    // empleado1.Direccion = 'Roca 1566';
    // empleado1.fechaIngreso = new Date();
    // empleado1.idEmpleado = 0;
    // empleado1.telefono = 3413496691;

    // console.log(JSON.stringify(empleado1));
    
    // let empleado2 = new Empleado();
    // empleado2.NombreEmpleado = 'Nancy';
    // empleado2.ApellidoEmpleado = 'Garcia';
    // empleado2.DniEmpleado = 11767270;
    // empleado2.Direccion = 'Zarasa 158';
    // empleado2.fechaIngreso = new Date();
    // empleado2.idEmpleado = 1;
    // empleado2.telefono = 4860399;

    // this.empleados.push(empleado1);
    // this.empleados.push(empleado2);
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
