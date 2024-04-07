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
item: any;
  constructor(public autenticacion:AutenticacionService,public firestore:FirestoreService)
  {
    
  }

  ngOnInit()
  {
    
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
    return dato;
  }
}
