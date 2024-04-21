import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, firstValueFrom } from 'rxjs';
import { Turno } from 'src/app/interfaces/Turnos';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.css']
})
export class VerTurnosComponent implements OnInit,OnDestroy
{

  public turnosDisponibles:Turno[] = [];
  public suscripcionTurnos!: Subscription;
  public suscripcionUsuarios!: Subscription;
  public tipoFiltrado: string = "Especialidad";
  public palabraBusqueda:string = ""
  public todosUsuarios: any[] = [];


  constructor(private firestore:FirestoreService,private spinner:NgxSpinnerService)
  {

  }

  ngOnInit()
  {
    this.suscripcionTurnos = this.firestore.obtenerTurnos().subscribe(async turnos =>
    {
      this.spinner.show();

      setTimeout(async () => {
        if(this.verificarId(turnos[0].idTurno))
        {
          this.turnosDisponibles = this.turnosDisponibles.concat(turnos);          
        }
        else
        {
          this.turnosDisponibles = await firstValueFrom(this.firestore.obtenerTurnos());
        }
        this.spinner.hide();        
      }, 500);
    })

    this.suscripcionUsuarios = this.firestore.obtenerUsuarios().subscribe(usuarios =>
    {
      this.todosUsuarios = this.todosUsuarios.concat(usuarios);
    })
  }
  
  ngOnDestroy()
  {
    this.suscripcionTurnos.unsubscribe();
    this.suscripcionUsuarios.unsubscribe();
  }

  verificarBusqueda(turno:Turno)
  {
    if(this.tipoFiltrado == "Especialidad")
    {
      return (turno.especialidad.toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
    }

    return (this.obtenerApellidoNombre(turno.uidEspecialista).toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
  }

  private verificarId(id:number)
  {
    for (let i = 0; i < this.turnosDisponibles.length; i++) 
    {
      if(this.turnosDisponibles[i].idTurno == id)
      {
        return false;
      }
    }

    return true;
  }

  public cambiarTipoFiltro(tipoNuevo:string)
  {
    this.tipoFiltrado = tipoNuevo;
  }

  obtenerApellidoNombre(uid:string)
  {
    for (let i = 0; i < this.todosUsuarios.length; i++) {
      if(this.todosUsuarios[i].uid == uid)
      {
        return this.todosUsuarios[i].nombre + " " + this.todosUsuarios[i].apellido
      }      
    }

    return "Usuario no encontrado";
  }
  
  obtenerFechaYHora(horario:any)
  {
    let horarioTurno : Date = horario.toDate()

    return horarioTurno.toLocaleString().slice(0,-3).replace(",","");
  }

  cancelarTurno(turnoSeleccionado:Turno)
  {
    swal.fire
    (
      {
          title: "Cancelar Turno",
          text: "Por favor escriba un comentario del porque cancela el turno",
          input: "text",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          inputValidator: comentario => 
          {
              if (!comentario) 
              {
                  return "Por favor escribe su comentario";
              } 
              else 
              {
                  return false;
              }
          }
      })
      .then(resultado => 
        {
          if (resultado.value) 
          {
            swal.fire
            (
              {
                title:"¿Seguro qué desea cancelar el turno? Está acción no se puede deshacer",
                text:"Comentario: " + resultado.value,
                showCancelButton: true,
                confirmButtonText: "Cancelar Turno",
                confirmButtonColor: "red",
                cancelButtonText: "Cancelar Operacion",
              }
            ).then(async resultadoDos =>
              {
                if(resultadoDos.isConfirmed)
                {
                  const reseñaDueño = "(comentario hecho por el Administrador " + this.firestore.datosUsuarioActual.nombre + " " + this.firestore.datosUsuarioActual.apellido + " operación: cancelación)";
                  const reseñaDada = '"'+ resultado.value + '"\n' + reseñaDueño;
                  const datos =
                  {
                    reseña:reseñaDada,
                    estadoTurno:"Cancelado"
                  }
                  swal.fire("Turno cancelado con éxito","","success");
                  await this.firestore.editarTurnos(turnoSeleccionado.idTurno,datos);
                }
                else
                {
                  swal.fire("Operación cancelada con éxito","","error");
                }
              })
          }
      }
    );
  }

  // async obtenerNombresEspecialistasPacientes(turnos:any[])
  // {
  //   let especialistaAux;
  //   let pacienteAux;
  //   let especialistaNombreApellido;
  //   let pacienteNombreApellido;

  //   for(let i = 0;i<turnos.length;i++)
  //   {
  //     especialistaAux = await this.firestore.obtenerUsuariosEspecificos("uid",turnos[i].uidEspecialista);
  //     pacienteAux = await this.firestore.obtenerUsuariosEspecificos("uid",turnos[i].uidPaciente);

  //     especialistaNombreApellido = especialistaAux[0].nombre + " " + especialistaAux[0].apellido;
  //     pacienteNombreApellido = pacienteAux[0].nombre + " " + pacienteAux[0].apellido;

  //     this.nombresEspecialistas.push(especialistaNombreApellido);
  //     this.nombresPacientes.push(pacienteNombreApellido);
  //   }
  // }

}
