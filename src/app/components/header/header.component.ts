import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ResetTokenAction } from '../../states/token/token-state';
import { MenuRoles } from '../../shared/menuRoles';
import { UsuarioState } from '../../states/usuario/usuario-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  menu: MenuItem[] = [];
  menuRoles = new MenuRoles ();

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    // this.menu = [
    //   {
    //     label: 'Home',
    //     icon: 'pi pi-fw pi-home',
    //     routerLink: 'home'
    //   },
    //   {
    //     label: 'Gestionar',
    //     icon: 'pi pi-fw pi-book',
    //     items: [
    //       {
    //         label: 'Proyectos',
    //         icon: 'pi pi-fw pi-file-o',
    //         items: [
    //         {
    //           label: 'Gestionar proyectos',
    //           routerLink: 'gestionarProyectos'
    //         },
    //         {
    //           label: 'Crear proyecto',
    //           routerLink: 'crearModificarProyecto'
    //         }]
    //       },
    //       {
    //         label: 'Empleados',
    //         icon: 'pi pi-fw pi-users',
    //         items: [
    //           {
    //             label: 'Gestionar Empleados',
    //             routerLink: 'gestionarUsuarios'
    //           },
    //           {
    //             label: 'Crear empleado',
    //             routerLink: 'crearModificarUsuario'
    //           }
    //         ]
    //       },
    //       {
    //         label: 'Clientes',
    //         icon: 'pi pi-fw pi-star',
    //         items: [
    //           {
    //             label: 'Gestionar clientes',
    //             routerLink: 'gestionarClientes'
    //           },
    //           {
    //           label: 'Crear cliente',
    //           routerLink: 'crearModificarCliente'
    //         }]
    //       },
    //       {
    //         label: 'Mis tareas',
    //         icon: 'pi pi-fw pi-inbox',
    //         routerLink: 'misTareas'
    //       }]
    //   },
    //   {
    //     label: 'Generar liquidación',
    //     icon: 'pi pi-fw pi-chart-line',
    //     routerLink: 'generarLiquidacion'
    //   },
    //   {
    //     label: 'Salir',
    //     icon: 'pi pi-fw pi-power-off',
    //     command: () => this.logout()
    //   }
    // ];

    this.armarMenu();
  }

  armarMenu() {
    const idRol = this.store.selectSnapshot(UsuarioState.getIdRol);
    let menuRol: MenuItem [] = this.menuRoles.getMenuByIdRol(idRol);

    let auxMenuSalir: MenuItem = {
      label: 'Salir',
      icon: 'pi pi-fw pi-power-off',
      command: () => this.logout()
    };
    
    menuRol.push(auxMenuSalir);
    this.menu = menuRol;
  }

  logout() {
    this.store.dispatch(new ResetTokenAction());
    this.router.navigateByUrl('login', {replaceUrl: true});
  }
}
