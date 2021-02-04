import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { MensagesAlertService } from '../services/mensages-alert.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private _messagesService: MensagesAlertService, private router: Router) {}

  // TODO Hacer que antes de cada peticion HTTP se compruebe si el usuario tiene una empresa. Si no la tiene, te patea al login y limpia states.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostramos el cargando

    console.log('Construyo url ', environment.serverUrl + req.url,);

    console.log('req.headers',req.headers);

    req = req.clone({
      url: environment.serverUrl + req.url,
      headers: req.headers,
      body: req.body,
      withCredentials: true,
    });

    // Si estamos autenticados tenemos que enviar el token
        // req = req.clone({
        //   url: req.url,
        //   headers: req.headers.set('Content-Type', 'application/json; charset=utf-8'),
        //   body: req.body,
        //   withCredentials: true,
        // });

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
        console.log('Comunicacion terminada');
      })
    );
    // }
  }
}
