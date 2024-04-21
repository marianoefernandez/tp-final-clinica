export class DniDuplicadoError extends Error 
{
    public code:string="";
    constructor(codigoError:string) {
      super();
      this.code = codigoError;
  
      // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
      if (Error.captureStackTrace) 
      {
        Error.captureStackTrace(this, DniDuplicadoError);
      }
  
      this.name = "dniDuplicadoError";
    }
  }