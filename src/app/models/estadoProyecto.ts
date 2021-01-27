export enum EstadoProyecto {
    PROCESO = 'En proceso',
    PAUSADO = 'Pausado',
    FINALIZADO = 'Finalizado'
}

export namespace EstadoProyecto {
    export function values() {
        return Object.keys(EstadoProyecto).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        )
    }
}