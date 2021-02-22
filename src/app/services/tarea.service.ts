import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/Tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private httpClient: HttpClient) {}

  async crearTarea(tarea: Tarea): Promise<Observable<string>> {
    if (tarea.idtarea) {
      return this.httpClient.put<string>('Tarea', tarea);
    } else {
      return this.httpClient.post<string>('Tarea', tarea);
    }
  }

  async getTareasProyecto(idProyecto: number): Promise<Observable<Tarea[]>> {
      return this.httpClient.get<Tarea[]>(`Tarea/${idProyecto}`);
  }

  async borrarTarea(idTarea: number): Promise<Observable<string>> {
      return this.httpClient.delete<string>(`Tarea/${idTarea}`);
  }

  async findTareasEmpleado(idEmpleado: number): Promise<Observable<Tarea[]>> {
    return this.httpClient.get<Tarea[]>(`Tarea/empleado/${idEmpleado}`);
  }

  async getCantidadHorasOverbudget(idProyecto: number): Promise<Observable<number>> {
    return this.httpClient.get<number>(`Tarea/overbudget/${idProyecto}`);
  }
}
