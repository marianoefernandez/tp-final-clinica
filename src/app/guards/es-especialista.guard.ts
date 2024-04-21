import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../servicios/firestore.service';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class esEspecialistaGuard {
  constructor(private firestore:FirestoreService, private autenticacion:AutenticacionService,private router: Router,private spinner:NgxSpinnerService) 
  {
    
  }

  canActivate: CanActivateFn = async (): Promise<boolean> => 
  {
    this.spinner.show();
    await this.firestore.obtenerInfoUsuario(this.autenticacion.usuarioActual?.uid);
    this.spinner.hide();
    if(this.firestore.datosUsuarioActual.tipoUsuario == "Especialista")
    {
      return true;
    }
    
    this.router.navigateByUrl("bienvenido");

    return false;
  };
}