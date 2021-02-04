import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private httpClient: HttpClient, private _tokenService: TokenService) {}

  async getProvincias(): Promise<Observable<any>>{
    return this.httpClient.get<any>('https://localhost:44335/Provincia', this._tokenService.getHeaderBasicFormEnconded());
  }

  async getLocalidades(idProvincia: number): Promise<Observable<any>>{
    return this.httpClient.get<any>(`https://localhost:44335/Localidad/${idProvincia}`, this._tokenService.getHeaderBasicFormEnconded());
  }
}
