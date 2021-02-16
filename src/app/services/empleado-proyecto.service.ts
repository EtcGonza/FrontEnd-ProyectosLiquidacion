import { Injectable } from '@angular/core';
import { EmpleadoProyecto } from '../models/EmpleadoProyecto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoProyectoService {

  constructor(private httpClient: HttpClient) {}

  async guardarEmpleadosProyecto(empleadosProyecto: EmpleadoProyecto[]): Promise<Observable<any>> {
    return this.httpClient.post<any>('EmpleadoProyecto', empleadosProyecto);
  }

  async getEmpleadosProyecto(idProyecto: number): Promise<Observable<Empleado[]>> {
    return this.httpClient.get<Empleado[]>(`EmpleadoProyecto/${idProyecto}`);
  }
}
