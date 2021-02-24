import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagesAlertService } from '../../../services/mensages-alert.service';
import { Proyecto } from '../../../models/proyecto';
import { ProyectosService } from '../../../services/proyectos.service';
import { Tarea } from '../../../models/Tarea';
import { Location } from '@angular/common';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadosService } from '../../../services/empleados.service';
import { Perfil } from '../../../models/Perfil';
import { PerfilEmpleadoService } from '../../../services/perfil-empleado.service';
import { TareaService } from '../../../services/tarea.service';
import { EmpleadoProyectoService } from '../../../services/empleado-proyecto.service';

@Component({
  selector: 'app-crear-modificar-tareas',
  templateUrl: './crear-modificar-tareas.component.html',
  styleUrls: ['./crear-modificar-tareas.component.scss']
})

export class CrearModificarTareasComponent implements OnInit {

  miProyecto: Proyecto = null;
  miTarea: Tarea = new Tarea();
  tituloCard: string = '';

  formulario: FormGroup;

  tareasProyecto: Tarea [] = [];
  modificarTarea: boolean;

  empleados: Empleado [] = [];
  empleadoSeleccionado: Empleado = null;
  perfilesEmpleado: Perfil [] = [];
  perfilSeleccionado: Perfil = null;

  warningSinEmpleados: boolean = true;

  constructor(
    private _mensagesAlertService: MensagesAlertService,
    private _proyectoServices: ProyectosService,
    private _tareaService: TareaService,
    private _perfilesEmpleadoService: PerfilEmpleadoService,
    private _empleadoService: EmpleadosService,
    private _empleadoProyectoService: EmpleadoProyectoService,
    private formBuilder: FormBuilder,
    private storage: StorageMap,
    private location: Location) {}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      idtarea: [null],
      idproyecto: [null,Validators.required],
      idempleado: [null,Validators.required],
      idperfil: [null,Validators.required],
      descripcionTarea: [null ,Validators.required], 
      horasEstimadasTarea: [null ,Validators.required],
      horasOverbudget: [0],
      horasTrabajadas: [0],
      finalizada: ['false',Validators.required]
    });

    this.storage.get('_proyectoTareas')
    .subscribe((miProyecto: Proyecto) => {
      if (miProyecto) {
        this.miProyecto = miProyecto;
        this.formulario.controls.idproyecto.setValue(this.miProyecto.idproyecto);
        this.tituloCard = `Crear tarea - Proyecto ${miProyecto.nombreProyecto}`;
        this.getTareasProyecto();
        this.getEmpleadosLibres();
      }
    });
  }

  getTareasProyecto() {
    this._proyectoServices.getTareasProyecto(this.miProyecto.idproyecto).then(response => 
      response.subscribe((tareas: Tarea[]) => tareas.forEach((tarea: Tarea) => this.tareasProyecto.push(tarea))));
  }

  getEmpleadosLibres(empleadoSeleccionado?: Empleado) {
    this._empleadoService.getEmpleadosLibresProyecto(this.miProyecto.idproyecto).then(
      response => response.subscribe((empleados: Empleado []) => {
        this.empleados = [];
        if (empleados.length == 0 && this.warningSinEmpleados) {
          this._mensagesAlertService.ventanaWarning('Atención', `Todos los empleados de este proyecto ya tienen tareas asignadas. No podra crear nuevas tareas.`);
          this.warningSinEmpleados = false;
        } else {
          empleados.forEach((empleado: Empleado) => this.empleados.push(empleado));

          if (empleadoSeleccionado) {
            this.empleados.push(empleadoSeleccionado);
          }
        }
      },
      error => this._mensagesAlertService.ventanaExitosa('Error', `No se pudo recuperar la lista de empleados.`)));
  }

  getPerfilesEmpleado(idempleado: number) {
    this._perfilesEmpleadoService.getPerfilesEmpleado(idempleado).then(response => response.subscribe((perfilesEmpleado: Perfil[]) => {
      this.perfilesEmpleado = [];
      perfilesEmpleado.forEach((perfil: Perfil) => this.perfilesEmpleado.push(perfil));
    }, error => {
      this._mensagesAlertService.ventanaError('Error', 'No se pudo recuperar los perfiles del empleado');
    }));
  }

  asignarEmpleados(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.formulario.controls.idempleado.setValue(empleado.idempleado);
    this.getPerfilesEmpleado(this.empleadoSeleccionado.idempleado);
  }

  onSelectPerfil(perfil: Perfil) {
    this.formulario.controls.idperfil.setValue(perfil?.idperfil);
  }

  guardarTarea() {
    if (this.formulario.valid) {
      this.miTarea = this.formulario.value;

      this._tareaService.crearTarea(this.miTarea).then(response => response.subscribe(respuesta => {
        let mensajeTarea = this.modificarTarea ? 'modificada': 'creada';
        this._mensagesAlertService.ventanaExitosa(`Tarea ${mensajeTarea}`, `La tarea '${this.formulario.value.descripcionTarea}' fue ${mensajeTarea} exitosamente`);
        
        this.tareasProyecto = [];
        this.getTareasProyecto();
        this.empleadoSeleccionado = null;
        this.perfilSeleccionado = new Perfil();

        // Una vez guardada la tarea, reseteo el formulario y cambio el contexto de que no estoy modificando.
        this.formulario = this.formBuilder.group({
          idtarea: [null],
          idproyecto: [this.miProyecto.idproyecto, Validators.required],
          idempleado: [null,Validators.required],
          idperfil: [null,Validators.required],
          descripcionTarea: [null ,Validators.required], 
          horasEstimadasTarea: [null ,Validators.required],
          horasOverbudget: [0],
          horasTrabajadas: [0],
          finalizada: ['false',Validators.required]
        });

        this.modificarTarea = false;
        this.tituloCard = `Crear tarea - Proyecto ${this.miProyecto.nombreProyecto}`;
        this.warningSinEmpleados = false;
        this.getEmpleadosLibres();
      }));
    } else {
        this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }

  editarTarea(tarea: Tarea) {
    this.modificarTarea = true;
    this.tituloCard = `Modificar tarea '${tarea.descripcionTarea}' - Proyecto ${this.miProyecto.nombreProyecto}`
    this.formulario.patchValue(tarea);

    this._empleadoService.getEmpleadoById(tarea.idempleado).then(response => response.subscribe((empleado: Empleado) => {
      this.empleadoSeleccionado = empleado;
      this.getEmpleadosLibres(this.empleadoSeleccionado);
      this.getPerfilesEmpleado(this.empleadoSeleccionado.idempleado);
      setTimeout(() => this.perfilSeleccionado = this.perfilesEmpleado.find((perfil: Perfil) => perfil.idperfil === tarea.idperfil), 1500);
    }));
  }

  borrarTarea(tarea: Tarea) {
    this._tareaService.borrarTarea(tarea.idtarea).then(response => response.subscribe(respuesta => {
      this.tareasProyecto = [];
      this.getTareasProyecto();
      this._mensagesAlertService.ventanaExitosa('Exíto', `La tarea ${tarea.descripcionTarea} se elimino`);
    }, error => this._mensagesAlertService.ventanaError('Error', `No se pudo borrar la tarea ${tarea.descripcionTarea}`)));
  }

  volver() {
    this.location.back();
  }
}
