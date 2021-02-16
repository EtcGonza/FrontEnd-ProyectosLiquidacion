import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEmpleadoProyectoComponent } from './asignar-empleado-proyecto.component';

describe('AsignarEmpleadoProyectoComponent', () => {
  let component: AsignarEmpleadoProyectoComponent;
  let fixture: ComponentFixture<AsignarEmpleadoProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarEmpleadoProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarEmpleadoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
