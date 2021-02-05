import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private _tokenService: TokenService) {}

  async ingresar(user: string, password: string): Promise<Observable<any>>{

    let body = {
      user: user,
      password: password
    }

    return this.httpClient.post<any>('Login', body, this._tokenService.getHeaderBasicFormEnconded());
  }

  async test(): Promise<Observable<any>>{
    return this.httpClient.get<any>('Login', this._tokenService.getHeaderBasicFormEnconded());
  }
}
