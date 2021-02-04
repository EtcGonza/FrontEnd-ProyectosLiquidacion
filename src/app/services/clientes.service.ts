import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { TokenService } from './token.service';
import { TokenState } from '../states/token/token-state';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpCliente: HttpClient, private store: Store) { }

  async guardarcliente(cliente: Cliente): Promise<Observable<any>>{
    console.log('guardarcliente Service',cliente);
    if(cliente.Idcliente) {
      return this.httpCliente.put<any>('https://localhost:44335/Cliente', cliente, this.getHeaderJson());
    } else {
      return this.httpCliente.post<any>('https://localhost:44335/Cliente', cliente, this.getHeaderJson());
    }
  }

   async borrarEmpelado(idcliente: number): Promise<Observable<any>>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.store.selectSnapshot(TokenState.getToken),
    });
    
    return this.httpCliente.delete<any>(`https://localhost:44335/Cliente/${idcliente}`, {headers});
  }

   async getclientes(): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`https://localhost:44335/Cliente`);
  }  

  private getHeaderJson() {
    return {
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
    };
  }
}
