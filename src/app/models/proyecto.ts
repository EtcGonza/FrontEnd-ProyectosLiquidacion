import { Cliente } from './Cliente';
import { Tarea } from './Tarea';
import { EmpleadoProyecto } from './EmpleadoProyecto';

export class Proyecto {
    Idproyecto: number;
    Idcliente: number;
    NombreProyecto: string;
    Descripcion: string;
    EstadoProyecto: string;
    FechaInicioProyecto: Date;
    FechaFinProyecto: Date;

    cliente: Cliente;
    EmpleadoProyecto: EmpleadoProyecto [];
    Tarea: Tarea[];
}