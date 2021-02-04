import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private httpCliente: HttpClient, private tokenService: TokenService) {}

  async guardarEmpleado(empleado: Empleado): Promise<Observable<any>>{
    if(empleado.Idempleado) {
      return this.httpCliente.put<any>('https://localhost:44319/Empleado', empleado, this.getHeaderJson());
    } else {
      return this.httpCliente.post<any>('https://localhost:44319/Empleado', empleado, this.getHeaderJson());
    }
  }

   async borrarEmpelado(idEmpleado: number): Promise<Observable<any>>{
    return this.httpCliente.delete<any>(`https://localhost:44319/Empleado/${idEmpleado}`);
  }

   async getEmpleados(nombre: string): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`https://localhost:44319/Empleado/lista`);
  }  

  private getHeaderJson() {
    return {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
    };
  }
}
