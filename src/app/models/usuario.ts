import { Rol } from './rol';

export class Usuario {
    id: number;
    nombreUsuario: string;
    idRol: Rol;
    // Esto no seria un arreglo de roles?
    idEmpleado: number;
}