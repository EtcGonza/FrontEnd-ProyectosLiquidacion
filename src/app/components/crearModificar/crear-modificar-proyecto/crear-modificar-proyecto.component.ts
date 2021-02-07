import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Cliente } from 'src/app/models/Cliente';
import { Proyecto } from 'src/app/models/proyecto';
import { Empleado } from 'src/app/models/empleado';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { EstadoProyecto } from 'src/app/models/estadoProyecto';
import { EmpleadosService } from '../../../services/empleados.service';
import { ClientesService } from '../../../services/clientes.service';
import { EmpleadoProyecto } from '../../../models/EmpleadoProyecto';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-crear-modificar-proyecto',
  templateUrl: './crear-modificar-proyecto.component.html',
  styleUrls: ['./crear-modificar-proyecto.component.scss']
})

export class CrearModificarProyectoComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  clientes: Cliente [] = [];

  miProyecto: Proyecto = null;
  modificandoProyecto: boolean;

  formulario: FormGroup;

  estadosProyecto: Object [] = [];
  empleados: Empleado [] = [];
  empleadosAux: Empleado [] = [];
  fechaInicioFormateada: string;
  tituloCard: string = ``;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: StorageMap,
    private _empleadoServices: EmpleadosService,
    private _mensagesAlertService: MensagesAlertService,
    private _clienteServices: ClientesService,
    private _proyectoService: ProyectosService
     ) {}

  ngOnInit() {
    this.cargarEstadosProyecto();
    this.getEmpleados();
    this.getClientes();

    this.formulario = this.formBuilder.group({
        idproyecto: [null],
        idcliente: [null],
        nombreProyecto: [null ,Validators.required],
        descripcion: [null ,Validators.required],
        estadoProyecto: ['En Proceso',[Validators.required]],
        fechaInicioProyecto: [new Date() ,Validators.required],
        fechaFinProyecto: [null],
        empleadoProyecto: [null],
        tarea: [null]
      });

      this.storage.get('_modificarProyecto')
      .subscribe((miProyecto: Proyecto) => {
        if (miProyecto) {
          this.miProyecto = miProyecto;
          this.formulario.patchValue(this.miProyecto);
        }

        if (this.miProyecto) {
          this.tituloCard = `Modificar proyecto - ${this.miProyecto.nombreProyecto}`;
          this.modificandoProyecto = true;
          this.fechaInicioFormateada = new Date(this.miProyecto.fechaInicioProyecto).toLocaleDateString();
          this.formulario.patchValue(this.miProyecto);
          this.formulario.controls.nombreProyecto.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Modificar proyecto - ${nombre}`);
        } else {
          this.tituloCard = `Crear proyecto`;
          this.modificandoProyecto = false;
          this.formulario.controls.nombreProyecto.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Crear proyecto - ${nombre}`);
        }
      });
  }

  getClientes() {
    this._clienteServices.getclientes().then(response => response.subscribe((clientes: Cliente []) => clientes.forEach(cliente => this.clientes.push(cliente)),
    error => console.log('Error (getClientes)', error)));
  }

  getEmpleados() {
    this._empleadoServices.getEmpleados().then(response => response.subscribe((empleados: Empleado []) => empleados.forEach((empleado: Empleado) => this.empleados.push(empleado))));
  }

  cargarEstadosProyecto() {
    EstadoProyecto.values().forEach(estadoProyecto => this.estadosProyecto.push({label: estadoProyecto, value: estadoProyecto}));
  }

  asignarEmpleados(empleados: Empleado []) {
    let empleadosProyecto: EmpleadoProyecto[] = [];

    empleados.forEach((empleado: Empleado) => {
      let empleadoProyecto: EmpleadoProyecto = new EmpleadoProyecto();
      empleadoProyecto.IdEmpleado = empleado.idempleado;
      empleadosProyecto.push(empleadoProyecto);
    });

    console.log(empleadosProyecto);

    this.formulario.controls.EmpleadoProyecto.setValue(empleadosProyecto);
  }

  onChangeCliente(idCliente: number) {
    this.formulario.controls.Idcliente.setValue(idCliente);
  }

  guardarProyecto() {
    if(this.formulario.valid) {
      this.miProyecto = this.formulario.value;
      console.log('this.miProyecto ',this.miProyecto);

      this._proyectoService.guardarProyecto(this.miProyecto).then(response => response.subscribe(respuesta => {
        console.log(respuesta);
        // this._mensagesAlertService.ventanaExitosa('Proyecto creado', 'Ahora puede agregar recursos, asignar tareas y cambiar el estado del mismo');
      }));
    } else {
      console.log('Form invalido',this.formulario.value);
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos son obligatorios');
    }
  }

  volver() {
    this.router.navigateByUrl('gestionarProyectos', {replaceUrl:true});
  }

  ngOnDestroy() {
    console.log('(crearModificarProyecto) ngOnDestroy');
    this.storage.delete('_modificarProyecto').subscribe(() => {});
    this.formulario.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
