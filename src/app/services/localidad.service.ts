import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private httpClient: HttpClient) {}

  async getProvincias(): Promise<Observable<any>>{
    return this.httpClient.get<any>('Provincia');
  }

  async getLocalidades(idProvincia: number): Promise<Observable<any>>{
    return this.httpClient.get<any>(`Localidad/${idProvincia}`);
  }
}
