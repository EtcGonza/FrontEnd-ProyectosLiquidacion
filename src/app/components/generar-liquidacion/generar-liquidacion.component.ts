import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { MensagesAlertService } from '../../services/mensages-alert.service';
import { Empleado } from '../../models/empleado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiquidacionService } from '../../services/liquidacion.service';
import { Liquidacion } from '../../models/Liquidacion';
import { Location } from '@angular/common';
import { Perfil } from '../../models/Perfil';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-generar-liquidacion',
  templateUrl: './generar-liquidacion.component.html',
  styleUrls: ['./generar-liquidacion.component.scss']
})
export class GenerarLiquidacionComponent implements OnInit {

  miLiquidacion: Liquidacion = null;
  empleados: Empleado [] = [];
  empleadoSeleccionado: Empleado = null;
  formulario: FormGroup;

  liquidacionNueva: Liquidacion [] = [];
  empleadoLiquidado: Empleado = null;
  perfilEmpleadoLiquidado: Perfil = null;
  mostrarLiquidacion: boolean = false;

  constructor(
    private _empleadoService: EmpleadosService,
    private _mensagesAlertService: MensagesAlertService,
    private _liquidacionService: LiquidacionService,
    private _perfilService: PerfilService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEmpleados();

    this.formulario = this.formBuilder.group({
      codLiquidacion: [null],
      fechaLiquidacion: [null],
      mesLiquidado: [null, Validators.required],
      estado: [null],
      importeLiquidacion: [null],
      idempleado: [null, Validators.required],
      idescalaPerfil: [null],
      idescalaHoras: [null],
      idescalaAntiguedad: [null]
    });

    this.getLiquidacionesEmpleado();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().then(response => response.subscribe((empleados: Empleado []) => empleados.forEach((empleado: Empleado) => this.empleados.push(empleado)), 
    error => this._mensagesAlertService.ventanaError('Error', 'No se pudo recuperar la lista de empleados')));
  }

  onSelectEmpleado(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.formulario.controls.idempleado.setValue(empleado.idempleado);
  }

  onSelectFecha(date: any) {
    this.formulario.controls.mesLiquidado.setValue(date.getMonth());
  }

  generarLiquidacion() {
    if (this.formulario.valid) {
      this.miLiquidacion = this.formulario.value;
      console.log(this.miLiquidacion);
      this._liquidacionService.crearLiquidacion(this.miLiquidacion).then(response => response.subscribe(respuesta => {
        console.log(respuesta);
        this.getLiquidacionesEmpleado();
      }));
    } else {
      this._mensagesAlertService.ventanaError('Formulario inválido', 'Debe seleccionar un empleado y un mes para liquidar');
    }
  }

  getLiquidacionesEmpleado() {
    this._liquidacionService.getLiquidacionesEmpleado(21).then(response => response.subscribe((liquidaciones: Liquidacion[]) => {
      console.log(liquidaciones);
      this.liquidacionNueva.push(liquidaciones[0]);
      this.cargarLiquidacion();
    }));
  }

  cargarLiquidacion() {
    this._empleadoService.getEmpleadoById(this.liquidacionNueva[0].idempleado).then(response => response.subscribe((empleado: Empleado) => {
      this.empleadoLiquidado = empleado;
      this.mostrarLiquidacion = true;
    }));
  }

  volver() {
    this.location.back();
  }
}
