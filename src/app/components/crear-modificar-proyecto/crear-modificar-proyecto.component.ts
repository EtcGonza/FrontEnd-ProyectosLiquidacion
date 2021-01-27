import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagesAlertService } from '../../services/mensages-alert.service';
import { Router } from '@angular/router';
import { Proyecto } from '../../models/proyecto';
import { Cliente } from '../../models/Cliente';
import { EstadoProyecto } from '../../models/estadoProyecto';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  fechaInicioFormateada: string;
  tituloCard: string = ``;

  constructor(private _mensagesAlertService: MensagesAlertService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
        idProyecto: [null],
        idCliente: [null],
        cliente: [null, Validators.required],
        nombre: [null ,Validators.required],
        descripcion: [null ,Validators.required],
        estado: ['En Proceso',[Validators.required]],
        fechaInicio: [new Date() ,Validators.required],
        fechaFin: [null]
      });
      
      let auxEstados = [];

      EstadoProyecto.values().forEach(estadoProyecto => {
        auxEstados.push({label: estadoProyecto, value: estadoProyecto});
        this.estadosProyecto = auxEstados;
      });
  
      // this.miProyecto = await this.storage.get('_modificarProyecto') || null;
      this.formulario.controls.estado.disable();
  
      let cliente = new Cliente();
      cliente.nombre = 'Disney';
      this.clientes.push(cliente);
      
      if (this.miProyecto) {
        console.log('Modifico proyecto');
        this.modificandoProyecto = true;
        this.formulario.controls.estado.enable();
        this.fechaInicioFormateada = new Date(this.miProyecto.fechaInicio).toLocaleDateString();
        this.formulario.patchValue(this.miProyecto);
        this.formulario.controls.nombre.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Modificar proyecto - ${nombre}`);
      } else {
        this.modificandoProyecto = false;
        this.tituloCard = `Crear proyecto`;
        this.formulario.controls.nombre.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Crear proyecto - ${nombre}`);
      }
  }

  guardarProyecto() {
    console.log(this.formulario.value);
    if(this.formulario.valid) {
      console.log('formulario valido', this.formulario.value);
      this._mensagesAlertService.ventanaExitosa('Proyecto creado', 'Ahora puede agregar recursos, asignar tareas y cambiar el estado del mismo');
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos son obligatorios');
    }
  }

  volver() {
    this.router.navigateByUrl('gestionarProyectos', {replaceUrl:true});
  }

  ngOnDestroy() {
    console.log('(crearModificarProyecto) ngOnDestroy');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
