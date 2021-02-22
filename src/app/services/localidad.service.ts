import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localidad } from '../models/localidad';
import { Provincia } from '../models/provincia';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private httpClient: HttpClient) {}

  async getProvincias(): Promise<Observable<Provincia[]>>{
    return this.httpClient.get<Provincia[]>('Provincia');
  }

  async getLocalidades(idProvincia: number): Promise<Observable<Localidad[]>>{
    return this.httpClient.get<Localidad[]>(`Localidad/${idProvincia}`);
  }

  async getProvinciaById(idProvincia: number): Promise<Observable<Provincia>>{
    return this.httpClient.get<Provincia>(`Provincia/findOne/${idProvincia}`);
  }

  async getLocalidadById(idLocalidad: number): Promise<Observable<Localidad>>{
    return this.httpClient.get<Localidad>(`Localidad/findOne/${idLocalidad}`);
  }
}
