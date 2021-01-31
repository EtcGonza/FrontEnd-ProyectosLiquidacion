import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MensagesAlertService } from '../services/mensages-alert.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  
  logueado: boolean = false;

  constructor(
    private router: Router,
     private _mensagesAlertService: MensagesAlertService,
     private storage: StorageMap) {}

  async canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {

    this.storage.set('_token', 'zarasa').subscribe();

    console.log('Await');

    await this.storage.get('_token').subscribe((token: string) => {
      if (token) {
        console.log('Existe');
        this.logueado = true
      }
    });

    console.log('Desawait');

    if(!this.logueado) {
      this._mensagesAlertService.ventanaError('Error', 'Su sesión a caducado. Por favor, vuelva a registrarse');
      this.router.navigateByUrl('login', {replaceUrl: true});
    }
    
    return this.logueado;
  }
}
