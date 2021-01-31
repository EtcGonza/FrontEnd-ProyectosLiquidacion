import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarClienteComponent } from './crear-modificar-cliente.component';

describe('CrearModificarClienteComponent', () => {
  let component: CrearModificarClienteComponent;
  let fixture: ComponentFixture<CrearModificarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearModificarClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearModificarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
