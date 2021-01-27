import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarProyectoComponent } from './crear-modificar-proyecto.component';

describe('CrearModificarProyectoComponent', () => {
  let component: CrearModificarProyectoComponent;
  let fixture: ComponentFixture<CrearModificarProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearModificarProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearModificarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
