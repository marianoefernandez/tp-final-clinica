export interface Horario
{
    hora:string,
    estaActivo:boolean
}

export interface EspecialistaHorario
{
    uid:string,
    diasHorarios:DiasHorario[]
}

export interface DiasHorario
{
    dia:string,
    horarios:Horario[]
}

export interface Hora
{
    dia:number,
    mes:number,
    anio:number,
    hora:string,
    uidEspecialista:string
}