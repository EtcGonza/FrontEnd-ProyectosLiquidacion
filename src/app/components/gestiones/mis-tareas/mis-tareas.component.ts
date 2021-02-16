import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../../services/tarea.service';
import { MensagesAlertService } from '../../../services/mensages-alert.service';
import { Store } from '@ngxs/store';
import { UsuarioState } from '../../../states/usuario/usuario-state';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from '../../../models/Tarea';
import { SweetAlertResult } from 'sweetalert2';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-mis-tareas',
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.scss']
})
export class MisTareasComponent implements OnInit {

  proyectos: Proyecto[] = [];
  tareasEmpleado: Tarea[] = [];

  constructor(
    private _tareaService: TareaService,
    private _messagesService: MensagesAlertService,
    private _proyectoService: ProyectosService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getTareasEmpleado();
    this.getProyectos();
  }

  getTareasEmpleado() {
    const idEmpleado = this.store.selectSnapshot(UsuarioState.getIdEmpleado);

    this._tareaService.findTareasEmpleado(idEmpleado).then(response => response.subscribe((tareasEmpleado: Tarea[]) => tareasEmpleado.forEach((tarea: Tarea) => this.tareasEmpleado.push(tarea))));
  }

  getProyectos() {
    this._proyectoService.getProyectos().then(response => response.subscribe((proyectos: Proyecto[]) => proyectos.forEach((proyecto: Proyecto) => this.proyectos.push(proyecto))));
  }

  getNombreProyectoByTarea(tarea: Tarea) {
    const proyecto = this.proyectos.find((proyecto: Proyecto) => proyecto.idproyecto === tarea.idproyecto);
    if (proyecto) {
      return proyecto.nombreProyecto;
    }
  }

  completarTarea(tarea: Tarea) {
    this._messagesService.ventanaConfirmar('Completar tarea', `¿Esta seguro que desea completar la tarea '${tarea.descripcionTarea}'? Asegurese de haber guardado las horas antes de completar la tarea. Una vez completada no podra modificar las horas.`)
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          if (tarea.horasOverbudget <= 0 || tarea.horasTrabajadas <= 0) {
            let campoInvalido: string = tarea.horasOverbudget < 0 ? 'horas overbudget' : 'horas trabajadas';
            this._messagesService.ventanaWarning('Atención', `La tarea '${tarea.descripcionTarea}' en el campo '${campoInvalido}' tiene un valor invalido. El numero de horas debe ser mayor a cero`);
          } else {
            tarea.finalizada = 'true';
            this._tareaService.crearTarea(tarea).then(response => response.subscribe(respuesta => {
              this._messagesService.ventanaExitosa('Exíto', `La tarea '${tarea.descripcionTarea}' ha sido finalizada`);
              this.tareasEmpleado = [];
              this.getTareasEmpleado();
            },
              error => this._messagesService.ventanaError('Error', `La tarea '${tarea.descripcionTarea}' no se pudo finalizar`)));
          }
        }
      });
  }

  guardarTarea(tarea: Tarea) {
    if (tarea.horasOverbudget < 0 || tarea.horasTrabajadas < 0) {
      let campoInvalido: string = tarea.horasOverbudget < 0 ? 'horas overbudget' : 'horas trabajadas';
      this._messagesService.ventanaWarning('Atención', `La tarea '${tarea.descripcionTarea}' en el campo '${campoInvalido}' tiene un valor invalido. El numero de horas no puede ser menor a cero`);
    } else {
      this._tareaService.crearTarea(tarea).then(response => response.subscribe(respuesta => {
        this._messagesService.ventanaExitosa(`Exíto`, `Se guardaron las horas de la tarea '${tarea.descripcionTarea}'`);
        this.tareasEmpleado = [];
        this.getTareasEmpleado();
      }));
    }

  }
}
