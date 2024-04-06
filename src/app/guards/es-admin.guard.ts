import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../servicios/firestore.service';
import swal from 'sweetalert2';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class esAdminGuard {
  constructor(private firestore:FirestoreService, private autenticacion:AutenticacionService,private router: Router,private spinner:NgxSpinnerService) 
  {
    
  }

  canActivate: CanActivateFn = async (): Promise<boolean> => 
  {
    this.spinner.show();
    await this.firestore.obtenerInfoUsuario(this.autenticacion.usuarioActual?.uid);
    this.spinner.hide();
    if(this.firestore.datosUsuarioActual.tipoUsuario == "Administrador")
    {
      console.log("Es admin");
      return true;
    }

    await swal.fire
    (
      {
        icon: 'error',
        title: 'Acceso restringido',
        text: "El usuario logueado actualmente es de tipo " + this.firestore.datosUsuarioActual.tipoUsuario + " y no tiene permitido el acceso a está seccion ya que solo está permitida para usuarios administradores.",
      }
    )
    
    this.router.navigateByUrl("bienvenido/mi-perfil");

    return false;
  };
}