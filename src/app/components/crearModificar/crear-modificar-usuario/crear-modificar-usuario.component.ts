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
import { LocalidadService } from '../../../services/localidad.service';
import { PerfilService } from '../../../services/perfil.service';

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
  perfiles: Perfil [] = [];

  tituloCard: string = ``;

  constructor(private FormBuilder: FormBuilder, 
    private router: Router, 
    private _mensagesAlertService: MensagesAlertService, 
    private _empleadoService: EmpleadosService,
    private storage: StorageMap,
    private _localidadService: LocalidadService,
    private _perfilServices: PerfilService) {}

  ngOnInit() {
    this.getPerfiles();
    this.getProvincias();

    this.formulario = this.FormBuilder.group({
      Idempleado: [null],
      NombreEmpleado: ['Jorge', Validators.required],
      ApellidoEmpleado: ['Bubusela', Validators.required],
      DniEmpleado: ['58745895', Validators.required],
      Telefono: [null],
      Direccion: [null],
      Usuario: [null, Validators.required],
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
    if(this.formulario.valid) {

      this.miEmpleado = this.formulario.value;
    
      if (!this.modificandoEmpleado) {
        this.miEmpleado.FechaIngresoEmpleado = new Date();
      } 

      console.log(this.miEmpleado);

      this._empleadoService.guardarEmpleado(this.miEmpleado).then(response => response.subscribe(respuesta => {
        console.log(respuesta);
        // this._mensagesAlertService.ventanaExitosa('¡Exito!', `Usuario ${this.miEmpleado.nombreEmpleado} ${this.miEmpleado.apellidoEmpleado} guardado`);
      }));
      
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }

  getPerfiles() {
    this._perfilServices.getPerfiles().then(response => response.subscribe((perfiles: Perfil []) => perfiles.forEach((perfil: Perfil) => {
      console.log('Respuesta perfiles => ',perfil);
      this.perfiles.push(perfil as Perfil)
    })));
  }

  onChangePerfil(perfiles: Perfil[]) {
    this.formulario.controls.PerfilEmpleado.setValue(perfiles);
  }

  onChangeUsuario() {
    let usuarioAux = [];
    this.usuarioEmpleado.Idrol = 6;
    usuarioAux.push(this.usuarioEmpleado);
    this.formulario.controls.Usuario.setValue(usuarioAux);
    console.log(this.formulario.controls.Usuario.value);
  }

  onSelectProvincia(provincia: Provincia) {
    this.localidades = [];

    this._localidadService.getLocalidades(provincia.idprovincia).then(response => response.subscribe((localidades: Localidad[]) => localidades.forEach((localidad: Localidad) => {
      this.localidades.push(localidad)
    })));
  }

  onSelectLocalidad(localidad: Localidad) {
    this.formulario.controls.Localidad.setValue(localidad.idlocalidad);
  }

  getProvincias() {
    this._localidadService.getProvincias().then(response => response.subscribe((provincias: Provincia[]) => provincias.forEach(provincias => this.provincias.push(provincias))))
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
