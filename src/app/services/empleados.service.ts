import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private httpCliente: HttpClient) {}

  async guardarEmpleado(empleado: Empleado): Promise<Observable<string>>{
    if(empleado.idempleado) {
      return this.httpCliente.put<string>('Empleado', empleado);
    } else {
      return this.httpCliente.post<string>('Empleado', empleado);
    }
  }

   async borrarEmpelado(idEmpleado: number): Promise<Observable<string>>{
    return this.httpCliente.delete<string>(`Empleado/${idEmpleado}`);
  }

   async getEmpleados(): Promise<Observable<Empleado []>> {
    return this.httpCliente.get<Empleado []>(`Empleado`);
  }

  async getEmpleadoById(idEmpleado: number): Promise<Observable<Empleado>> {
    return this.httpCliente.get<Empleado>(`Empleado/empleado/${idEmpleado}`);
  }
}
