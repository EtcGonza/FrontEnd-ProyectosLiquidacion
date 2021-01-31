import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertResult } from 'sweetalert2';
import { Cliente } from 'src/app/models/Cliente';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestionar-proyectos',
  templateUrl: './gestionar-proyectos.component.html',
  styleUrls: ['./gestionar-proyectos.component.scss']
})
export class GestionarProyectosComponent implements OnInit {

  proyectos: Proyecto [] = [];

  constructor(private _mensagesAlertService: MensagesAlertService, private router: Router, private storage: StorageMap, private location: Location) {}

  ngOnInit() {
    this.auxProyectos();
  }

  auxProyectos() {
    let proyecto1 = new Proyecto();
    proyecto1.EstadoProyecto = 'Activo';
    proyecto1.Idproyecto = 1;
    proyecto1.NombreProyecto = 'Marvel';
    proyecto1.FechaInicioProyecto = new Date();

    let cliente = new Cliente();
    cliente.direccionCliente = 'Pellegrini 515';
    cliente.idCliente = 0;
    cliente.nombreCliente = 'Disney';
    cliente.telefonoCliente = '3413496691';

    proyecto1.cliente = cliente;
    this.proyectos.push(proyecto1);

    let proyecto2 = new Proyecto();
    proyecto2.EstadoProyecto = 'Activo';
    proyecto2.Idproyecto = 2;
    proyecto2.NombreProyecto = 'Intel';
    proyecto2.FechaInicioProyecto = new Date();

    let cliente2 = new Cliente();
    cliente2.direccionCliente = 'Roca 1566';
    cliente2.idCliente = 1;
    cliente2.nombreCliente = 'Globant';
    cliente2.telefonoCliente = '4860399';

    proyecto2.cliente = cliente2;
    this.proyectos.push(proyecto2);
  }

  editarProyecto(proyecto: any) {
    this.storage.set('_modificarProyecto', proyecto).subscribe({
      next: ()=> console.log('next'),
      error: () => console.log('error')
    });
    this.router.navigateByUrl('crearModificarProyecto', {replaceUrl: false});
  }

  borrarProyecto(proyecto: Proyecto) {
    this._mensagesAlertService.ventanaConfirmar('Borrar proyecto', `¿Esta seguro que desea borrar el proyecto '${proyecto.NombreProyecto}'?`)
    .then((result: SweetAlertResult) => {
      if(result.isConfirmed) {
        // Llamo endpoint para borrar proyecto.
      }
    });
  }

  crearProyecto() {
    this.storage.delete('_modificarProyecto').subscribe(() => {});
    this.router.navigateByUrl('crearModificarProyecto', {replaceUrl: false});
  }

  navegarTareas(proyecto: Proyecto) {
    this.storage.set('_proyectoTareas', proyecto).subscribe({
      next: ()=> console.log('next'),
      error: () => console.log('error')
    });
    this.router.navigateByUrl('crearModificarTareas', {replaceUrl: false});
  }

  volver() {
    this.location.back();
  }
}
