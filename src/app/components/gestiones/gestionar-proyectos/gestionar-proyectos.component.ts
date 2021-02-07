import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertResult } from 'sweetalert2';
import { Cliente } from 'src/app/models/Cliente';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { Proyecto } from 'src/app/models/proyecto';
import { Location } from '@angular/common';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-gestionar-proyectos',
  templateUrl: './gestionar-proyectos.component.html',
  styleUrls: ['./gestionar-proyectos.component.scss']
})
export class GestionarProyectosComponent implements OnInit {

  proyectos: Proyecto [] = [];

  constructor(private _mensagesAlertService: MensagesAlertService, private router: Router, private storage: StorageMap, private location: Location, private _proyectosService: ProyectosService) {}

  ngOnInit() {
    this.getProyectos();
  }

  getProyectos() {
    this._proyectosService.getProyectos().then(response => response.subscribe(proyectos => {
      proyectos.forEach((proyecto: Proyecto) => this.proyectos.push(proyecto));
      console.log('this.proyectosAux',this.proyectos);
    }));
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
