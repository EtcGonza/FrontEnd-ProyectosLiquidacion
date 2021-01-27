export enum EstadoProyecto {
    PROCESO = 'En proceso',
    PAUSADO = 'Pausado',
    FINALIZADO = 'Finalizado'
}

export namespace EstadoProyecto {
    export function values(): any[] {
        return Object.values(EstadoProyecto).filter(
            (type) => typeof type === 'string'
        )
    }
}