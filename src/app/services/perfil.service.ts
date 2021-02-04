import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Perfil } from '../models/Perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private httpClient: HttpClient, private _tokenService: TokenService) {}

  async getPerfiles(): Promise<Observable<Perfil []>>{
    return this.httpClient.get<Perfil []>('https://localhost:44335/Perfil', this._tokenService.getHeaderBasicFormEnconded());
  }
}
