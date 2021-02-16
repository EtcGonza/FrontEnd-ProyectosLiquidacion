export class MenuRoles {
    menuEmpleado = null;

    menuRoot = null;

    menuProjectManager = null;

    constructor() {
      this.menuEmpleado = [
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
              label: 'Mis tareas',
              icon: 'pi pi-fw pi-inbox',
              routerLink: 'misTareas'
            }]
        }
      ];

      this.menuRoot = [
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
            },
            {
              label: 'Mis tareas',
              icon: 'pi pi-fw pi-inbox',
              routerLink: 'misTareas'
            }]
        },
        {
          label: 'Generar liquidación',
          icon: 'pi pi-fw pi-chart-line',
          routerLink: 'generarLiquidacion'
        }
      ];

      this.menuProjectManager = [
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
            }]
        }
      ];
    }

    public getMenuByIdRol (idRol: number) {
        if (idRol == 6) {
            return this.menuEmpleado;
        } else if (idRol == 7) {
            return this.menuRoot;
        } else {
            return this.menuProjectManager;
        }
    }
}