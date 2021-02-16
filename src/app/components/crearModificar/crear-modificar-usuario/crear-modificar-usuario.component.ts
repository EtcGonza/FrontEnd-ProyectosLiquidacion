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
import { LocalidadService } from '../../../services/localidad.service';
import { EmpleadosService } from '../../../services/empleados.service';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol';
import { UsuarioService } from '../../../services/usuario.service';

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
  mostrarCardPerfiles: boolean;
  fechaDeIngresoFormateada: Date;
  formulario: FormGroup;

  provinciaSeleccionada: Provincia = null;
  localidadSeleccionada: Localidad = null;
  
  provincias: Provincia [] = [];
  localidades: Localidad [] = [];

  localidadSelected: Localidad = new Localidad();
  perfiles: Perfil [] = [];

  roles: Rol [] = [];
  rolTag: string = '';

  tituloCard: string = '';

  constructor(
    private FormBuilder: FormBuilder, 
    private router: Router, 
    private storage: StorageMap,
    private _rolService: RolService,
    private _usuarioService: UsuarioService,
    private _mensagesAlertService: MensagesAlertService, 
    private _empleadoService: EmpleadosService,
    private _localidadService: LocalidadService) {}

  ngOnInit() {
    this.getRoles();
    this.getProvincias();

    this.formulario = this.FormBuilder.group({
      idempleado: [null],
      nombreEmpleado: ['', Validators.required],
      apellidoEmpleado: ['', Validators.required],
      dniEmpleado: [null, Validators.required],
      telefono: [null],
      direccion: [null],
      usuario: [null, Validators.required],
      localidad: [null, Validators.required],
      fechaIngresoEmpleado: [null],
      empleadoProyecto: [null],
      liquidacion: [null],
      perfilEmpleado: [null]
    });

    this.storage.get('_modificarEmpleado')
    .subscribe((miEmpleado: Empleado) => {
      if (miEmpleado) {
        this.modificandoEmpleado = true;
        this.miEmpleado = miEmpleado;
        this.getUsuario();

        this.formulario.patchValue(this.miEmpleado);
        this.formulario.controls.usuario.clearValidators();
        this.formulario.controls.usuario.updateValueAndValidity();

        this.setearLocalidad();
        this.setearTag();
      }

      if (this.miEmpleado) {
        this.tituloCard = `Modificar usuario - ${this.miEmpleado.nombreEmpleado} ${this.miEmpleado.apellidoEmpleado}`;
        this.formulario.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((formulario: any) => this.tituloCard = `Modificar usuario - ${formulario.nombreEmpleado} ${formulario.apellidoEmpleado}`);
      } else {
        this.tituloCard = `Crear usuario`;
        this.modificandoEmpleado = false;
        this.formulario.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((formulario: any) => this.tituloCard = `Crear usuario - ${formulario.nombreEmpleado} ${formulario.apellidoEmpleado}`);
      }
    });
  }

  guardarUsuario() {
    if(this.formulario.valid) {
      this.miEmpleado = this.formulario.value;
    
      if (!this.modificandoEmpleado) {
        this.miEmpleado.fechaIngresoEmpleado = new Date();
      }

      this._empleadoService.guardarEmpleado(this.miEmpleado).then(
        response => response.subscribe(respuesta => {
          let mensaje = this.miEmpleado.idempleado ? 'modificado' : 'creado';
          this._mensagesAlertService.ventanaExitosa(`Usuario ${mensaje}`, `El usuario ${this.miEmpleado.nombreEmpleado} ${this.miEmpleado.apellidoEmpleado} fue ${mensaje} exitosamente`);
        }, 
        error => this._mensagesAlertService.ventanaError('Error', `El usuario ${this.miEmpleado.nombreEmpleado} ${this.miEmpleado.apellidoEmpleado} no pudo guardarse.`)));
      
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }

  getUsuario() {
    this._usuarioService.getUsuarioById(this.miEmpleado.idempleado).then(response => response.subscribe((usuario: Usuario) => {
      this.miEmpleado.usuario.push(usuario);
      this.comprobarIdRol();
    }));
  }

  setearLocalidad() {
    this._localidadService.getLocalidadById(this.miEmpleado.localidad).then(response => response.subscribe((localidad: Localidad) => {
      this._localidadService.getProvinciaById(localidad.idprovincia).then(response => response.subscribe((provincia: Provincia) => {
        this.provinciaSeleccionada = provincia;
        this.onSelectProvincia(provincia);
        setTimeout(() => {
          this.localidadSeleccionada = localidad;
          this.formulario.controls.localidad.setValue(localidad.idlocalidad);
        }, 1000);
      }));
    }));
  }

  onChangeUsuario() {
    let usuarioAux = [];
    this.usuarioEmpleado.idrol = 6;
    usuarioAux.push(this.usuarioEmpleado);
    this.formulario.controls.usuario.setValue(usuarioAux);
  }

  onSelectProvincia(provincia: Provincia) {
    this.localidades = [];
    this._localidadService.getLocalidades(provincia.idprovincia).then(
      response => response.subscribe((localidades: Localidad[]) => localidades.forEach((localidad: Localidad) => this.localidades.push(localidad)), 
      error => this._mensagesAlertService.ventanaError('Error', 'No pudo recuperarse la lista de localidades')));
  }

  onSelectLocalidad(localidad: Localidad) {
    this.formulario.controls.localidad.setValue(localidad.idlocalidad);
  }

  getProvincias() {
    this._localidadService.getProvincias().then(
    response => response.subscribe((provincias: Provincia[]) => provincias.forEach(provincias => this.provincias.push(provincias)), 
    error => this._mensagesAlertService.ventanaError('Error', 'No pudo recuperarse la lista de provincias')));
  }

  getRoles() {
    this._rolService.getRoles().then(response => response.subscribe((roles: Rol[]) => roles.forEach((rol: Rol) => this.roles.push(rol))));
  }

  onSelectRol(rol: Rol) {
    this.usuarioEmpleado.idrol = rol.idrol;
  }

  comprobarIdRol() {
    this.miEmpleado.usuario[0].idrol !== 6 ? this.mostrarCardPerfiles = false : this.mostrarCardPerfiles = true;
  }

  setearTag() {
    setTimeout(() => {
      const rolEmpleado = this.roles.find((rol: Rol) => rol.idrol == this.miEmpleado.usuario[0].idrol);
      this.rolTag = rolEmpleado.descripcionRol;
    }, 1500);
  }

  volver() {
    this.router.navigateByUrl('gestionarUsuarios', {replaceUrl: false});
  }

  ngOnDestroy() {
    this.storage.delete('_modificarEmpleado').subscribe(() => {});
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
