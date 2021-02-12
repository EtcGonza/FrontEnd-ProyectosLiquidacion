import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { MensagesAlertService } from '../services/mensages-alert.service';
import { Store } from '@ngxs/store';
import { TokenState } from '../states/token/token-state';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private _messagesService: MensagesAlertService, private router: Router, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      url: environment.serverUrl + req.url,
      headers: req.headers,
      body: req.body,
      withCredentials: true,
    });

    const token = this.store.selectSnapshot(TokenState.getToken)

    // Si estamos autenticados tenemos que enviar el token
    if (token) {
      req = req.clone({
        url: req.url,
        headers: req.headers.set('Accept', 'application/json').set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token),
        body: req.body,
        withCredentials: true,
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Esto lo hacemos para poner el estado por defecto del Auth State
          this._messagesService.ventanaError('Atención', 'Su sesión ha caducado, por favor inicie una nueva');
        }

        return throwError(error);
      }),
      finalize(() => {
        // Termina la comunicaciónn y ocultamos
        // console.log('Comunicacion terminada');
      })
    );
    // }
  }
}
