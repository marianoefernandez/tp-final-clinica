import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import {NgxSpinnerService} from 'ngx-spinner'
import { firstValueFrom } from 'rxjs';
import swal from 'sweetalert2';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {


  //public usuarios : any[] = JSON.parse(localStorage.getItem('Usuarios') || "[]")
  public nombreUsuario : string = "";
  public email : string = "";
  public clave : string = "";
  public mensajeError : string = "";

  constructor(private router:Router,private autenticador:AutenticacionService, private spinner:NgxSpinnerService, private firestore:FirestoreService)
  {

  }

  public accesoRapido(email:string,contraseña:string)
  {
    this.email = email;
    this.clave = contraseña;
  }

  public accesoRapidoPaciente()
  {
    this.email = "marification66@gmail.com";
    this.clave = "12345678";
    this.loguearse()
  }

  public accesoRapidoEspecialista()
  {
    this.email = "budarojo69@gmail.com";
    this.clave = "12345678";
    this.loguearse()
  }

  public accesoRapidoAdmin()
  {
    this.email = "mezequielfernandez4@hotmail.com";
    this.clave = "12345678";
    this.loguearse()
  }

  public async loguearse()
  {
    this.mensajeError = "";
    this.spinner.show()  
    this.autenticador.login(this.email,this.clave).then(respuesta => {
      setTimeout(async () =>
      {
        if(typeof respuesta != "string")
        {
          const observable = this.autenticador.obtenerUsuarioLogueado();
          this.autenticador.usuarioActual = await firstValueFrom(observable);

          if(respuesta.user?.emailVerified)
          {
            await this.firestore.obtenerInfoUsuario(respuesta.user?.uid);
            if(this.firestore.datosUsuarioActual.tipoUsuario === "Administrador" || this.firestore.datosUsuarioActual.tipoUsuario === "Paciente" || this.firestore.datosUsuarioActual.estaActivo)
            {
              this.navigate("bienvenido");
            }
            else
            {
              swal.fire
              (
                {
                  icon: 'error',
                  title: 'Usuario no habilitado',
                  text: "Su usuario de tipo especialista todavia no fue validado y habilitado por un administrador, por favor espere a ser revisado y habilitado para poder ingresar.",
                }
              )
              this.autenticador.cerrarSesion();
              this.firestore.datosUsuarioActual = null;
              this.autenticador.usuarioActual = null;
            }
          }
          else
          {
            swal.fire(
              {
                icon: 'error',
                title: 'Email no verificado',
                text: "Por favor revise su casilla de entrada (Incluyendo spam) y verifique el email",
                showDenyButton: true,
                confirmButtonText: "Aceptar",
                denyButtonText: "Reenviar email"
              }).then(respuesta =>
                {
                  if(respuesta.isDenied)
                  { 
                    this.autenticador.reeviarEmail()
                    swal.fire("Se ha enviado un email correctamente a " + this.email + " por favor abra el enlace del mismo para verificar la cuenta", "", "success");
                  }
                  this.autenticador.usuarioActual = null;
                });
          }
        }
        else
        {
          this.mostrarError(respuesta);
          console.log("No se pudo loguear");
        }
        this.spinner.hide();
      },500)
    })
  }

  public mostrarError(error:string)
  {
    switch(error)
    {
      case "auth/invalid-email":
        this.mensajeError = 'El formato de correo es invalido';
        break;
      case "auth/operation-not-allowed":
        this.mensajeError = "Operación no permitida"
        break;
      default:
        this.mensajeError = 'El usuario o contraseña no son correctos. Por favor verifique los datos.'
    }
  }
  
  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
 