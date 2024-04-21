import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../servicios/firestore.service';
import swal from 'sweetalert2';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class noEsEspecialistaGuard {
  constructor(private firestore:FirestoreService, private autenticacion:AutenticacionService,private router: Router,private spinner:NgxSpinnerService) 
  {
    
  }

  canActivate: CanActivateFn = async (): Promise<boolean> => 
  {
    this.spinner.show();
    await this.firestore.obtenerInfoUsuario(this.autenticacion.usuarioActual?.uid);
    this.spinner.hide();
    if(this.firestore.datosUsuarioActual.tipoUsuario != "Especialista")
    {
      return true;
    }

    await swal.fire
    (
      {
        icon: 'error',
        title: 'Acceso restringido',
        text: "No está permitido el ingreso de especialistas a está seccion"
      }
    )
    
    this.router.navigateByUrl("bienvenido");

    return false;
  };
}