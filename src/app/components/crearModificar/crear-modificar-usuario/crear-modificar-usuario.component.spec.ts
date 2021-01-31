import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarUsuarioComponent } from './crear-modificar-usuario.component';

describe('CrearModificarUsuarioComponent', () => {
  let component: CrearModificarUsuarioComponent;
  let fixture: ComponentFixture<CrearModificarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearModificarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearModificarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
