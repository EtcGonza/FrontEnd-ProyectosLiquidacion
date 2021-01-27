import { Localidad } from '../../../../../Proyecto/src/app/model/localidad';
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