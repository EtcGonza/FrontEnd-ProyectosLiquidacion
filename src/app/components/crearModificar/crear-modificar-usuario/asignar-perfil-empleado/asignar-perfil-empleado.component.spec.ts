import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPerfilEmpleadoComponent } from './asignar-perfil-empleado.component';

describe('AsignarPerfilEmpleadoComponent', () => {
  let component: AsignarPerfilEmpleadoComponent;
  let fixture: ComponentFixture<AsignarPerfilEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarPerfilEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPerfilEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
