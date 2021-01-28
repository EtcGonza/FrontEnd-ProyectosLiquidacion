import { PerfilEmpleado } from "./PerfilEmpleado";
import { Proyecto } from './proyecto';
import { HoraTrabajada } from './HoraTrabajada';

export class Tarea {
    Idtarea: number;
    Idproyecto: number;
    Idempleado: number;
    Idperfil: number;
    DescripcionTarea: string; 
    HorasEstimadasTarea: number;
     HorasOverbudget: number;
    HorasTrabajadas: number;

    Id: PerfilEmpleado;
    IdproyectoNavigation:  Proyecto;
    HoraTrabajada: HoraTrabajada; 
}