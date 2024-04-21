import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, firstValueFrom } from 'rxjs';
import { Turno } from 'src/app/interfaces/Turnos';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit,OnDestroy
{

  public turnosDisponibles:Turno[] = [];
  public suscripcionTurnos!: Subscription;
  public suscripcionUsuarios!: Subscription;
  public tipoFiltrado: string = "Especialidad";
  public consultoriosRestantes = [];
  public palabraBusqueda:string = ""
  public todosUsuarios: any[] = [];


  constructor(public firestore:FirestoreService,private spinner:NgxSpinnerService, private router:Router)
  {

  }

  ngOnInit()
  {
    this.inicializarPagina();

    this.suscripcionTurnos = this.firestore.obtenerTurnosPorUid(this.firestore.datosUsuarioActual.uid,this.firestore.datosUsuarioActual.tipoUsuario).subscribe(async turnos =>
    {
      this.spinner.show();
      setTimeout(async () => {
        if(this.verificarId(turnos[0].idTurno))
        {
          this.turnosDisponibles = this.turnosDisponibles.concat(turnos);          
        }
        else
        {
          this.turnosDisponibles = await firstValueFrom(this.firestore.obtenerTurnosPorUid(this.firestore.datosUsuarioActual.uid,this.firestore.datosUsuarioActual.tipoUsuario));
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

  inicializarPagina()
  {
    if(this.firestore.datosUsuarioActual.tipoUsuario == "Administrador")
    {
      this.navigate("bienvenido/turnos/ver-turnos");
    }

    return true;
  }

  verificarBusqueda(turno:Turno)
  {
    if(this.tipoFiltrado == "Especialidad")
    {
      return (turno.especialidad.toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
    }
    else
    {
      if(this.tipoFiltrado == "Paciente")
      {
        return (this.obtenerApellidoNombre(turno.uidPaciente).toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
      }
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

  mostrarComentario(turnoSeleccionado:Turno)
  {
    let mensajito = turnoSeleccionado.estadoTurno == "Cancelado" ? "cancelación" : "rechazo";

    if(turnoSeleccionado.estadoTurno == "Cancelado" || turnoSeleccionado.estadoTurno == "Rechazado")
    {
      swal.fire
      (
        {
          title:"Comentario por " + mensajito,
          text:turnoSeleccionado.reseña,
          icon:"warning"
        }
      )
    }
    else
    {
      swal.fire
      (
        {
          title:"Reseña por finalización",
          text:turnoSeleccionado.reseña,
          icon:"info"
        }
      )
    }
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
                  const reseñaDueño = "(comentario hecho por el " + this.firestore.datosUsuarioActual.tipoUsuario + " " + this.firestore.datosUsuarioActual.nombre + " " + this.firestore.datosUsuarioActual.apellido + " operación: cancelación)";
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

  rechazarTurno(turnoSeleccionado:Turno)
  {
    swal.fire
    (
      {
          title: "Rechazar Turno",
          text: "Por favor escriba un comentario del porque rechaza el turno",
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
                title:"¿Seguro qué desea rechazar el turno? Está acción no se puede deshacer",
                text:"Comentario: " + resultado.value,
                showCancelButton: true,
                confirmButtonText: "Rechazar Turno",
                confirmButtonColor: "red",
                cancelButtonText: "Cancelar Operacion",
              }
            ).then(async resultadoDos =>
              {
                if(resultadoDos.isConfirmed)
                {
                  const reseñaDueño = "(comentario hecho por el " + this.firestore.datosUsuarioActual.tipoUsuario + " " + this.firestore.datosUsuarioActual.nombre + " " + this.firestore.datosUsuarioActual.apellido + " operación: rechazo)";
                  const reseñaDada = '"'+ resultado.value + '"\n' + reseñaDueño;

                  const datos =
                  {
                    reseña:reseñaDada,
                    estadoTurno:"Rechazado"
                  }
                  swal.fire("Turno rechazado con éxito","","success");
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

  async calificarAtencion(turnoSeleccionado:Turno)
  {

  }

  async realizarEncuesta(turnoSeleccionado:Turno)
  {
    
  }

  validarResenia(turno:Turno)
  {
    return turno.reseñaPaciente.length == 0
  }

  finalizarTurno(turnoSeleccionado:Turno)
  {
    swal.fire
    (
      {
          title: "Finalizar Turno",
          text: "Por favor escriba un comentario o reseña de la atención de su paciente",
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
                title:"¿Seguro qué desea finalizar el turno? Está acción no se puede deshacer",
                text:"Comentario: " + resultado.value,
                showCancelButton: true,
                confirmButtonText: "Finalizar Turno",
                confirmButtonColor: "green",
                cancelButtonText: "Cancelar Operacion",
              }
            ).then(async resultadoDos =>
              {
                if(resultadoDos.isConfirmed)
                {
                  const reseñaDueño = "(comentario hecho por el " + this.firestore.datosUsuarioActual.tipoUsuario + " " + this.firestore.datosUsuarioActual.nombre + " " + this.firestore.datosUsuarioActual.apellido + " operación: finalización)";
                  const reseñaDada = '"'+ resultado.value + '"\n' + reseñaDueño;

                  const datos =
                  {
                    reseña:reseñaDada,
                    estadoTurno:"Realizado"
                  }
                  swal.fire("Turno finalizado con éxito","","success");
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

  async verificarConsultoriosRestantes(turnoSeleccionado:any)
  {
    let todosLosTurnos = await firstValueFrom(this.firestore.obtenerTurnos());
    let consultoriosRestantes = [1,2,3,4,5,6];

    for (let i = 0; i < todosLosTurnos.length; i++) 
    {
      if((turnoSeleccionado.horarioTurno.seconds ==  todosLosTurnos[i].horarioTurno.seconds) && todosLosTurnos[i].consultorio != 0)
      {
        consultoriosRestantes.splice(consultoriosRestantes.indexOf(todosLosTurnos[i].consultorio),1);
      }
    }

    return consultoriosRestantes;
  }

  async aceptarTurno(turnoSeleccionado:Turno)
  {
    let consultoriosRestantes = await this.verificarConsultoriosRestantes(turnoSeleccionado);

    swal.fire
    (
      {
          title: "Elegir Consultorio",
          text: "Por favor elija el consultorio en donde va a llevarse a cabo el turno",
          input: "select",
          inputOptions:consultoriosRestantes,
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
      }).then(respuesta =>
        {
          if(respuesta.isConfirmed)
          {
            swal.fire
            (
              {
                title:"¿Seguro qué desea aceptar el turno en el consultorio" + " " +  consultoriosRestantes[respuesta.value] + "? Está acción no se puede deshacer",
                showCancelButton: true,
                confirmButtonText: "Aceptar Turno",
                confirmButtonColor: "green",
                cancelButtonText: "Cancelar Operacion",
                cancelButtonColor: "red"
              }
            ).then(async respuestaDos =>
              {
                if(respuestaDos.isConfirmed)
                {
  
                  const datos =
                  {
                    estadoTurno:"Aceptado",
                    consultorio:consultoriosRestantes[respuesta.value]
                  }
                  swal.fire("Turno aceptado con éxito","","success");
                  await this.firestore.editarTurnos(turnoSeleccionado.idTurno,datos);
                }
                else
                {
                  swal.fire("Operación cancelada con éxito","","error");
                }
              })
          }
        })
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
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
