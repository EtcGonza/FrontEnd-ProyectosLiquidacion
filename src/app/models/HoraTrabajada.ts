import { Tarea } from "./Tarea";

export class HoraTrabajada {
     IdhoraTrabajada: number;
     Idproyecto: number;
     Idtarea: number;
     CantidadHoraTrabajada: number; 
     FechaHoraTrabajada: Date;
     EstadoHoraTrabajada: string;
     Idempleado: number;
     Idperfil: number;
     Id: number;
     IdNavigation: Tarea
}