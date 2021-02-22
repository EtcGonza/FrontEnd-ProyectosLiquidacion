import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Liquidacion } from '../models/Liquidacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiquidacionService {

  constructor(private httpCliente: HttpClient) {}

  async crearLiquidacion(liquidacion: Liquidacion): Promise<Observable<any>> {
    return this.httpCliente.post('Liquidacion', liquidacion);
  }

  async getLiquidacionesEmpleado(idEmpleado: number): Promise<Observable<Liquidacion[]>> {
    return this.httpCliente.get<Liquidacion[]>(`Liquidacion/empleado/${idEmpleado}`);
  }
}
