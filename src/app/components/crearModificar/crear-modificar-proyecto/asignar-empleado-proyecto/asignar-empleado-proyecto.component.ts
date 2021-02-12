import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Empleado } from '../../../../models/empleado';
import { EmpleadosService } from '../../../../services/empleados.service';
import { EmpleadoProyecto } from '../../../../models/EmpleadoProyecto';
import { EmpleadoProyectoService } from '../../../../services/empleado-proyecto.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    this._empleadoServices.getEmpleados().then(response => response.subscribe((empleados: Empleado []) => empleados.forEach((empleado: Empleado) => this.empleados.push(empleado))));
  }

  getEmpleadosProyecto() {
    this._empleadoProyectoServices.getEmpleadosProyecto(this.idProyecto).then(response => response.subscribe((empleados: Empleado[]) => empleados.forEach((empleado: Empleado) => this.empleadosSeleccionados.push(empleado))));
  }

  asignarEmpleados(empleados: Empleado []) {
    this.empleadosProyectos = [];
    this.empleadosSeleccionados = empleados;

    empleados.forEach((empleado: Empleado) => {
      console.log(empleado);
      let empleadoProyecto: EmpleadoProyecto = new EmpleadoProyecto();
      empleadoProyecto.IdEmpleado = empleado.idempleado;
      empleadoProyecto.IdProyecto = this.idProyecto;
      this.empleadosProyectos.push(empleadoProyecto);
    });
  }

  guardarEmpleados() {
    this._empleadoProyectoServices.guardarEmpleadosProyecto(this.empleadosProyectos).then(response => response.subscribe(respuesta => {
      console.log('respuesta',respuesta.error);
    }));
  }

  volver() {
    this.location.back();
  }
}
