import { Component, OnInit } from '@angular/core';
import { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';
import { MensagesAlertService } from '../../services/mensages-alert.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.scss']
})

export class GestionarUsuariosComponent implements OnInit {

  empleados: Empleado [] = [];

  constructor(private router: Router, private _mensagesAlertServices: MensagesAlertService) {}

  ngOnInit() {
    let empleado1 = new Empleado();
    empleado1.nombreEmpleado = 'Gonzalo';
    empleado1.apellidoEmpleado = 'Etchegaray';
    empleado1.dniEmpleado = 39662738;
    empleado1.direccion = 'Roca 1566';
    empleado1.fechaIngreso = new Date();
    empleado1.idEmpleado = 0;
    empleado1.telefono = 3413496691;
    
    let empleado2 = new Empleado();
    empleado2.nombreEmpleado = 'Nancy';
    empleado2.apellidoEmpleado = 'Garcia';
    empleado2.dniEmpleado = 11767270;
    empleado2.direccion = 'Zarasa 158';
    empleado2.fechaIngreso = new Date();
    empleado2.idEmpleado = 1;
    empleado2.telefono = 4860399;

    this.empleados.push(empleado1);
    this.empleados.push(empleado2);
  }

  editarEmpleado(empleado: Empleado) {
    // this.storage.set('_modificarEmpleado', empleado);
    this.router.navigateByUrl('crearModificarProyecto', {replaceUrl: false});
  }

  borrarEmpleado(empleado: Empleado) {
    this._mensagesAlertServices.ventanaConfirmar('Borrar empleado', `¿Esta seguro que desea borrar el proyecto '${empleado.nombreEmpleado}'?`)
    .then((result: SweetAlertResult) => {
      if(result.isConfirmed) {
        // Llamo endpoint para borrar proyecto.
      }
    });
  }

  crearEmpleado() {
    // this.storage.remove('_modificarEmpleado');
    this.router.navigateByUrl('crearModificarUsuario', {replaceUrl: false});
  }

}
