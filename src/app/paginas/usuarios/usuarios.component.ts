import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent 
{

  public escondoInteraccion : boolean = true;
  public componente : string = "";

  constructor(private spinner:NgxSpinnerService)
  {

  }

  abrirComponente(componente:string)
  {
    this.componente = componente;
    this.escondoInteraccion = false;
  }
  volverAtras()
  {
    this.spinner.show();
    setTimeout(() => {
      this.componente = ""; 
      this.escondoInteraccion = true;
      this.spinner.hide();   
    }, 1200);
  }

}
