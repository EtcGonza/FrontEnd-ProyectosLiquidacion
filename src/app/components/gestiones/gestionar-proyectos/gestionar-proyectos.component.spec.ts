import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProyectosComponent } from './gestionar-proyectos.component';

describe('GestionarProyectosComponent', () => {
  let component: GestionarProyectosComponent;
  let fixture: ComponentFixture<GestionarProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
