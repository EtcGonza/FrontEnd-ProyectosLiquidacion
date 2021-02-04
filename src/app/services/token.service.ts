import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenState } from '../states/token/token-state';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private store: Store) { }

  getHeaderBasicFormEnconded() {
    return {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa("client:password")
      },
    };
  }

  async getHeaderJson() {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.store.selectSnapshot(TokenState.getToken),
    });

    return { headers: headers, withCredentials: false };
  }

  getHeaderJsonAnonimo (){
    return { headers: { 'Content-Type': 'application/json; charset=utf-8' } };
  }
}
