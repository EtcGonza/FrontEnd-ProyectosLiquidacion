import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { MensagesAlertService } from '../../services/mensages-alert.service';
import { Empleado } from '../../models/empleado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiquidacionService } from '../../services/liquidacion.service';
import { Liquidacion } from '../../models/Liquidacion';
import { Location } from '@angular/common';
import { Perfil } from '../../models/Perfil';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generar-liquidacion',
  templateUrl: './generar-liquidacion.component.html',
  styleUrls: ['./generar-liquidacion.component.scss']
})
export class GenerarLiquidacionComponent implements OnInit {

  // TODO ¿No se tendria que mostrar solament los empleados en el dropdown del html?

  miLiquidacion: Liquidacion = null;
  empleados: Empleado [] = [];
  empleadoLiquidar: Empleado = null;
  formulario: FormGroup;

  displayBasic: boolean;

  liquidacionesEmpleado: Liquidacion [] = [];
  perfilEmpleadoLiquidado: Perfil = null;

  empleadoSeleccionado: Empleado = null;

  tituloTablaLiquidaciones: string = 'Buscar liquidaciones';

  liquidacionDialog: Liquidacion = null;
  tituloDialog: string = "";

  constructor(
    private _empleadoService: EmpleadosService,
    private _mensagesAlertService: MensagesAlertService,
    private _liquidacionService: LiquidacionService,
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
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().then(response => response.subscribe((empleados: Empleado []) => empleados.forEach((empleado: Empleado) => this.empleados.push(empleado)), 
    error => this._mensagesAlertService.ventanaError('Error', 'No se pudo recuperar la lista de empleados')));
  }

  onSelectEmpleado(empleado: Empleado) {
    this.empleadoLiquidar = empleado;
    this.formulario.controls.idempleado.setValue(empleado.idempleado);
  }

  onSelectFecha(date: any) {
    this.formulario.controls.mesLiquidado.setValue(date.getMonth() + 1);
  }

  generarLiquidacion() {
    if (this.formulario.valid) {
      this.miLiquidacion = this.formulario.value;
      this._liquidacionService.crearLiquidacion(this.miLiquidacion).then(response => response.subscribe(respuesta => {
        this._mensagesAlertService.ventanaExitosa('Éxito', 'Se creo la liquidación');
        this.empleadoSeleccionado = this.empleadoLiquidar;
        this.getLiquidacionesEmpleado(this.empleadoLiquidar);
      }, error => this._mensagesAlertService.ventanaWarning('Atención', error.error)));
    } else {
      this._mensagesAlertService.ventanaError('Formulario inválido', 'Debe seleccionar un empleado y un mes para liquidar');
    }
  }

  getLiquidacionesEmpleado(empleado: Empleado) {
    this._liquidacionService.getLiquidacionesEmpleado(empleado.idempleado).then(response => response.subscribe((liquidaciones: Liquidacion[]) => {
      this.liquidacionesEmpleado = [];
      this.tituloTablaLiquidaciones = `Liquidaciones del empleado/a ${this.empleadoSeleccionado.apellidoEmpleado} ${this.empleadoSeleccionado.nombreEmpleado}`
      liquidaciones.forEach((liquidacion: Liquidacion) => this.liquidacionesEmpleado.push(liquidacion));
    }));
  }

  cargarLiquidacionesEmpleado(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.tituloTablaLiquidaciones = `Liquidaciones del empleado ${this.empleadoSeleccionado.apellidoEmpleado} ${this.empleadoSeleccionado.nombreEmpleado}`
    this.getLiquidacionesEmpleado(empleado);
  }

  volver() {
    this.location.back();
  }

  mostrarLiquidacion(liquidacion: Liquidacion) {
    this.displayBasic = true;
    this.liquidacionDialog = liquidacion;
    this.tituloDialog = `Liquidación ${this.empleadoSeleccionado.apellidoEmpleado} ${this.empleadoSeleccionado.nombreEmpleado}`
  }

  exportarPdf() {
    // Extraemos el
    const DATA = document.getElementById('toPdf');
    const doc = new jspdf('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }
}
