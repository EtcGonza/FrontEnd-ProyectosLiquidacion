import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Cliente } from 'src/app/models/Cliente';
import { Proyecto } from 'src/app/models/proyecto';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { EstadoProyecto } from 'src/app/models/estadoProyecto';
import { ClientesService } from '../../../services/clientes.service';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-crear-modificar-proyecto',
  templateUrl: './crear-modificar-proyecto.component.html',
  styleUrls: ['./crear-modificar-proyecto.component.scss']
})

export class CrearModificarProyectoComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();
  
  clientes: Cliente [] = [];
  clienteSeleccionado: Cliente = new Cliente();

  miProyecto: Proyecto = null;
  modificandoProyecto: boolean;

  formulario: FormGroup;

  estadosProyecto: Object [] = [];
  fechaInicioFormateada: string;
  tituloCard: string = ``;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: StorageMap,
    private _mensagesAlertService: MensagesAlertService,
    private _clienteServices: ClientesService,
    private _proyectoService: ProyectosService
    
  ) {}

  ngOnInit() {
    this.cargarEstadosProyecto();
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
        this.getClienteById();
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
    this._clienteServices.getclientes().then(
    response => response.subscribe((clientes: Cliente []) => clientes.forEach(cliente => this.clientes.push(cliente)),
    error => this._mensagesAlertService.ventanaError('Error', `No se pudo recuperar la lista de clientes`)));
  }

  getClienteById() {
    this._clienteServices.getClienteById(this.miProyecto.idcliente).then(
      response => response.subscribe((cliente: Cliente) => this.clienteSeleccionado = cliente),
      error => this._mensagesAlertService.ventanaError('Error', `No se pudo recuperar el cliente by id`));
  }

  cargarEstadosProyecto() {
    EstadoProyecto.values().forEach(estadoProyecto => this.estadosProyecto.push({label: estadoProyecto, value: estadoProyecto}));
  }

  onChangeCliente(cliente: Cliente) {
    this.formulario.controls.idcliente.setValue(cliente.idcliente);
  }

  guardarProyecto() {
    if(this.formulario.valid) {
      this.miProyecto = this.formulario.value;

      this._proyectoService.guardarProyecto(this.miProyecto).then(
        response => response.subscribe(respuesta => {
          let mensaje = this.miProyecto.idproyecto ? 'modificado' : 'creado';
          this._mensagesAlertService.ventanaExitosa(`Proyecto ${mensaje}`, `El proyecto ${this.miProyecto.nombreProyecto} fue ${mensaje} exitosamente. Ahora puede agregar recursos, asignar tareas y cambiar el estado del mismo`)
          this.router.navigateByUrl('gestionarProyectos', {replaceUrl: false});
        },
        error => this._mensagesAlertService.ventanaError('Error', `No se pudo crear el proyecto ${this.miProyecto.nombreProyecto}`)));
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos son obligatorios');
    }
  }

  volver() {
    this.router.navigateByUrl('gestionarProyectos', {replaceUrl:true});
  }

  ngOnDestroy() {
    this.storage.delete('_modificarProyecto').subscribe(() => {});
    this.formulario.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
