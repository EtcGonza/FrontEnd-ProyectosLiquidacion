import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasProyectoComponent } from './estadisticas-proyecto.component';

describe('EstadisticasProyectoComponent', () => {
  let component: EstadisticasProyectoComponent;
  let fixture: ComponentFixture<EstadisticasProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
