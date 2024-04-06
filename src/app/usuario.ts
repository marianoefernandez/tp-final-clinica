export interface Usuario
{
    tipo:string,
    nombre:string,
    apellido:string,
    edad:number,
    dni:number,
    email: string,
    imagenPerfilUno:any,
    imagenPerfilDos:any | null,
    obraSocial:string | null,
    especialidad:string | null,
    estaActiva:boolean,
    hora: any;
}