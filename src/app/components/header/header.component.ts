import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: 'home'
      },
      {
        label: 'Gestionar',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Proyectos',
            icon: 'pi pi-fw pi-file-o',
            items: [
            {
              label: 'Gestionar proyectos',
              routerLink: 'gestionarProyectos'
            },
            {
              label: 'Crear proyecto',
              routerLink: 'crearModificarProyecto'
            }]
          },
          {
            label: 'Empleados',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Gestionar Empleados',
                routerLink: 'gestionarUsuarios'
              },
              {
                label: 'Crear empleado',
                routerLink: 'crearModificarUsuario'
              }
            ]
          },
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-star',
            items: [
              {
                label: 'Gestionar clientes',
                routerLink: 'gestionarClientes'
              },
              {
              label: 'Crear cliente',
              routerLink: 'crearModificarCliente'
            }]
          }]
      },
      {
        label: 'Liquidacion',
        icon: 'pi pi-fw pi-chart-line',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          },

        ]
      },
      {
        label: 'Salir',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
  }

}
