import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent 
{

  public escondoInteraccion : boolean = true;
  public componente : string = "";

  abrirComponente(componente:string)
  {
    this.componente = componente;
    this.escondoInteraccion = false;
  }

}
