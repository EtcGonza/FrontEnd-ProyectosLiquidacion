import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private httpCliente: HttpClient) {}

   async guardarProyecto(proyecto: Proyecto): Promise<Observable<any>>{
    if(proyecto.idproyecto) {
      return this.httpCliente.put<any>('Proyecto', proyecto);
    } else {
      return this.httpCliente.post<any>('Proyecto', proyecto);
    }
  }

   async borrarProyecto(idProyecto: number): Promise<Observable<any>>{
    return this.httpCliente.delete<any>(`Proyecto/${idProyecto}`);
  }
  
  async getTareasProyecto(idProyecto: number): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`Tarea/lista/${idProyecto}`);
  }

  async getProyectos(): Promise<Observable<Proyecto []>> {
    return this.httpCliente.get<Proyecto []>(`Proyecto`);
  }
}
