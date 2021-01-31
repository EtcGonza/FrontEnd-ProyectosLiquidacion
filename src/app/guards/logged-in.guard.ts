import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MensagesAlertService } from '../services/mensages-alert.service';
import { Store } from '@ngxs/store';
import { TokenState } from '../states/token/token-state';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  
  logueado: boolean = false;

  constructor(
    private router: Router,
     private _mensagesAlertService: MensagesAlertService,
     private store: Store) {}

  async canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const token = this.store.selectSnapshot(TokenState.getToken);

    console.log(token);

    if(!token) {
      this._mensagesAlertService.ventanaError('Error', 'Su sesión a caducado. Por favor, vuelva a registrarse');
      this.router.navigateByUrl('login', {replaceUrl: true});
      this.logueado = false;
      console.log('No existe...');
    } else {
      this.logueado = true;
    }
    
    return this.logueado;
  }
}
