export interface Turno
{
    idTurno:number,
    uidPaciente:string,
    uidEspecialista:string,
    consultorio:number,
    horarioTurno:Date,
    estadoTurno:string,
    reseña:string,
    calificacion:number,
    reseñaPaciente:string,
    especialidad:string,
    encuesta: string[]
}