import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '../models/Perfil';
import { Observable } from 'rxjs';
import { PerfilEmpleado } from '../models/PerfilEmpleado';

@Injectable({
  providedIn: 'root'
})

export class PerfilEmpleadoService {

  constructor(private httpCliente: HttpClient) {}

  async getPerfilesEmpleado(idEmpleado: number): Promise<Observable <Perfil[]>> {
    return this.httpCliente.get<Perfil[]>(`PerfilEmpleado/perfiles/${idEmpleado}`);
  }

  async guardarPerfilesEmpleado(perfilesEmpleado: PerfilEmpleado []): Promise<Observable <string>> {
    return this.httpCliente.post<string>(`PerfilEmpleado`, perfilesEmpleado);
  }
}
