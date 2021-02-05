import { Component, OnDestroy, OnInit } from '@angular/core';
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

  estadosProyecto: Object [];
  empleados: Empleado [] = [];
  fechaInicioFormateada: string;
  tituloCard: string = ``;

  constructor(private _mensagesAlertService: MensagesAlertService, private formBuilder: FormBuilder, private router: Router, private storage: StorageMap) {}

  ngOnInit() {
    this.cargarEstadosProyecto();
    this.auxEmpleados();
    this.auxClientes();

    this.formulario = this.formBuilder.group({
        Idproyecto: [null],
        Idcliente: [null],
        cliente: [null, Validators.required],
        NombreProyecto: [null ,Validators.required],
        Descripcion: [null ,Validators.required],
        EstadoProyecto: ['En Proceso',[Validators.required]],
        FechaInicioProyecto: [new Date() ,Validators.required],
        FechaFinProyecto: [null],
        EmpleadoProyecto: [null],
        Tarea: [null]
      });

      this.storage.get('_modificarProyecto')
      .subscribe((miProyecto: Proyecto) => {
        if (miProyecto) {
          this.miProyecto = miProyecto;
          this.formulario.patchValue(this.miProyecto);
        }

        if (this.miProyecto) {
          this.tituloCard = `Modificar proyecto - ${this.miProyecto.NombreProyecto}`;
          this.modificandoProyecto = true;
          this.fechaInicioFormateada = new Date(this.miProyecto.FechaInicioProyecto).toLocaleDateString();
          this.formulario.patchValue(this.miProyecto);
          this.formulario.controls.NombreProyecto.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Modificar proyecto - ${nombre}`);
        } else {
          this.tituloCard = `Crear proyecto`;
          this.modificandoProyecto = false;
          this.formulario.controls.NombreProyecto.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Crear proyecto - ${nombre}`);
        }
      });
  }

  auxClientes() {
    let cliente = new Cliente();
    cliente.nombreCliente = 'Disney';
    this.clientes.push(cliente);

    let cliente2 = new Cliente();
    cliente2.nombreCliente = 'McDonalds';
    this.clientes.push(cliente2);
  }

  auxEmpleados() {
    let estefania: Empleado = new Empleado();
    estefania.NombreEmpleado = "Estefania";
    estefania.ApellidoEmpleado = "Gorosito";
    this.empleados.push(estefania);

    let martin: Empleado = new Empleado();
    martin.NombreEmpleado = "Martin";
    martin.ApellidoEmpleado = "Moreno";
    this.empleados.push(martin);

    let mariano: Empleado = new Empleado();
    mariano.NombreEmpleado = "Mariano";
    mariano.ApellidoEmpleado = "Durand";
    this.empleados.push(mariano);

    let gonzalo: Empleado = new Empleado();
    gonzalo.NombreEmpleado = "Gonzalo";
    gonzalo.ApellidoEmpleado = "Etchegaray";
    this.empleados.push(gonzalo);
  }

  cargarEstadosProyecto() {
    let auxEstados = [];

    EstadoProyecto.values().forEach(estadoProyecto => {
      auxEstados.push({label: estadoProyecto, value: estadoProyecto});
      this.estadosProyecto = auxEstados;
    });
  }

  asignarEmpleados(algo: any) {
    // this.formulario.controls.EmpleadoProyecto.setValue(algo);
  }

  guardarProyecto() {
    if(this.formulario.valid) {
      console.log('formulario valido', this.formulario.value);
      this.miProyecto = this.formulario.value;
      this._mensagesAlertService.ventanaExitosa('Proyecto creado', 'Ahora puede agregar recursos, asignar tareas y cambiar el estado del mismo');
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
