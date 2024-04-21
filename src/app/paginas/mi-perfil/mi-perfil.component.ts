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
    return dato;
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
