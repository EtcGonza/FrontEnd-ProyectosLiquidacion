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
import { EmpleadosService } from '../../../services/empleados.service';

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

  provinciaSeleccionada: Provincia;
  provincias: Provincia [] = [];
  localidades: Localidad [] = [];

  localidadSelected: Localidad = new Localidad();;
  perfiles: Perfil[] = [];

  tituloCard: string = ``;

  constructor(private FormBuilder: FormBuilder, 
    private router: Router, 
    private _mensagesAlertService: MensagesAlertService, 
    private _empleadoService: EmpleadosService,
    private storage: StorageMap) {}

  ngOnInit() {
    this.auxPerfiles();
    this.auxLocalidades();

    this.formulario = this.FormBuilder.group({
      Idempleado: [null],
      NombreEmpleado: ['Gonzalo', Validators.required],
      ApellidoEmpleado: ['Etchegaray', Validators.required],
      DniEmpleado: ['39662738', Validators.required],
      Telefono: [null],
      Direccion: [null],
      Usuario: ['EtcGonza', Validators.required],
      Localidad: [null, Validators.required],
      FechaIngresoEmpleado: [null],
      EmpleadoProyecto: [null],
      Liquidacion: [null],
      PerfilEmpleado: [null]
    });

    this.storage.get('_modificarEmpleado')
    .subscribe((miEmpleado: Empleado) => {
      if (miEmpleado) {
        this.miEmpleado = miEmpleado;
        this.formulario.patchValue(this.miEmpleado);
      }

      if (this.miEmpleado) {
        this.modificandoEmpleado = true;
        this.tituloCard = `Modificar usuario - ${this.miEmpleado.NombreEmpleado} ${this.miEmpleado.ApellidoEmpleado}`;
        this.formulario.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((formulario: any) => this.tituloCard = `Modificar usuario - ${formulario.NombreEmpleado} ${formulario.ApellidoEmpleado}`);
      } else {
        this.tituloCard = `Crear usuario`;
        this.modificandoEmpleado = false;
        this.formulario.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((formulario: any) => this.tituloCard = `Crear usuario - ${formulario.NombreEmpleado} ${formulario.ApellidoEmpleado}`);
      }
    });
  }

  guardarUsuario() {
    console.log('formulario0', this.formulario.value);
    if(this.formulario.valid) {

      
      // let miEmpleadoAux: Object = this.miEmpleado;
      this.miEmpleado = this.formulario.value;
      // miEmpleadoAux.Usuario = this.usuarioEmpleado;
      // miEmpleadoAux.Localidad = 565468351;
      // miEmpleadoAux.FechaIngresoEmpleado = Date();
      
      this._empleadoService.guardarEmpleado(this.miEmpleado).then(response => response.subscribe(respuesta => {
        console.log(respuesta);
      }));
      
      // this._mensagesAlertService.ventanaExitosa('¡Exito!', `Usuario ${this.miEmpleado.nombreEmpleado} ${this.miEmpleado.apellidoEmpleado} guardado`);
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

  // auxLocalidades() {
  //   let provincia = new Provincia();
  //   provincia.Descripcion = "Santa fe";
  //   provincia.Idprovincia = 0;

  //   let localidad = new Localidad();
  //   localidad.Descripcion = "Rosario";
  //   localidad.idLocalidad = 1;

  //   let provincia2 = new Provincia();
  //   provincia2.Descripcion = "Zarasa";
  //   provincia2.Idprovincia = 0;

  //   let localidad2 = new Localidad();
  //   localidad2.Descripcion = "jORGE";
  //   localidad2.idLocalidad = 1;

  //   this.provincias.push(provincia);
  //   this.provincias.push(provincia2);

  //   this.localidades.push(localidad);
  //   this.localidades.push(localidad2);
  // }

  auxLocalidades() {}
  
  onChangePerfil(perfiles: Perfil[]) {
    this.formulario.controls.PerfilEmpleado.setValue(perfiles);
  }

  onChangeUsuario() {
    this.formulario.controls.usuario.setValue(this.usuarioEmpleado);
  }

  onSelectProvincia(provincia: Provincia) {
    // provincia.Localidad.forEach((localidad: Localidad) => this.localidades.push(localidad));
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
