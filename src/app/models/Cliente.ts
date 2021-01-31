import { Localidad } from './localidad';
import { Proyecto } from './proyecto';

export class Cliente {
    idCliente: number;
    nombreCliente: string;
    telefonoCliente: string;
    direccionCliente: string;
    localidadCliente: Localidad;
    emailCliente: string;
    proyecto: Proyecto [];
}