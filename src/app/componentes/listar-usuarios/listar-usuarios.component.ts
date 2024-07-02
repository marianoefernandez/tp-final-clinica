import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2'

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
  public tipoUsuario = "Pacientes"
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

  cambiarTipoUsuario(tipoNuevo:string)
  {

    if(tipoNuevo != this.tipoUsuario)
    {
      this.spinner.show();
      setTimeout(() => {
        this.tipoUsuario = tipoNuevo; 
        this.spinner.hide();   
      }, 900); 
    }
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

  public mostrarHistoriaClinica(paciente:any)
  {
    if(paciente.historiaClinica)
    {
      let datosDinamicos = "";

      switch(paciente.historiaClinica.datosDinamicos.length)
      {
        case 0:
          datosDinamicos += "<h3>No hay ningun dato dinámico cargado</h3>"
          break;
        case 1:
          datosDinamicos += 
          `<h3>${paciente.historiaClinica.datosDinamicos[0].clave}: ${paciente.historiaClinica.datosDinamicos[0].valor}</h3>`
          break;
        case 2:
          datosDinamicos += 
          `<h3>${paciente.historiaClinica.datosDinamicos[0].clave}: ${paciente.historiaClinica.datosDinamicos[0].valor}</h3>
           <h3>${paciente.historiaClinica.datosDinamicos[1].clave}: ${paciente.historiaClinica.datosDinamicos[1].valor}</h3>`          
          break;
        case 3:
          datosDinamicos += 
          `<h3>${paciente.historiaClinica.datosDinamicos[0].clave}: ${paciente.historiaClinica.datosDinamicos[0].valor}</h3>
           <h3>${paciente.historiaClinica.datosDinamicos[1].clave}: ${paciente.historiaClinica.datosDinamicos[1].valor}</h3>
           <h3>${paciente.historiaClinica.datosDinamicos[2].clave}: ${paciente.historiaClinica.datosDinamicos[2].valor}</h3>
           `          
          break;
      }

      swal.fire(
        {
          title:`Historia clinica del paciente ${paciente.nombre} ${paciente.apellido}.`,
          html:
          `
          <h1>Datos Fijos</h1>
          <br>
          <h3>Altura: ${paciente.historiaClinica.altura} cm </h3>
          <h3>Peso: ${paciente.historiaClinica.peso} kg </h3>
          <h3>Temperatura: ${paciente.historiaClinica.temperatura} °C </h3>
          <h3>Presión: ${paciente.historiaClinica.presion} mmHg </h3>

          <br><br>
          <h1>Datos Dinámicos</h1>
          ${datosDinamicos}
          `
        }
      )
    }
  }

  
  
}
