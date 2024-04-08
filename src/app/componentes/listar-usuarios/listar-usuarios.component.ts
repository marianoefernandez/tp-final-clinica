import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent 
{
  public listaUsuarios : any[] = [];
  public listaAdministradores: any[] = [];
  public listaPacientes: any[] = []; 
  public listaEspecialistas: any[] = []; 
  public nombre : string = "";
  public dni : any = ""
  @Output() eventoRepartidor = new EventEmitter<any>();


  constructor(private firestore:FirestoreService,private spinner:NgxSpinnerService)
  {

  }

  async ngOnInit()
  {
    this.spinner.show()
    const observableUsuarios = this.firestore.obtenerUsuarios();
    this.listaUsuarios = await firstValueFrom(observableUsuarios)
    this.obtenerListas();
    setTimeout(() => {
      this.spinner.hide()
    }, 100);
  }

  obtenerListas()
  {
    this.listaAdministradores = this.listaUsuarios.filter((usuario) => usuario.tipoUsuario == "Administrador");
    this.listaPacientes = this.listaUsuarios.filter((usuario) => usuario.tipoUsuario == "Paciente");
    this.listaEspecialistas = this.listaUsuarios.filter((usuario) => usuario.tipoUsuario == "Especialista");
  }

  elegirUsuario(usuario:any)
  {
    this.eventoRepartidor.emit(usuario);
  }

  async activarDesactivarEspecialista(especialista:any)
  {

    this.spinner.show();
    await this.firestore.actualizarEstadoEspecialista(especialista.uid,!especialista.estaActivo);
    setTimeout(() => {
      especialista.estaActivo = !especialista.estaActivo;
      this.spinner.hide();
    }, 300);
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
