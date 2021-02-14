import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensagesAlertService } from '../../services/mensages-alert.service';
import { Store } from '@ngxs/store';
import { SetTokenAction } from '../../states/token/token-state';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private store: Store,
    private _mensagesAlertService: MensagesAlertService,
    private _loginService: LoginService,
    private router: Router
    ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      usuario: [null ,Validators.required],
      contrasenia: [null ,Validators.required]
    });
  }

  ingresar() {
    if(this.formulario.valid) {
      this._loginService.ingresar(this.formulario.value.usuario, this.formulario.value.contrasenia).then(response => 
        response.subscribe(respuesta => {
          this.store.dispatch(new SetTokenAction(respuesta.token));
          this.router.navigateByUrl('home', {replaceUrl: true});
        }, error => this._mensagesAlertService.ventanaWarning('Usuario invalido', 'Usuario y/o contraseña invalido')));
    } else {
      this._mensagesAlertService.ventanaWarning('Formulario invalido', 'Todos los campos marcados con (*) son obligatorios');
    }
  }
}
