import { Localidad } from './localidad';
import { Usuario } from './usuario';
import { PerfilEmpleado } from './PerfilEmpleado';

export class Empleado {
    Idempleado: number;
    NombreEmpleado: string;
    ApellidoEmpleado: string;
    DniEmpleado: number;
    Telefono: number;
    Direccion: string;
    Usuario: Usuario;
    Localidad: number;
    FechaIngresoEmpleado: Date;
    EmpleadoProyecto: any [];
    Liquidacion: any [];
    PerfilEmpleado: PerfilEmpleado [];
}