import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  async ingresar(user: string, password: string): Promise<Observable<any>>{

    let body = {
      user: user,
      password: password
    }

    return this.httpClient.post<any>('https://localhost:44335/Login', body, this.getHeaderBasicFormEnconded());
  }

  async test(): Promise<Observable<any>>{
    return this.httpClient.get<any>('https://localhost:44335/Login', this.getHeaderBasicFormEnconded());
  }

  private getHeaderBasicFormEnconded() {
    return {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        // 'Authorization': 'Basic ' + btoa("client:password")
      },
    };
  }
}
