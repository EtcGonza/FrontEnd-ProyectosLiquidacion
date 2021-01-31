import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../../../models/Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-crear-modificar-cliente',
  templateUrl: './crear-modificar-cliente.component.html',
  styleUrls: ['./crear-modificar-cliente.component.scss']
})
export class CrearModificarClienteComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();

  miCliente: Cliente;
  modificandoCliente: boolean;

  tituloCard: string = ``;

  formulario: FormGroup;

  constructor(private _clienteService: ClientesService,
     private _mensagesAlertService: MensagesAlertService,
     private formBuilder: FormBuilder,
     private router: Router,
     private storage: StorageMap,
     private location: Location) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      idCliente: [null],
      nombreCliente: [null, Validators.required],
      telefonoCliente: [null, Validators.required],
      direccionCliente: [null, Validators.required],
      localidadCliente: [null],
      emailCliente: [null, Validators.required],
      proyecto: [null]
    });

    this.storage.get('_modificarCliente')
    .subscribe((miCliente: Cliente) => {
      if (miCliente) {
        this.miCliente = miCliente;
        this.formulario.patchValue(this.miCliente);
      }

      if (this.miCliente) {
        this.tituloCard = `Modificar cliente - ${this.miCliente.nombreCliente}`;
        this.modificandoCliente = true;
        this.formulario.patchValue(this.miCliente);
        this.formulario.controls.nombreCliente.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Modificar cliente - ${nombre}`);
      } else {
        this.tituloCard = `Crear cliente`;
        this.modificandoCliente = false;
        this.formulario.controls.nombreCliente.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Crear cliente - ${nombre}`);
      }
    });
  }

  guardarCliente() {
    if(this.formulario.valid) {
      console.log('formulario valido', this.formulario.value);
      this.miCliente = this.formulario.value;
      this._clienteService.guardarcliente(this.miCliente).then(exito => {
        exito.subscribe(respuesta => {
          this._mensagesAlertService.ventanaExitosa('Cliente creado', 'Ahora puede asignar un proyecto al nuevo cliente');
          console.log(respuesta);
        });
      }).catch(error => {
        console.log('No se pudo guardar', error);
      });
    } else {
      console.log('Form invalido',this.formulario.value);
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }

  ngOnDestroy() {
    console.log('(crearModificarCliente) ngOnDestroy');
    this.storage.delete('_modificarCliente').subscribe(() => {});
    this.formulario.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  volver() {
    this.location.back();
  }
}
