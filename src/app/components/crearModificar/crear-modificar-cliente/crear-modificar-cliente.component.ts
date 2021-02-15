import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../../../models/Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ClientesService } from '../../../services/clientes.service';
import { Localidad } from 'src/app/models/localidad';
import { LocalidadService } from '../../../services/localidad.service';
import { Provincia } from '../../../models/provincia';

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

  provinciaSeleccionada: Provincia = null;
  localidadSeleccionada: Localidad = null;
    
  provincias: Provincia [] = [];
  localidades: Localidad [] = [];

  constructor(
     private _clienteService: ClientesService,
     private _mensagesAlertService: MensagesAlertService,
     private _localidadService: LocalidadService,
     private formBuilder: FormBuilder,
     private storage: StorageMap,
     private location: Location) { }

  ngOnInit(): void {

    this.getProvincias();

    this.formulario = this.formBuilder.group({
      idcliente: [null],
      apellidoCliente: [null, Validators.required],
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
        this.setearLocalidad();
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
      this.miCliente = this.formulario.value;
      this._clienteService.guardarcliente(this.miCliente).then(
        exito => exito.subscribe(respuesta => {
          let mensaje = this.miCliente.idcliente ? 'modificado' : 'creado';
          this._mensagesAlertService.ventanaExitosa(`Cliente ${mensaje}`, `El cliente ${this.miCliente.nombreCliente} ${this.miCliente.apellidoCliente} fue ${mensaje} exitosamente`)
        }),
        error => this._mensagesAlertService.ventanaError('Error', `El cliente ${this.miCliente.nombreCliente} ${this.miCliente.apellidoCliente} no se pudo crear`));
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }

  setearLocalidad() {
    this._localidadService.getLocalidadById(this.miCliente.localidadCliente).then(response => response.subscribe((localidad: Localidad) => {
      this._localidadService.getProvinciaById(localidad.idprovincia).then(response => response.subscribe((provincia: Provincia) => {
        this.provinciaSeleccionada = provincia;
        this.onSelectProvincia(provincia);
        setTimeout(() => {
          this.localidadSeleccionada = localidad;
          this.formulario.controls.localidadCliente.setValue(localidad.idlocalidad);
        }, 1000);
      }));
    }));
  }

  onSelectProvincia(provincia: Provincia) {
    this.localidades = [];
    this._localidadService.getLocalidades(provincia.idprovincia).then(
    response => response.subscribe((localidades: Localidad[]) => localidades.forEach((localidad: Localidad) => this.localidades.push(localidad)), 
    error => this._mensagesAlertService.ventanaError('Error', `No se pudo recuperar la lista de localidades`)));
  }

  onSelectLocalidad(localidad: Localidad) {
    this.formulario.controls.localidadCliente.setValue(localidad.idlocalidad);
  }

  getProvincias() {
    this._localidadService.getProvincias().then(response => response.subscribe((provincias: Provincia[]) => provincias.forEach(provincias => this.provincias.push(provincias)),
    error => this._mensagesAlertService.ventanaError('Error', `No se pudo recuperar la lista de provincias`)));
  }

  volver() {
    this.location.back();
  }

  ngOnDestroy() {
    this.storage.delete('_modificarCliente').subscribe(() => {});
    this.formulario.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
