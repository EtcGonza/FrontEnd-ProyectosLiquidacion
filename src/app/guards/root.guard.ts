import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioState } from '../states/usuario/usuario-state';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const idRol = this.store.selectSnapshot(UsuarioState.getIdRol);

      if (idRol == 7) {
        this.router.navigateByUrl('Home');
        return false;
      }

    return true;
  }
  
}
