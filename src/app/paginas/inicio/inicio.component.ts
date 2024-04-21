import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private router:Router,private spinner:NgxSpinnerService,public firestore:FirestoreService, private autenticacion:AutenticacionService)
  {

  }

  public tipoSeleccionado :string = "";
  public mensajePerfil : string = "";
  public imagenPerfil : string = "";

  async ngOnInit()
  {
    console.log("oninit")
    if(this.firestore.datosUsuarioActual == undefined)
    {
      this.spinner.show();
      await this.firestore.obtenerInfoUsuario(this.autenticacion.usuarioActual.uid);
      this.spinner.hide();
    }

    this.tipoSeleccionado = this.firestore.datosUsuarioActual.tipoUsuario;

    switch(this.tipoSeleccionado)
    {
      case "Paciente":
        this.imagenPerfil = "https://imgs.search.brave.com/H1GxjBxtGmBreKHtgQ6ftMpBa4KsEKytczZWs_YJTmQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8yNzUwLzI3NTA2/NTcucG5n";
        this.mensajePerfil = "Visualiza la información de tu perfil, como sus datos personales, su propia historia clínica, entre otros";
        break;
      case "Especialista":
        this.imagenPerfil = "https://cdn.icon-icons.com/icons2/979/PNG/256/Doctor_Male_icon-icons.com_75051.png";
        this.mensajePerfil = "Visualiza la información de tu perfil, como sus datos personales, también puede asignar sus horarios en está sección";
        break;
      default:
        this.mensajePerfil = "Visualiza la información de tu perfil, como sus datos personales";
        this.imagenPerfil = "https://imgs.search.brave.com/8XALFhTgw08aFsjeIESCb_MogfiTNokuOwZBmAtJPU4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vZmljL2lt/YWdlcy9pY29ucy8y/NzE1L2NvbW11bml0/eV9pY29uc19hbmRf/Zm9ydW1fcmFua19p/Y29ucy8yNTYvYWRt/aW4ucG5nP2ZtdD13/ZWJwJnc9MzUw";
    }
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
