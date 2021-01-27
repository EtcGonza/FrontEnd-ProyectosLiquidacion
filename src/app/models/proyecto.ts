import { Cliente } from './Cliente';

export class Proyecto {
    idProyecto: number;
    cliente: Cliente;
    nombre: string;
    estado: string;
    fechaInicio: Date;
    fechaFin: Date;
    descripcion: string;
}