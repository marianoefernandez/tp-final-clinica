import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public fotoUsuario:string | null = null;
  public emailUsuario:string | null = null;
  public tipoSeleccionado = "Administrador";

  constructor(public autenticacion:AutenticacionService,public firestore:FirestoreService,private spinner:NgxSpinnerService, private cookieService: CookieService,public modo:ModoNocturnoService,private router:Router)
  {

  }

  async ngOnInit()
  {   
    if(this.firestore.datosUsuarioActual == undefined)
    {
      this.spinner.show();
      await this.firestore.obtenerInfoUsuario(this.autenticacion.usuarioActual.uid);
      this.spinner.hide();
    }

    this.tipoSeleccionado = this.firestore.datosUsuarioActual.tipoUsuario;

    // if(this.cookieService.check("modo-nocturno"))
    // {
    //   if(this.cookieService.get("modo-nocturno") == "true")
    //   {
    //     this.modo.modoNocturno = true
    //   }
    // }
  }

  public cambiarModo()
  {
    this.modo.cambiarModo()
    this.modo.emitirEvento()
    
    if(this.modo.modoNocturno)
    {
      this.cookieService.set("modo-nocturno","true")
    }
    else
    {
      this.cookieService.set("modo-nocturno","false")
    }
  }

  public cerrarSesion()
  {
    this.spinner.show();
    setTimeout(async () => {
      await this.autenticacion.cerrarSesion();
      this.spinner.hide();
      this.navigate("home");
    }, 500);
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }

}
