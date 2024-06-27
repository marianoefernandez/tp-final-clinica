import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Subscription, firstValueFrom } from 'rxjs';
import { Hora } from 'src/app/interfaces/Horarios';
import { Turno } from 'src/app/interfaces/Turnos';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})

export class SolicitarTurnoComponent implements OnInit,OnDestroy
{
  public especialidadesRegistradas : string[] = [];
  public especialidadSeleccionada : string = "";
  public especialistasDisponibles : any[] = [];
  public especialistaSeleccionado : any = null;
  public horariosEspecialista : any = null;
  public diasEspecialista : string[] = [];
  public diasDisponibles : any[] = [];
  public diaElegido : any = null;
  public horarioDiaElegido : any [] | null = null;
  public flagDiasCargados = false;
  public horariosNoDisponibles : Hora[] = []
  public suscripcionTurnos!: Subscription;
  public suscripcionPacientes!: Subscription;
  public flagAgregado = true;
  public flagInicio : boolean | null = true;
  public CANTIDADCONSULTORIOS : number = 6;
  public pacienteTurno : any = null;
  public listaPacientes:any[] = [];
  private listaNombresPacientes : any[] = [];
  public listaFiltrada : any [] = [];
  public terminoBusqueda$ = new Subject<string>();
  public flagBuscador : boolean = true;
  


  // public turnosCargados : any[] = []

  constructor(private autenticacion:AutenticacionService,public firestore:FirestoreService,private spinner:NgxSpinnerService)
  {
    
  }

  async ngOnInit()
  {
    this.especialistasDisponibles = await this.firestore.obtenerUsuariosEspecificos('tipoUsuario','Especialista');
    this.especialidadesRegistradas = this.obtenerEspecialidades();
    //this.turnosCargados = await firstValueFrom(this.firestore.obtenerTurnos());
    this.suscripcionTurnos = this.firestore.obtenerTurnos().subscribe(async turnos=>
    {
      if(this.flagAgregado)
      {
        this.obtenerHorariosNoDisponibles(turnos);
        this.flagAgregado = false;
      }
      else
      {
        this.horariosNoDisponibles = [];
        const turnosFirebase = await firstValueFrom(this.firestore.obtenerTurnos());
        this.obtenerHorariosNoDisponibles(turnosFirebase);
      }
      console.log(this.horariosNoDisponibles);
    });

    if(this.firestore.datosUsuarioActual.tipoUsuario == "Paciente")
    {
      this.pacienteTurno = this.firestore.datosUsuarioActual;
    }

    this.suscripcionPacientes = this.firestore.obtenerUsuariosPorTipo("Paciente").subscribe(pacientes =>
    {
      //this.listaPacientes = pacientes.slice(0);
      this.listaPacientes = this.listaPacientes.concat(pacientes);
      this.obtenerNombresPacientes();
      this.listaFiltrada = this.listaNombresPacientes;
      this.filtrarListaBuscador();
    });

  }

  ngOnDestroy()
  {
    this.suscripcionTurnos.unsubscribe();
    this.suscripcionPacientes.unsubscribe();
  }

  volverAtras()
  {
    this.spinner.show();
    setTimeout(() => {
      this.flagDiasCargados = false;   
      this.spinner.hide();   
    }, 1200);
  }

  activarBuscador()
  {
    this.flagBuscador = false;
  }

  desactivarBuscador(evento: any)
  {
    this.flagBuscador = true;
  }

  cambioBusqueda($evento:any)
  {
    this.terminoBusqueda$!.next($evento.target.value)
  }

  filtrarListaBuscador(): void 
  {
    this.terminoBusqueda$.subscribe(term => {
      this.listaFiltrada = this.listaNombresPacientes
        .filter(item => item.nombreCompleto.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }


  private obtenerNombresPacientes()
  {
    let nombre;
    let apellido;
    let nombreCompleto;
    let uid

    for (let i = 0; i < this.listaPacientes.length; i++)
    {
      nombre = this.listaPacientes[i].nombre;
      apellido = this.listaPacientes[i].apellido;
      uid = this.listaPacientes[i].uid;
      nombreCompleto = nombre + " " + apellido;

      this.listaNombresPacientes.push({nombreCompleto:nombreCompleto,uid:uid});
    }
  }

  public elegirPaciente(uid:string)
  {
    let paciente;
    this.spinner.show();
    setTimeout(async () => {
      paciente = await this.firestore.obtenerUsuariosEspecificos('uid',uid);
      this.pacienteTurno = paciente[0];
      this.flagBuscador = true;
      this.spinner.hide();
    }, 200);
  }

  private obtenerHorariosNoDisponibles(turnos:any[])
  {
    let diaTurno : Date;
    let hora:string = ""
    let objetoHora : Hora;

    for(let i = 0;i<turnos.length;i++)
    {
      if(turnos[i].estadoTurno == "Pendiente" || turnos[i].estadoTurno == "Realizado" || turnos[i].estadoTurno == "Aceptado")
      {
        diaTurno = turnos[i].horarioTurno.toDate();
        hora = diaTurno.getHours().toString() + ":" + diaTurno.getMinutes().toString();
  
        if(diaTurno.getMinutes() == 0)
        {
          hora += 0;
        }
  
        objetoHora =           
        {
          dia:diaTurno.getDate(),
          mes:diaTurno.getMonth() + 1,
          anio:diaTurno.getFullYear(),
          hora:hora,
          uidEspecialista:turnos[i].uidEspecialista
        }
  
        this.horariosNoDisponibles.push(objetoHora)
        this.flagAgregado = false;
      }
    }
  }

  public verificarDisponibilidad(dia:any,hora:string)
  {
    let contador = this.contarConsultorios(dia,hora);

    console.log(dia);

    if(contador == this.CANTIDADCONSULTORIOS)
    {
      return false;
    }

    for(let i = 0; i<this.horariosNoDisponibles.length; i++)
    {
      if(this.horariosNoDisponibles[i].dia == dia.dia && this.horariosNoDisponibles[i].hora == hora && this.horariosNoDisponibles[i].uidEspecialista == this.especialistaSeleccionado.uid)
      {
        return false;
      }
    }

    return true;
  }

  public contarConsultorios(dia:any,hora:string)
  {
    let contador = 0;
    for(let i = 0; i<this.horariosNoDisponibles.length; i++)
    {
      if(this.horariosNoDisponibles[i].dia == dia.dia && this.horariosNoDisponibles[i].hora == hora)
      {
        contador++;
      }
    }
    
    return contador;
  }


  private obtenerEspecialidades()
  {
    let especialidades : string[] = [];
    for(let i = 0; i<this.especialistasDisponibles.length; i++)
    {
      if(this.especialistasDisponibles[i].estaActivo)
      {
        let especialidadesString:string[] = [];
        for(let j = 0; j<this.especialistasDisponibles[i].especialidad.length; j++)
        {
          especialidadesString.push(this.especialistasDisponibles[i].especialidad[j].especialidad);
        }
        especialidades = especialidades.concat(especialidadesString);
      }
    }

    //Elimino los repetidos
    const setEspecialidades = new Set(especialidades);
    especialidades = [...setEspecialidades];
    
    return especialidades
  }

  obtenerEspecialistasPorEspecialidad(especialidad:string)
  {
    let especialistasEncontrados:any[] = [];

    for(let i = 0; i<this.especialistasDisponibles.length; i++)
    {
      if(this.especialistasDisponibles[i].estaActivo)
      {
        for(let j = 0; j<this.especialistasDisponibles[i].especialidad.length; j++)
        {
          if(this.especialistasDisponibles[i].especialidad[j].especialidad == especialidad)
          {
            especialistasEncontrados.push(this.especialistasDisponibles[i]);
          }
        }
      }
    }

    return especialistasEncontrados;
  }

  obtenerHorariosDiaSeleccionado(dia:any)
  {    
    let diaString = this.obtenerDiaPorNumero(dia.diaSemana);

    for(let i = 0;i<this.horariosEspecialista.diasHorarios.length;i++)
    {
      if(this.horariosEspecialista.diasHorarios[i].dia == diaString)
      {
        return this.horariosEspecialista.diasHorarios[i].horarios;
      }
    }

    return null;
  }

  inicializarPagina()
  {
    if(this.horariosNoDisponibles.length == 0 && this.flagInicio)
    {
      this.spinner.show();
      this.flagInicio = false
    }
    else
    {
      if(this.flagInicio == false && this.horariosNoDisponibles.length > 0)
      {
        this.spinner.hide();
        this.flagInicio = null;
      }
    }
  }

  async lanzarSpinner(tiempo:number)
  {
    if(this.especialidadSeleccionada != "")
    {
      this.spinner.show();
       
      setTimeout(() => {
        this.spinner.hide();
      }, tiempo);
    }
  }

  public obtenerDias()
  {
    let listaDias : string [] = [];
    if(this.horariosEspecialista != null)
    {
      for(let i = 0; i<this.horariosEspecialista.diasHorarios.length; i++)
      {
        listaDias.push(this.horariosEspecialista.diasHorarios[i].dia);
      }
    }
    return listaDias;
  }

  public formatearDiasEnTexto(dias:string[])
  {
    let diasString = "";
    for(let i = 0; i<dias.length; i++)
    {
      diasString += dias[i];

      if(i != dias.length - 1)
      {
        diasString += "-";
      }
    }

    return diasString;
  }
  

  public obtenerProximosDias(cantidadDias:number)
  { 
    let dia = new Date();
    let dias : any = []
    // let iteracion = true;

    for(let i = 0;i<cantidadDias;i++)
    {
      // iteracion = true;
      // while(iteracion)
      // {
        dia.setDate(dia.getDate() + 1);
        for(let j = 0; j<this.diasEspecialista.length;j++)
        {
          if(this.obtenerNumeroDia(this.diasEspecialista[j]) == dia.getDay())
          { 
            let diaTurno =
            {
              dia:dia.getDate(),
              mes:dia.getMonth() + 1,
              anio:dia.getFullYear(),
              diaSemana:dia.getDay()
            } 
            dias.push(diaTurno);
            // iteracion = false;
          }
        }
      // }
    }

    return dias
  }

  public elegirTurno(dia:any,hora:any)
  {
    this.spinner.show();
    const horaRegistro = hora.split(":");
    const diaRegistro = new Date(dia.anio,dia.mes-1,dia.dia,parseInt(horaRegistro[0]),parseInt(horaRegistro[1]));
    console.log(diaRegistro);
    setTimeout(async () => 
    {
      const idTurno = await this.firestore.obtenerId('idTurnos');
      const turno : Turno = 
      {
        idTurno:idTurno,
        uidPaciente:this.pacienteTurno.uid,
        uidEspecialista:this.especialistaSeleccionado.uid,
        consultorio:0,
        horarioTurno:diaRegistro,
        estadoTurno:'Pendiente',
        reseña:"",
        calificacion:0,
        reseñaPaciente:"",
        especialidad:this.especialidadSeleccionada,
        encuesta: []
      }
      this.flagAgregado = true;
      this.firestore.agregarTurno(turno).then((respuesta)=>
      {
        this.spinner.hide();
        if(respuesta != null)
        {
          swal.fire
          (
            {
              title:"Turno agregado con éxito",
              text:"El turno fue agregado con éxito para el dïa " + dia.dia + "/" + dia.mes + "/" + dia.anio + " y ya fue recibido por el Especialista. Aguarde un tiempo para ver si el mismo es aceptado o rechazado por el mismo. Revise la sección mis turnos para ver el estado del mismo",
              icon:'success'
            }
          ).then(()=>
          {
            this.spinner.show();
            setTimeout(() => {
              this.reiniciarAtributos();  
              this.spinner.hide();            
            }, 500);
          })
        }
        else
        {
          swal.fire
          (
            {
              title:"Error inesperado",
              text:"Hubo un error inesperado al cargar el turno, recargue la página y vuelva a intentarlo",
              icon:'error'
            }
          )
          this.flagAgregado = false;
        }
      });
    }, 100);
  }

  private reiniciarAtributos()
  {
    this.especialidadSeleccionada = "";
    this.especialistaSeleccionado = null;
    this.horariosEspecialista = null;
    this.diasEspecialista = [];
    this.diasDisponibles = [];
    this.diaElegido = null;
    this.horarioDiaElegido = null;
    this.flagDiasCargados = false;
  }

  public obtenerNumeroDia(dia:string)
  {
    switch(dia)
    {
      case "Lunes":
        return 1;
      case "Martes":
        return 2;
      case "Miercoles":
        return 3;
      case "Jueves":
        return 4;
      case "Viernes":
        return 5;
      case "Sábado":
        return 6;
    }
    return 6;
  }

  public obtenerDiaPorNumero(dia:number)
  {
    switch(dia)
    {
      case 1:
        return "Lunes";
      case 2:
        return "Martes";
      case 3:
        return "Miercoles";
      case 4:
        return "Jueves";
      case 5:
        return "Viernes";
      case 6:
        return "Sábado";
    }
    return 6;
  }

  // obtenerArrayDias(cantidadDias:number)
  // {
  //   let dia = new Date();
  //   let dias = []

  //   for(let i = 0;i<cantidadDias;i++)
  //   {
  //     dia.setDate(dia.getDate() + 1);
  //     let diaTurno =
  //     {
  //       dia:dia.getDate(),
  //       mes:dia.getMonth() + 1,
  //       año:dia.getFullYear(),
  //       diaSemana:dia.getDay()
  //     }  

  //     dias.push(diaTurno);
  //   }

  //   return dias;
  // }

  public elegirEspecialista(especialista:any)
  {
    this.flagDiasCargados = false;
    this.spinner.show();
    setTimeout(async () => {
      this.especialistaSeleccionado = especialista;
      this.horariosEspecialista = await this.firestore.obtenerHorarioUsuario(this.especialistaSeleccionado.uid);  
      this.diasEspecialista = this.obtenerDias();   
      this.diasDisponibles = this.obtenerProximosDias(15);
      this.diaElegido = null;
      this.horarioDiaElegido = null;
      this.spinner.hide();
      this.flagDiasCargados = true;
    }, 500);
  }

  // public elegirDia(dia:any)
  // {
  //   // this.spinner.show();
  //   // setTimeout(() => {
  //   //   this.diaElegido = dia;
  //   //   console.log(dia.diaSemana);
  //   //   this.horarioDiaElegido = this.obtenerHorariosDiaSeleccionado(this.diaElegido);
  //   //   this.spinner.hide();
  //   // }, 300);

  //   return this.obtenerHorariosDiaSeleccionado(dia);
  // }
}
