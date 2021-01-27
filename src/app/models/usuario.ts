import { Rol } from './rol';
import { Empleado } from './empleado';

export class Usuario {
    Idusuario: number;
    NombreUsuario: string;
    PasswordUsuario: string;
    Idrol: number;
    Idempleado: number;

    IdempleadoNavigation: Empleado;
    IdrolNavigation: Rol;
}