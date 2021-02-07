import { Tarea } from './Tarea';
import { EmpleadoProyecto } from './EmpleadoProyecto';

export class Proyecto {
    idproyecto: number;
    idcliente: number;
    nombreProyecto: string;
    descripcion: string;
    estadoProyecto: string;
    fechaInicioProyecto: Date;
    fechaFinProyecto: Date;

    empleadoProyecto: EmpleadoProyecto [];
    tarea: Tarea[];
}