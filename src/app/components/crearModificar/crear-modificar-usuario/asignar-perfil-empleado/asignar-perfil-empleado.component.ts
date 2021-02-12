import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Location } from '@angular/common';
import { PerfilService } from '../../../../services/perfil.service';
import { MensagesAlertService } from '../../../../services/mensages-alert.service';
import { Perfil } from '../../../../models/Perfil';
import { PerfilEmpleado } from '../../../../models/PerfilEmpleado';
import { PerfilEmpleadoService } from '../../../../services/perfil-empleado.service';

@Component({
  selector: 'app-asignar-perfil-empleado',
  templateUrl: './asignar-perfil-empleado.component.html',
  styleUrls: ['./asignar-perfil-empleado.component.scss']
})
export class AsignarPerfilEmpleadoComponent implements OnInit {

  @Input() idEmpleado: number;

  perfiles: Perfil [] = [];
  perfilesEmpleado: PerfilEmpleado[] = [];
  perfilesSeleccionados: Perfil [] = [];

  constructor(
    private _mensagesAlertService: MensagesAlertService,
    private _perfilServices: PerfilService,
    private _perfilesEmpleadoService: PerfilEmpleadoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPerfiles();
    this.getPerfilesEmpleado();
  }

  ngOnChanges(cambios: SimpleChange) {
    if(cambios['idEmpleado'] && cambios['idEmpleado'] !== null) {
      this.idEmpleado = cambios['idEmpleado'].currentValue;
    }
  }

  getPerfiles() {
    this._perfilServices.getPerfiles().then(response => response.subscribe((perfiles: Perfil []) => {
      perfiles.forEach((perfil: Perfil) => this.perfiles.push(perfil))
    }, error => {
      this._mensagesAlertService.ventanaError('Error', 'No se pudo recuperar la lista de perfiles');
    }));
  }

  getPerfilesEmpleado() {
    this._perfilesEmpleadoService.getPerfilesEmpleado(this.idEmpleado).then(response => response.subscribe((perfilesEmpleado: Perfil[]) => {
      perfilesEmpleado.forEach((perfil: Perfil) => this.perfilesSeleccionados.push(perfil));
    }, error => {
      this._mensagesAlertService.ventanaError('Error', 'No se pudo recuperar los perfiles del empleado');
    }));
  }

  onChangePerfil(perfiles: Perfil[]) {
    this.perfilesEmpleado = [];

    perfiles.forEach((perfil: Perfil) => {
      let nuevoperfilEmpleado: PerfilEmpleado = new PerfilEmpleado ();
      nuevoperfilEmpleado.Idperfil = perfil.idperfil;
      nuevoperfilEmpleado.Idempleado = this.idEmpleado;
      this.perfilesEmpleado.push(nuevoperfilEmpleado);
    });
  }

  guardarPerfiles() {
    this._perfilesEmpleadoService.guardarPerfilesEmpleado(this.perfilesEmpleado).then(response => response.subscribe(respuesta => {
      this._mensagesAlertService.ventanaExitosa('Perfil/es guardados', 'Los perfiles del empleado fueron guardados correctamente');
    }, error => {
      this._mensagesAlertService.ventanaExitosa('Error al guardar', 'Observar consola');
      console.log(error);
    }));
  }

  volver() {
    this.location.back();
  }
}
