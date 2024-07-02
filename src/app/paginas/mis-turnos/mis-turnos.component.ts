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
  public datosDinamicos : string[] = [];

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

        if(turnos.length > 0)
        {
          if(this.verificarId(turnos[0].idTurno))
          {
            this.turnosDisponibles = this.turnosDisponibles.concat(turnos);          
          }
          else
          {
            this.turnosDisponibles = await firstValueFrom(this.firestore.obtenerTurnosPorUid(this.firestore.datosUsuarioActual.uid,this.firestore.datosUsuarioActual.tipoUsuario));
          }
        }
        this.spinner.hide();        
      }, 500);
    })

    this.suscripcionUsuarios = this.firestore.obtenerUsuarios().subscribe(usuarios =>
    {
      this.todosUsuarios = this.todosUsuarios.concat(usuarios);
      this.obtenerDatosDinamicos();
    })
  }
  
  ngOnDestroy()
  {
    this.suscripcionTurnos.unsubscribe();
    this.suscripcionUsuarios.unsubscribe();
  }

  obtenerDatosDinamicos()
  {
    for (let i = 0; i < this.todosUsuarios.length; i++) {
      const usuario = this.todosUsuarios[i];

      if(usuario.historiaClinica && usuario.historiaClinica.datosDinamicos.length)
      {
        for (let j = 0; j < usuario.historiaClinica.datosDinamicos.length; j++) {
          const historia = usuario.historiaClinica.datosDinamicos[j];
          this.datosDinamicos.push(historia.clave.charAt(0).toUpperCase() + historia.clave.slice(1));
        }
      }
    }

    const set = new Set(this.datosDinamicos);

    this.datosDinamicos = [...set];
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

    const historiaClinica = this.ObtenerHistoriaClinica(turno.uidPaciente);

    switch(this.tipoFiltrado)
    {
      case "Especialidad":
        return (turno.especialidad.toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
      case "Paciente":
       return (this.obtenerApellidoNombre(turno.uidPaciente).toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
      case "Fecha":
        const fecha : any = turno.horarioTurno;
        return (fecha.toDate().toLocaleDateString("en-GB").indexOf(this.palabraBusqueda.toLowerCase()) >=0);
      case "Hora":
        const hora : any = turno.horarioTurno;
        return (hora.toDate().toLocaleTimeString("en-GB").slice(0,-3).indexOf(this.palabraBusqueda.toLowerCase()) >=0);
      case "Estado":
        return (turno.estadoTurno.toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
      case "Altura":
        if(historiaClinica != null)
        {
          return (historiaClinica.altura.toString().toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
        }
        return false;
      case "Peso":
        if(historiaClinica != null)
        {
          return (historiaClinica.peso.toString().toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
        }
        return false;
      case "Temperatura":
        if(historiaClinica != null)
        {
          return (historiaClinica.temperatura.toString().toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
        }
        return false;
      case "Presión":
        if(historiaClinica != null)
        {
          return (historiaClinica.presion.toString().toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
        }
        return false;
      default:
        if(historiaClinica != null && historiaClinica.datosDinamicos)
          {
            let clave = this.tipoFiltrado.toLowerCase();

            for (let i = 0; i < historiaClinica.datosDinamicos.length; i++) {
              const dinamico = historiaClinica.datosDinamicos[i];
              if(dinamico.clave == clave)
              {
                return (dinamico.valor.toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0); 
              }
            }

            return true
          }
        return false;
    }

    return (this.obtenerApellidoNombre(turno.uidEspecialista).toLowerCase().indexOf(this.palabraBusqueda.toLowerCase()) >=0);
  }

  ObtenerHistoriaClinica(uid:string)
  {
    for (let i = 0; i < this.todosUsuarios.length; i++) {
      if(this.todosUsuarios[i].uid == uid)
      {
        if(this.todosUsuarios[i].historiaClinica)
        {
          return this.todosUsuarios[i].historiaClinica
        }
      }      
    }

    return null;
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

    return horarioTurno.toLocaleString("en-GB").slice(0,-3).replace(",","");
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
    const formulario = await swal.fire
    (
      {
        title:"Califica la atención del especialista " + this.obtenerApellidoNombre(turnoSeleccionado.uidEspecialista),
        html: `
          <label for="swal-input1">¿Qué te parecio la atención de ${this.obtenerApellidoNombre(turnoSeleccionado.uidEspecialista)}?</label>
          <input id="swal-input1" class="swal2-input" type="text">
  
          <label for="swal-input2">Califica la experiencia del 1 al 10</label>
          <select name="swal-input2" id="swal-input2" class="swal2-input">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
  
        `,
        focusConfirm: false,
        showCancelButton:true,
        cancelButtonText:"Cancelar",
        preConfirm: () => {
          return [
            (document.getElementById("swal-input1") as HTMLInputElement).value,
            (document.getElementById("swal-input2") as HTMLInputElement).value,
          ];
        }
      }
    )

    if (formulario.value[0] != "") 
    {
      swal.fire({
        title: "Confirmar calificación",
        text: "¿Está seguro qué desea presentar está calificación, está acción no se puede deshacer?\n Comentario:" + formulario.value[0]+ "\n Calificiación: " + formulario.value[1] + "/10",
        icon: "question",
        showDenyButton:true,
        showCancelButton:true,
        denyButtonText:"Volver atras",
        confirmButtonText:"Aceptar",
        cancelButtonText:"Cancelar"
    }).then((respuesta) => 
      {
        if(respuesta.isConfirmed)
        {
          swal.fire({
            title: "Atencion calificada con exito!",
            text: "Gracias por calificar a " + this.obtenerApellidoNombre(turnoSeleccionado.uidEspecialista),
            icon: "success",
        }).then(() => 
          {
            this.firestore.editarTurnos(turnoSeleccionado.idTurno,
              {
                reseñaPaciente:formulario.value[0],
                calificacion:parseInt(formulario.value[1])
              })
          });
        }
        else
        {
          if(respuesta.isDenied)
          {
            this.calificarAtencion(turnoSeleccionado);
          }
        }
      });
    }
    else
    {
      swal.fire({
        title: "No deberia quedar vacio el mensaje",
        text: `Por favor completar nuevamente`,
        icon: "error",
    }).then(()=>
      {
        this.calificarAtencion(turnoSeleccionado);
      })
    }
  }

  async realizarEncuesta(turnoSeleccionado:Turno)
  {
    const formulario = await swal.fire
    (
      {
        title:"Encuesta de finalización",
        html: `
          <label for="swal-input1">1.Califica en una escala del 1 al 10 como sentiste con la interfaz del usuario navegando en la página</label>
          <select name="swal-input1" id="swal-input1" class="swal2-input">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
  
          <label for="swal-input2">2.Califica en una escala del 1 al 10 tu experiencia al pedir un turno</label>
          <select name="swal-input2" id="swal-input2" class="swal2-input">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <label for="swal-input3">3.Califica en una escala del 1 al 10 la calidad de las intalaciones de la clinica</label>
          <select name="swal-input3" id="swal-input3" class="swal2-input">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <label for="swal-input4">4.¿Quê cosas deberiamos mejorar en la clinica? (Ya sea en el edificio como en la página web)</label>
          <input id="swal-input4" class="swal2-input" type="text">
        `,
        focusConfirm: false,
        showCancelButton:true,
        cancelButtonText:"Cancelar",
        preConfirm: () => {
          return [
            (document.getElementById("swal-input1") as HTMLInputElement).value,
            (document.getElementById("swal-input2") as HTMLInputElement).value,
            (document.getElementById("swal-input3") as HTMLInputElement).value,
            (document.getElementById("swal-input4") as HTMLInputElement).value
          ];
        }
      }
    )

    if (formulario.value[3] != "") 
    {
      swal.fire({
        title: "Confirmar encuesta",
        text: "¿Está seguro qué desea presentar está encuesta, está acción no se puede deshacer?\n 1):" + formulario.value[0]+ "/10\n 2): " + formulario.value[1] + "/10\n " + formulario.value[2] + "/10\n 4) " + formulario.value[3],
        icon: "question",
        showDenyButton:true,
        showCancelButton:true,
        denyButtonText:"Volver atras",
        confirmButtonText:"Aceptar",
        cancelButtonText:"Cancelar"
    }).then((respuesta) => 
      {
        if(respuesta.isConfirmed)
        {
          swal.fire({
            title: "Encuesta realizada con exito!",
            text: "Gracias por completar la encuesta , esperemos que hayas tenido una excelente atención en la clinica",
            icon: "success",
        }).then(() => 
          {
            this.firestore.editarTurnos(turnoSeleccionado.idTurno,
              {
                encuesta:formulario.value
              })
          });
        }
        else
        {
          if(respuesta.isDenied)
          {
            this.realizarEncuesta(turnoSeleccionado);
          }
        }
      });
    }
    else
    {
      swal.fire({
        title: "No deberia quedar vacio el mensaje",
        text: `Por favor completar nuevamente`,
        icon: "error",
    }).then(()=>
      {
        this.realizarEncuesta(turnoSeleccionado);
      })
    }
  }

  validarResenia(turno:Turno)
  {
    return turno.reseña.length > 0
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
