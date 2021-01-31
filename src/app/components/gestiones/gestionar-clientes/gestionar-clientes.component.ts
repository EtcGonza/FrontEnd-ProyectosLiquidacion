import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/Cliente';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MensagesAlertService } from '../../../services/mensages-alert.service';
import { SweetAlertResult } from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./gestionar-clientes.component.scss']
})
export class GestionarClientesComponent implements OnInit {

  clientes: Cliente [] = [];

  constructor(private _mensagesAlertService: MensagesAlertService, private router: Router, private storage: StorageMap, private location: Location) {}

  ngOnInit(): void {
    this.auxClientes();
  }

  auxClientes() {
    let cliente1: Cliente = new Cliente();
    cliente1.direccionCliente = "Zarasa 150";
    cliente1.emailCliente = "zarasa@mail.com";
    cliente1.nombreCliente = "zarasa";
    cliente1.telefonoCliente = "4860399";
    this.clientes.push(cliente1);

    let cliente2: Cliente = new Cliente();
    cliente2.direccionCliente = "Montevideo 230";
    cliente2.emailCliente = "montevideo@mail.com";
    cliente2.nombreCliente = "Montevideo";
    cliente2.telefonoCliente = "3413496691";
    this.clientes.push(cliente2);
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
        // Llamo endpoint para borrar proyecto.
      }
    });
  }

  volver() {
    this.location.back();
  }
}
