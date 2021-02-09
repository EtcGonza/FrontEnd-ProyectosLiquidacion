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
    if(cliente.idcliente) {
      return this.httpCliente.put<any>('Cliente', cliente);
    } else {
      return this.httpCliente.post<any>('Cliente', cliente);
    }
  }

   async borrarEmpelado(iDcliente: number): Promise<Observable<any>>{
    return this.httpCliente.delete<any>(`Cliente/${iDcliente}`);
  }

   async getclientes(): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`Cliente`);
  } 

  async getClienteById(idCliente: number): Promise<Observable<Cliente>> {
    return this.httpCliente.get<Cliente>(`Cliente/find/${idCliente}`);
  }
}
