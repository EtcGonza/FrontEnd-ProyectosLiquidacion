import { Usuario } from './usuario';
import { PerfilEmpleado } from './PerfilEmpleado';

export class Empleado {
    idempleado: number;
    nombreEmpleado: string;
    apellidoEmpleado: string;
    dniEmpleado: number;
    telefono: number;
    direccion: string;
    usuario: Usuario [];
    localidad: number;
    fechaIngresoEmpleado: Date;
    empleadoProyecto: any [];
    liquidacion: any [];
    perfilEmpleado: PerfilEmpleado [];
}