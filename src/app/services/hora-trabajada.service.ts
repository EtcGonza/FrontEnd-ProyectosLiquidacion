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

  async prueba(idProyecto: number): Promise<Observable<any>> {
    return this.httpCliente.get<any>(`HoraTrabajada/${idProyecto}`);
  }
}
