import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private httpCliente :HttpClient) {}

   async guardarProyecto(proyecto: Proyecto): Promise<Observable<any>>{
    if(proyecto.Idproyecto) {
      return this.httpCliente.put<any>('zarasa', proyecto);
    } else {
      return this.httpCliente.post<any>('zarasa', proyecto);
    }
  }

   async borrarProyecto(idProyecto: number): Promise<Observable<any>>{
    return this.httpCliente.delete<any>(`zarasa/${idProyecto}`);
  }

   async GetProyectosByNombre(nombre: string): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`/bynombre/${nombre}`);
  }  

  async getProyectosByCliente(idCliente: number): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`/cliente/${idCliente}`);
  }
}
