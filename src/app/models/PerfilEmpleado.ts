import { Perfil } from "./Perfil";
import { HoraTrabajada } from './HoraTrabajada';
import { Tarea } from './Tarea';

export class PerfilEmpleado {
    Idempleado: number;
    Idperfil: number;
    IdperfilNavigation: Perfil;
    horaTrabajada: HoraTrabajada [];
    tarea: Tarea [];
}