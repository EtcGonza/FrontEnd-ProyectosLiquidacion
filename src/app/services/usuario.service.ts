import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpCliente: HttpClient) {}

  async getUsuarioById(idEmpleado: number): Promise<Observable<Usuario>> {
    return this.httpCliente.get<Usuario>(`Empleado/usuario/${idEmpleado}`);
  }
}
