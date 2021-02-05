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
