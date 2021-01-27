import { Localidad } from './localidad';
import { Usuario } from './usuario';

export class Empleado {
    id: number;
    nombre: string;
    apellido: string;
    dni: number;
    telefono: number;
    direccion: string;
    usuario: Usuario;
    localidad: Localidad;
    fechaIngreso: Date;
}