import { Localidad } from './localidad';
import { Usuario } from './usuario';
import { PerfilEmpleado } from './PerfilEmpleado';

export class Empleado {
    idEmpleado: number;
    nombreEmpleado: string;
    apellidoEmpleado: string;
    dniEmpleado: number;
    telefono: number;
    direccion: string;
    usuario: Usuario;
    localidad: Localidad;
    fechaIngreso: Date;
    empleadoProyecto: any [];
    liquidacion: any [];
    perfilEmpleado: PerfilEmpleado [];
}