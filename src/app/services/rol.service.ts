import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private httpCliente: HttpClient) {}

  async getRoles(): Promise<Observable<Rol[]>> {
    return this.httpCliente.get<Rol[]>('Rol');
  }
}
