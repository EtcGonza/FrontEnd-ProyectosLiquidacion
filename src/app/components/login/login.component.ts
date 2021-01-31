import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagesAlertService } from '../../services/mensages-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private _mensagesAlertService: MensagesAlertService
    ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      usuario: [null ,Validators.required],
      contrasenia: [null ,Validators.required]
    });
  }

  ingresar() {
    if(this.formulario.valid) {
      console.log('formulario valido', this.formulario.value);
      this._mensagesAlertService.ventanaError('Credenciales invalidas', 'Usuario y/o contraseña incorrectos');
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }
}
