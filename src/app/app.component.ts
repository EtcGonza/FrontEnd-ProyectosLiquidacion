import { Component, OnInit } from '@angular/core';
import { TokenState } from './states/token/token-state';
import { Store, Select } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(TokenState.getToken) token$: Observable<string>;
  unsubscribe$: Subject<void> = new Subject();

  title = 'ClientApp';
  logueado: boolean;

  constructor(private store: Store) {}

  ngOnInit() {
    this.token$.pipe(takeUntil(this.unsubscribe$)).subscribe((token: string) => {
      if(token) {
        this.logueado = true;
      } else {
        this.logueado = false;
      }
    })

  }
}


// TODO Se desea saber la cantidad acumulada de horas trabajadas de cada proyecto por tipo de perfil.
        // Saber la cantidad de horas en total de un tipo de perfil

// TODO En un periodo de tiempo se requiere un informe de las horas overbudget.
        // Elegir fechas y mostrar las horas overbudget de ese periodo.

// TODO Por cada proyecto se desea conocer las horas adeudadas (deuda empresa - desarrollador).
        // Saber la cantidad de horas adeudadas.

// TODO Lo de las escalas