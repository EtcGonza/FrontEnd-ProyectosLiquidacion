import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HoraTrabajada } from '../models/HoraTrabajada';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoraTrabajadaService {

  constructor(private httpCliente: HttpClient) {}

  async crearHoraTrabajada(horaTrabajada: HoraTrabajada): Promise<Observable<string>> {
    return this.httpCliente.post<string>('HoraTrabajada', horaTrabajada);
  }

  async getHorasTrabajadasProyecto(idProyecto: number, idPerfil: number): Promise<Observable<number>> {
    return this.httpCliente.get<number>(`HoraTrabajada/${idProyecto}/${idPerfil}`);
  }

  async getHorasAdeudadas(idProyecto: number): Promise<Observable<number>> {
    return this.httpCliente.get<number>(`HoraTrabajada/${idProyecto}`);
  }
}
