import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/Cliente';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MensagesAlertService } from '../../../services/mensages-alert.service';
import { SweetAlertResult } from 'sweetalert2';
import { Location } from '@angular/common';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./gestionar-clientes.component.scss']
})
export class GestionarClientesComponent implements OnInit {

  clientes: Cliente [] = [];

  constructor(
    private _mensagesAlertService: MensagesAlertService,
    private _clienteService: ClientesService, 
    private router: Router,
     private storage: StorageMap,
     private location: Location) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getclientes().then(response => response.subscribe((clientes: Cliente []) => clientes.forEach(cliente => this.clientes.push(cliente)),
    error => console.log('Error (getClientes)', error)));
  }

  crearCliente() {
    this.storage.delete('_modificarCliente').subscribe(() => {});
    this.router.navigateByUrl('crearModificarCliente', {replaceUrl: false});
  }

  editarCliente(cliente: Cliente) {
    this.storage.set('_modificarCliente', cliente).subscribe({
      next: ()=> console.log('next'),
      error: () => console.log('error')
    });

    this.router.navigateByUrl('crearModificarCliente', {replaceUrl: false});
  }

  borrarCliente(cliente: Cliente) {
    this._mensagesAlertService.ventanaConfirmar('Borrar cliente', `¿Esta seguro que desea borrar el cliente '${cliente.nombreCliente}'?`)
    .then((result: SweetAlertResult) => {
      if(result.isConfirmed) {
        this._clienteService.borrarEmpelado(cliente.idcliente).then(
          response => response.subscribe(respuesta => this._mensagesAlertService.ventanaExitosa('Exito','Cliente borrado'), 
          error => this._mensagesAlertService.ventanaError('Error','No se pudo borrar el cliente')));
      }
    });
  }

  volver() {
    this.location.back();
  }
}
