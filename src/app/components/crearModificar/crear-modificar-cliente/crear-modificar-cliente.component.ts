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
  
  provincias: Provincia [] = [];
  localidades: Localidad [] = [];

  constructor(private _clienteService: ClientesService,
     private _mensagesAlertService: MensagesAlertService,
     private _localidadService: LocalidadService,
     private formBuilder: FormBuilder,
     private router: Router,
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
        console.log('Cargo micliente', miCliente);
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
      this.miCliente = this.formulario.value;
    console.log(this.miCliente);
      this._clienteService.guardarcliente(this.miCliente).then(exito => {
        exito.subscribe(respuesta => {
          this._mensagesAlertService.ventanaExitosa('Cliente creado', 'Ahora puede asignar un proyecto al nuevo cliente');
          console.log(respuesta);
        });
      }).catch(error => {
        console.log('No se pudo guardar', error);
      });
    } else {
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

  onSelectProvincia(provincia: Provincia) {
    this.localidades = [];
    
    this._localidadService.getLocalidades(provincia.idprovincia).then(response => response.subscribe((localidades: Localidad[]) => localidades.forEach((localidad: Localidad) => {
      this.localidades.push(localidad)
    })));
  }

  onSelectLocalidad(localidad: Localidad) {
    this.formulario.controls.localidadCliente.setValue(localidad.idlocalidad);
  }

  getProvincias() {
    this._localidadService.getProvincias().then(response => response.subscribe((provincias: Provincia[]) => provincias.forEach(provincias => this.provincias.push(provincias))))
  }
}
