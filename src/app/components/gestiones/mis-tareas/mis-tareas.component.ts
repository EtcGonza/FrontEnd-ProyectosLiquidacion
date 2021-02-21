import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../../services/tarea.service';
import { MensagesAlertService } from '../../../services/mensages-alert.service';
import { Store } from '@ngxs/store';
import { UsuarioState } from '../../../states/usuario/usuario-state';
import { Proyecto } from 'src/app/models/proyecto';
import { Tarea } from '../../../models/Tarea';
import { SweetAlertResult } from 'sweetalert2';
import { ProyectosService } from '../../../services/proyectos.service';
import { HoraTrabajada } from '../../../models/HoraTrabajada';
import { HoraTrabajadaService } from '../../../services/hora-trabajada.service';

@Component({
  selector: 'app-mis-tareas',
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.scss']
})
export class MisTareasComponent implements OnInit {

  proyectos: Proyecto[] = [];
  tareasEmpleado: Tarea[] = [];
  agregarHoras: number = 0;

  constructor(
    private _tareaService: TareaService,
    private _messagesService: MensagesAlertService,
    private _proyectoService: ProyectosService,
    private _horaTrabajadaService: HoraTrabajadaService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getTareasEmpleado();
    this.getProyectos();
  }

  getTareasEmpleado() {
    const idEmpleado = this.store.selectSnapshot(UsuarioState.getIdEmpleado);
    this.tareasEmpleado = [];
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
          tarea.finalizada = 'true';
          this._tareaService.crearTarea(tarea).then(response => response.subscribe(respuesta => {
            this._messagesService.ventanaExitosa('Exíto', `La tarea '${tarea.descripcionTarea}' ha sido finalizada`);
            this.tareasEmpleado = [];
            this.getTareasEmpleado();
          },
            error => this._messagesService.ventanaError('Error', `La tarea '${tarea.descripcionTarea}' no se pudo finalizar`)));
        }
      });
  }

  guardarHoras(tarea: Tarea) {
    let horaTrabajada: HoraTrabajada = new HoraTrabajada();

    // Creo mi instancia de HoraTrabada
    horaTrabajada.cantidadHoraTrabajada = this.agregarHoras;
    horaTrabajada.idempleado = tarea.idempleado;
    horaTrabajada.fechaHoraTrabajada = new Date();
    horaTrabajada.idperfil = tarea.idperfil;
    horaTrabajada.idtarea = tarea.idtarea;
    horaTrabajada.estadoHoraTrabajada = "ADEUDADAS";
    horaTrabajada.idproyecto = tarea.idproyecto;

    // Agrego las horas a la tarea y chequeo si tengo horas overbudget.
    tarea.horasTrabajadas = tarea.horasTrabajadas += this.agregarHoras;

    if (tarea.horasTrabajadas > tarea.horasEstimadasTarea) {
      
      tarea.horasOverbudget = tarea.horasTrabajadas - tarea.horasEstimadasTarea;

      this._messagesService.ventanaConfirmar('Horas overbudget', `Las horas estimadas de esta tarea eran '${tarea.horasEstimadasTarea}' y las horas trabajadas que usted va a guardar son '${tarea.horasTrabajadas}' esto creara ${tarea.horasOverbudget} horas overbudget. ¿Esta seguro que desea guardar esta cantidad de horas?`)
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this._tareaService.crearTarea(tarea).then(response => response.subscribe(respuesta => {
            this._messagesService.ventanaExitosa(`Exíto`, `Se guardaron las horas de la tarea '${tarea.descripcionTarea}'`);
            this.tareasEmpleado = [];
            this.getTareasEmpleado();
            
            console.log(horaTrabajada);
            this._horaTrabajadaService.crearHoraTrabajada(horaTrabajada).then(response => response.subscribe(respuesta => {
              console.log(respuesta);
            }));
          }));
        } else {
          this.getTareasEmpleado();
        }
      });
    }
  }
}
