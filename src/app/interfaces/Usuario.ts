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
    especialidad:any | null,
    estaActiva:boolean,
    hora: any;
}

export interface Historia
{
    altura:number,
    peso:number,
    temperatura:number,
    presion:number,
    datosDinamicos:any []
}
