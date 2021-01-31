import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarTareasComponent } from './crear-modificar-tareas.component';

describe('CrearModificarTareasComponent', () => {
  let component: CrearModificarTareasComponent;
  let fixture: ComponentFixture<CrearModificarTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearModificarTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearModificarTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
