import { Component, OnInit, OnDestroy } from '@angular/core';
import { Provincia } from '../../models/provincia';
import { Localidad } from '../../models/localidad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MensagesAlertService } from '../../services/mensages-alert.service';

@Component({
  selector: 'app-crear-modificar-usuario',
  templateUrl: './crear-modificar-usuario.component.html',
  styleUrls: ['./crear-modificar-usuario.component.scss']
})
export class CrearModificarUsuarioComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();

  miEmpleado: Empleado = null;
  modificandoEmpleado: boolean;
  fechaDeIngresoFormateada: Date;
  formulario: FormGroup;
  provincias: Provincia [] = [];
  localidades: Localidad [] = [];

  localidadSelected: Localidad;

  tituloCard: string = ``;

  constructor(private FormBuilder: FormBuilder, private router: Router, private _mensagesAlertService: MensagesAlertService) {}

  ngOnInit() {
    this.localidadSelected = new Localidad();
    this.localidadSelected.provincia = new Provincia();

    this.formulario = this.FormBuilder.group({
      id: [null],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      dni: [null, Validators.required],
      telefono: [null, Validators.required],
      direccion: [null, Validators.required],
      usuario: [null, Validators.required],
      localidad: [null, Validators.required],
      fechaIngreso: [null]
    });

    let provincia = new Provincia();
    provincia.descripcion = "Santa fe";
    provincia.id = 0;

    let localidad = new Localidad();
    localidad.descripcion = "Rosario";
    localidad.id = 1;

    let provincia2 = new Provincia();
    provincia2.descripcion = "Zarasa";
    provincia2.id = 0;

    let localidad2 = new Localidad();
    localidad2.descripcion = "jORGE";
    localidad2.id = 1;

    this.provincias.push(provincia);
    this.provincias.push(provincia2);

    this.localidades.push(localidad);
    this.localidades.push(localidad2);

    if (this.miEmpleado) {
      this.modificandoEmpleado = true;
      this.tituloCard = `Modificar usuario`;
      // this.formulario.controls.nombre.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Modificar usuario - ${nombre}`);
    } else {
      this.tituloCard = `Crear usuario`;
      // this.formulario.controls.nombre.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((nombre: string) => this.tituloCard = `Crear usuario - ${nombre}`);
    }
  }

  onChangeLocalidad(localidad: Localidad) {
    let aux: Provincia = this.localidadSelected.provincia;
    this.localidadSelected = localidad;
    this.localidadSelected.provincia = aux;
    this.formulario.controls.localidad.setValue(this.localidadSelected);
    console.log(this.formulario.controls.localidad.value);
  }

  guardarUsuario(){
    if(this.formulario.valid) {
      console.log('formulario valido', this.formulario.value);
      this._mensagesAlertService.ventanaError('Credenciales invalidas', 'Usuario y/o contraseña incorrectos');
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con * son obligatorios');
    }
  }

  volver() {
    this.router.navigateByUrl('gestionarUsuarios', {replaceUrl: false});
  }

  ngOnDestroy() {
    console.log('(crearModificarUsuarios) ngOnDestroy');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
