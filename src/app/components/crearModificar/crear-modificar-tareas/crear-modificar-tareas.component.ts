import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagesAlertService } from '../../../services/mensages-alert.service';
import { Proyecto } from '../../../models/proyecto';
import { ProyectosService } from '../../../services/proyectos.service';
import { Tarea } from '../../../models/Tarea';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-modificar-tareas',
  templateUrl: './crear-modificar-tareas.component.html',
  styleUrls: ['./crear-modificar-tareas.component.scss']
})
export class CrearModificarTareasComponent implements OnInit {

  miProyecto: Proyecto = null;
  tituloCard: string = '';

  formulario: FormGroup;

  tareasProyecto: Tarea [] = [];
  modificarTarea: boolean;

  constructor(private _mensagesAlertService: MensagesAlertService,
     private formBuilder: FormBuilder,
     private router: Router,
     private storage: StorageMap,
     private _proyectoServices: ProyectosService,
     private location: Location) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      Idtarea: [null],
      Idproyecto: [null],
      Idempleado: [null],
      Idperfil: [null],
      DescripcionTarea: [null ,Validators.required], 
      HorasEstimadasTarea: [null ,Validators.required],
      HorasOverbudget: [null],
      HorasTrabajadas: [null],
    });

    this.storage.get('_proyectoTareas')
    .subscribe((miProyecto: Proyecto) => {
      if (miProyecto) {
        this.miProyecto = miProyecto;
        this.tituloCard = `Crear tarea - Proyecto ${miProyecto.NombreProyecto}`;
        // this.getTareasProyecto(miProyecto.Idproyecto);
        // this.tareasProyecto = miProyecto.Tarea;
      }
    });

    let tarea1 = new Tarea ();
    tarea1.DescripcionTarea = 'Crear header';
    tarea1.HorasEstimadasTarea = 8;
    tarea1.HorasTrabajadas = 9;
    tarea1.HorasOverbudget = 1;

    this.tareasProyecto.push(tarea1);
  }

  getTareasProyecto(idProyecto: number) {
    this._proyectoServices.getTareasProyecto(idProyecto).then(response => 
      response.subscribe(respuesta => {
        console.log(respuesta);
      }));
  }

  guardarTarea() {
    if (this.formulario.valid) {
      let tituloAlert = this.modificarTarea ? 'Tarea modificada': 'Tarea creada';
      let cuerpoAlert = this.modificarTarea ? `La tarea '${this.formulario.value.DescripcionTarea}' fue modificada exitosamente`: `La tarea '${this.formulario.value.DescripcionTarea}' fue creada exitosamente`;
      this._mensagesAlertService.ventanaExitosa(tituloAlert, cuerpoAlert);

      // Una vez guardada la tarea, reseteo el formulario y cambio el contexto de que no estoy modificando.
      this.formulario.reset();
      this.modificarTarea = false;
      this.tituloCard = `Crear tarea - Proyecto ${this.miProyecto.NombreProyecto}`;
    } else {
        console.log('Form invalido',this.formulario.value);
        this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }

  editarTarea(tarea: Tarea) {
    this.modificarTarea = true;
    this.tituloCard = `Modificar tarea '${tarea.DescripcionTarea}' - Proyecto ${this.miProyecto.NombreProyecto}`
    this.formulario.patchValue(tarea);
  }

  volver() {
    this.location.back();
  }
}
