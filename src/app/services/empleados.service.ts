import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private httpCliente: HttpClient) {}

  async guardarEmpleado(empleado: Empleado): Promise<Observable<any>>{
    if(empleado.Idempleado) {
      return this.httpCliente.put<any>('Empleado', empleado);
    } else {
      return this.httpCliente.post<any>('Empleado', empleado);
    }
  }

   async borrarEmpelado(idEmpleado: number): Promise<Observable<any>>{
    return this.httpCliente.delete<any>(`Empleado/${idEmpleado}`);
  }

   async getEmpleados(): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`Empleado/raul`);
  }  
}
