import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Empleado } from '../../../../models/empleado';
import { EmpleadosService } from '../../../../services/empleados.service';
import { EmpleadoProyecto } from '../../../../models/EmpleadoProyecto';
import { EmpleadoProyectoService } from '../../../../services/empleado-proyecto.service';
import { Location } from '@angular/common';
import { MensagesAlertService } from '../../../../services/mensages-alert.service';

@Component({
  selector: 'app-asignar-empleado-proyecto',
  templateUrl: './asignar-empleado-proyecto.component.html',
  styleUrls: ['./asignar-empleado-proyecto.component.scss']
})
export class AsignarEmpleadoProyectoComponent implements OnInit {

  empleados: Empleado                  [] = [];
  empleadosSeleccionados: Empleado     [] = [];
  empleadosProyectos: EmpleadoProyecto [] = [];
  @Input() idProyecto: number;

  constructor(
    private _empleadoProyectoServices: EmpleadoProyectoService,
    private _empleadoServices: EmpleadosService,
    private _messagesService: MensagesAlertService,
    private location: Location 
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
    this.getEmpleadosProyecto();
  }

  ngOnChanges(cambios: SimpleChange) {
    if(cambios['idProyecto'] && cambios['idProyecto'] !== null) {
      this.idProyecto = cambios['idProyecto'].currentValue;
    }
  }

  getEmpleados() {
    this._empleadoServices.getEmpleados().then(response => response.subscribe((empleados: Empleado []) => empleados.forEach((empleado: Empleado) => this.empleados.push(empleado)),
    error => this._messagesService.ventanaExitosa('Error', `No se pudo recuperar la lista de empleados.`)));
  }

  getEmpleadosProyecto() {
    this._empleadoProyectoServices.getEmpleadosProyecto(this.idProyecto).then(
      response => response.subscribe((empleados: Empleado[]) => empleados.forEach((empleado: Empleado) => this.empleadosSeleccionados.push(empleado)),
      error => this._messagesService.ventanaExitosa('Error', `No se pudo recuperar la lista de empleados asignados al proyecto.`)));
  }

  asignarEmpleados(empleados: Empleado []) {
    this.empleadosProyectos = [];
    this.empleadosSeleccionados = empleados;

    empleados.forEach((empleado: Empleado) => {
      let empleadoProyecto: EmpleadoProyecto = new EmpleadoProyecto();
      empleadoProyecto.IdEmpleado = empleado.idempleado;
      empleadoProyecto.IdProyecto = this.idProyecto;
      this.empleadosProyectos.push(empleadoProyecto);
    });
  }

  guardarEmpleados() {
    this._empleadoProyectoServices.guardarEmpleadosProyecto(this.empleadosProyectos).then(
      response => response.subscribe(respuesta => this._messagesService.ventanaExitosa('Exito', `Los empleados fueron asignados al proyecto`),
      error => this._messagesService.ventanaExitosa('Error', `No se pudo guardar asignar los empleados al proyecto.`)));
  }

  volver() {
    this.location.back();
  }
}
