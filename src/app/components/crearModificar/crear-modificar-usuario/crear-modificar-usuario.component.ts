import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { takeUntil } from 'rxjs/operators';
import { Empleado } from 'src/app/models/empleado';
import { Usuario } from 'src/app/models/usuario';
import { Provincia } from 'src/app/models/provincia';
import { Localidad } from 'src/app/models/localidad';
import { Perfil } from 'src/app/models/Perfil';
import { MensagesAlertService } from 'src/app/services/mensages-alert.service';

@Component({
  selector: 'app-crear-modificar-usuario',
  templateUrl: './crear-modificar-usuario.component.html',
  styleUrls: ['./crear-modificar-usuario.component.scss']
})
export class CrearModificarUsuarioComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();

  miEmpleado: Empleado = null;
  usuarioEmpleado: Usuario = new Usuario();

  modificandoEmpleado: boolean;
  fechaDeIngresoFormateada: Date;
  formulario: FormGroup;
  provincias: Provincia [] = [];
  localidades: Localidad [] = [];

  localidadSelected: Localidad = new Localidad();;
  perfiles: Perfil[] = [];

  tituloCard: string = ``;

  constructor(private FormBuilder: FormBuilder, private router: Router, private _mensagesAlertService: MensagesAlertService, private storage: StorageMap) {}

  ngOnInit() {
    this.auxPerfiles();
    this.auxLocalidades();

    this.formulario = this.FormBuilder.group({
      idEmpleado: [null],
      nombreEmpleado: ['', Validators.required],
      apellidoEmpleado: ['', Validators.required],
      dniEmpleado: [null, Validators.required],
      telefono: [null],
      direccion: [null],
      usuario: [null, Validators.required],
      localidad: [null],
      fechaIngreso: [null],
      empleadoProyecto: [null],
      liquidacion: [null],
      perfilEmpleado: [null]
    });

    this.storage.get('_modificarEmpleado')
    .subscribe((miEmpleado: Empleado) => {
      if (miEmpleado) {
        this.miEmpleado = miEmpleado;
        this.formulario.patchValue(this.miEmpleado);
      }

      if (this.miEmpleado) {
        this.modificandoEmpleado = true;
        this.tituloCard = `Modificar usuario - ${this.miEmpleado.nombreEmpleado} ${this.miEmpleado.apellidoEmpleado}`;
        this.formulario.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((formulario: any) => this.tituloCard = `Modificar usuario - ${formulario.nombreEmpleado} ${formulario.apellidoEmpleado}`);
      } else {
        this.tituloCard = `Crear usuario`;
        this.modificandoEmpleado = false;
        this.formulario.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((formulario: any) => this.tituloCard = `Crear usuario - ${formulario.nombreEmpleado} ${formulario.apellidoEmpleado}`);
      }
    });
  }

  onChangeLocalidad(localidad: Localidad) {
    // let aux: Provincia = this.localidadSelected.provincia;
    // this.localidadSelected = localidad;
    // this.localidadSelected.provincia = aux;
    // this.formulario.controls.localidad.setValue(this.localidadSelected);
    // console.log(this.formulario.controls.localidad.value);
  }

  guardarUsuario() {
    console.log('formulario0', this.formulario.value);
    if(this.formulario.valid) {
      this.miEmpleado = this.formulario.value;
        this._mensagesAlertService.ventanaExitosa('¡Exito!', `Usuario ${this.miEmpleado.nombreEmpleado} ${this.miEmpleado.apellidoEmpleado} guardado`);
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }

  auxPerfiles() {
    let auxPerfil1: Perfil = new Perfil();
    auxPerfil1.Idperfil = 0;
    auxPerfil1.NombrePerfil = "Tester";

    let auxPerfil2: Perfil = new Perfil();
    auxPerfil2.Idperfil = 0;
    auxPerfil2.NombrePerfil = "Analista";

    let auxPerfil3: Perfil = new Perfil();
    auxPerfil3.Idperfil = 0;
    auxPerfil3.NombrePerfil = "Desarrollador";

    let auxPerfil4: Perfil = new Perfil();
    auxPerfil4.Idperfil = 0;
    auxPerfil4.NombrePerfil = "Implementador";

    let auxPerfil5: Perfil = new Perfil();
    auxPerfil5.Idperfil = 0;
    auxPerfil5.NombrePerfil = "Supervisor";

    this.perfiles.push(auxPerfil1);
    this.perfiles.push(auxPerfil2);
    this.perfiles.push(auxPerfil3);
    this.perfiles.push(auxPerfil4);
    this.perfiles.push(auxPerfil5);
  }

  auxLocalidades() {
    let provincia = new Provincia();
    provincia.Descripcion = "Santa fe";
    provincia.Idprovincia = 0;

    let localidad = new Localidad();
    localidad.Descripcion = "Rosario";
    localidad.idLocalidad = 1;

    let provincia2 = new Provincia();
    provincia2.Descripcion = "Zarasa";
    provincia2.Idprovincia = 0;

    let localidad2 = new Localidad();
    localidad2.Descripcion = "jORGE";
    localidad2.idLocalidad = 1;

    this.provincias.push(provincia);
    this.provincias.push(provincia2);

    this.localidades.push(localidad);
    this.localidades.push(localidad2);
  }

  onChangePerfil(perfiles: Perfil[]) {
    this.formulario.controls.perfilEmpleado.setValue(perfiles);
  }

  onChangeUsuario() {
    this.formulario.controls.usuario.setValue(this.usuarioEmpleado);
  }

  volver() {
    this.router.navigateByUrl('gestionarUsuarios', {replaceUrl: false});
  }

  ngOnDestroy() {
    console.log('(crearModificarUsuarios) ngOnDestroy');
    this.storage.delete('_modificarEmpleado').subscribe(() => {});
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
