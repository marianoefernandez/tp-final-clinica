import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent 
{

  public flagImagen : boolean = true;
  public flagHorarios : boolean = true;

  constructor(public autenticacion:AutenticacionService,public firestore:FirestoreService)
  {
    
  }

  ngOnInit()
  {
    
  }

  cambiarValorBanderaImagen()
  {
    this.flagImagen = ! this.flagImagen;
  }

  cambiarValorBanderaHorarios()
  {
    this.flagHorarios = ! this.flagHorarios;
  }

  formatearString(dato:any)
  {
    let mensajeAux = ""

    for (let i = 0; i < dato.length; i++) {
      const letra = dato[i];
    
      if(letra === letra.toUpperCase() || i === 0)
      {
        if(i !== 0)
        {
          mensajeAux+= " "
        }    
        mensajeAux += letra.toUpperCase();
      }
      else
      {
        mensajeAux += letra;
      }
    }
    
    return mensajeAux;
  }

  obtenerValor(dato:any)
  {
    
    if (typeof dato === "boolean") 
    {
      dato = dato ? "Si" : "No";
    }
    else
    {
      if (Array.isArray(dato))
      {
        dato = this.obtenerEspecialidad(dato)
      }
    }

    return dato;
  }

  public obtenerEspecialidad(especialidad:any)
  {
    let especialidades = ""

    for(let i = 0;i<especialidad.length;i++)
    {
      especialidades += especialidad[i]["especialidad"];
      if(i != (especialidad.length - 1))
      {
        especialidades += ",";
      }
    }

    return especialidades;
  }
}
