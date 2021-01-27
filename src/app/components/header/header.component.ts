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
        label: 'Gestionar',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Proyectos',
            icon: 'pi pi-fw pi-file-o',
            items: [{
              label: 'Crear/Modificar',
            },
            {
              label: 'Asociar Proyecto',
            }]
          },
          {
            label: 'Empleados',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Crear/Modificar',
              }
            ]
          },
          {
            label: 'Perfiles',
            icon: 'pi pi-fw pi-tag',
            items: [{
              label: 'Crear/Modificar',
            }]
          },
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-star',
            items: [{
              label: 'Crear/Modificar',
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
