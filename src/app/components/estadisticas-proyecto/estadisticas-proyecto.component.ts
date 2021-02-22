import { Component, OnInit } from '@angular/core';
import { MensagesAlertService } from '../../services/mensages-alert.service';
import { PerfilService } from '../../services/perfil.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Proyecto } from 'src/app/models/proyecto';
import { Perfil } from '../../models/Perfil';
import { Location } from '@angular/common';
import { HoraTrabajadaService } from '../../services/hora-trabajada.service';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-estadisticas-proyecto',
  templateUrl: './estadisticas-proyecto.component.html',
  styleUrls: ['./estadisticas-proyecto.component.scss']
})
export class EstadisticasProyectoComponent implements OnInit {

  perfiles: Perfil [] = [];
  miProyecto: Proyecto = null;

  perfilSeleccionado: Perfil = null;

  textoHorasTrabajadas: string = '';
  horasAdeudadas: number = null;
  horasOverbudget: number = null;
  rangoOverbudget: any = null;

  horasPerfiles: Object[] = [];

  constructor(
    private _messageService: MensagesAlertService,
    private _perfilService: PerfilService,
    private _horaTrabajadaService: HoraTrabajadaService,
    private _tareaService: TareaService,
    private storage: StorageMap,
    private location: Location
    ) {}

  ngOnInit(): void {
    this.storage.get('_estadisticasProyecto')
    .subscribe((miProyecto: Proyecto) => {
      if (miProyecto) {
        this.miProyecto = miProyecto;
        this.getPerfiles();
        this.getHorasAdeudadas();
        this.getHorasOverbudget();
      }
      });
  }

  getPerfiles() {
    this._perfilService.getPerfiles().then(response => response.subscribe((perfiles: Perfil[]) => {
      perfiles.forEach((perfil: Perfil) => this.perfiles.push(perfil))
      this.getHorasPerfiles();
    },
    error => this._messageService.ventanaError('Error', 'No se pudo recuperar la lista de perfiles')));
  }

  getHorasAdeudadas() {
    this._horaTrabajadaService.getHorasAdeudadas(this.miProyecto.idproyecto).then(response => response.subscribe((horas: number) => this.horasAdeudadas = horas));
  }

  onSelectPerfil(perfil: Perfil) {
      this.perfilSeleccionado = perfil;
      this._horaTrabajadaService.getHorasTrabajadasProyecto(this.miProyecto.idproyecto, perfil.idperfil).then(response => response.subscribe((horas: number) => this.textoHorasTrabajadas = `'${perfil.nombrePerfil}' ${horas} hora/s`),
      error => this._messageService.ventanaError('Error', 'No se pudo recuperar las horas del perfil'));
  }

  getHorasPerfiles() {
    this.perfiles.forEach((perfil: Perfil) => {
      this._horaTrabajadaService.getHorasTrabajadasProyecto(this.miProyecto.idproyecto, perfil.idperfil).then(response => response.subscribe((horas: number) => {
        let objetoHoras = `${perfil.nombrePerfil}: ${horas} horas trabajadas`;
        this.horasPerfiles.push(objetoHoras);
      }),
      error => this._messageService.ventanaError('Error', 'No se pudo recuperar las horas del perfil'));
    });
  }

  getHorasOverbudget() {
    this._tareaService.getCantidadHorasOverbudget(this.miProyecto.idproyecto).then(response => response.subscribe((horas: number) => this.horasOverbudget = horas));
  }

  volver() {
    this.location.back();
  }
}
