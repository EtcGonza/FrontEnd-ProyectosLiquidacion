import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpCliente: HttpClient) { }

  async guardarcliente(cliente: Cliente): Promise<Observable<any>>{
    console.log(JSON.stringify(cliente));
    if(cliente.idCliente) {
      return this.httpCliente.put<any>('Cliente', cliente);
    } else {
      return this.httpCliente.post<any>('cliente', cliente);
    }
  }

   async borrarEmpelado(idcliente: number): Promise<Observable<any>>{
    return this.httpCliente.delete<any>(`Cliente/${idcliente}`);
  }

   async getclientes(): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`Cliente`);
  }  
}
