import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../models/Perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private httpClient: HttpClient) {}

  async getPerfiles(): Promise<Observable<Perfil []>>{
    return this.httpClient.get<Perfil []>('Perfil');
  }
}
