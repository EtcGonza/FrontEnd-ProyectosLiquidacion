import { Proyecto } from './proyecto';

export class Cliente {
    idcliente: number;
    apellidoCliente: string;
    nombreCliente: string;
    telefonoCliente: string;
    direccionCliente: string;
    localidadCliente: number;
    emailCliente: string;
    proyecto: Proyecto [];
}