import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EspecialistaHorario, Horario, DiasHorario} from 'src/app/interfaces/Horarios';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-registrar-horarios',
  templateUrl: './registrar-horarios.component.html',
  styleUrls: ['./registrar-horarios.component.css']
})
export class RegistrarHorariosComponent 
{
  public horariosSabados : any[] = this.inicializarHorario("Sábado");
  public horariosDiaSemana : any[] = this.inicializarHorario("Lunes");
  public diasSemana : string [] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"]
  public diasRestantes : string [] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"]

  public diaSemana : string = "";
  public horarios : Horario[] = [];
  public mensajeHorarios : string = "";
  public horarioUsuario : EspecialistaHorario | null = null;
  //public flagAltaHorarios = false;
  public accion = "ver";
  //cantidadConsultorios : number[] = [1,2,3,4,5,6];
  // consultorio : number = 0;


  constructor(private spinner:NgxSpinnerService, private autenticacion:AutenticacionService, private firestore:FirestoreService)
  {

  }

  public async ngOnInit()
  {
    this.horarioUsuario = await this.firestore.obtenerHorarioUsuario(this.autenticacion.usuarioActual.uid);
    console.log(this.horarioUsuario);

    if(this.horarioUsuario != null && this.horarioUsuario?.diasHorarios.length != 0)
    {
      this.eliminarDiasRestantes();
    }
    else
    {
      this.horarioUsuario = null
    }
  }

  private eliminarDiasRestantes()
  {
    if(this.horarioUsuario != null)
    {
      for(let i = 0; i < this.horarioUsuario.diasHorarios.length; i++)
      {
        this.diasRestantes.splice(this.diasRestantes.indexOf(this.horarioUsuario.diasHorarios[i].dia),1);
      }
    }
  }

  public async lanzarSpinner(tiempo:number)
  {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, tiempo);
  }

  public darDeAltaHorario()
  {
    this.spinner.show();
    setTimeout(async () => 
    {
      let horariosTotal: Horario[]; 
      let diasHorarios: DiasHorario[];
      
      if(this.horarioUsuario != null)
      {
        diasHorarios = this.horarioUsuario.diasHorarios;
        horariosTotal = this.asignarDisponibilidad(this.inicializarHorario(this.diaSemana));
        diasHorarios.push({dia:this.diaSemana,horarios:horariosTotal});
        this.horarioUsuario = {uid:this.autenticacion.usuarioActual.uid,diasHorarios};
        await this.firestore.editarHorarios(this.horarioUsuario.uid,this.horarioUsuario.diasHorarios);
      }
      else
      {
        horariosTotal = this.asignarDisponibilidad(this.inicializarHorario(this.diaSemana));
        diasHorarios = [{dia:this.diaSemana,horarios:horariosTotal}];
        this.horarioUsuario = {uid:this.autenticacion.usuarioActual.uid,diasHorarios};
        await this.firestore.agregarHorarios(this.horarioUsuario);
      }
      this.diasRestantes.splice(this.diasRestantes.indexOf(this.diaSemana),1);
      this.cambiarAccion("ver","");
      this.spinner.hide();
    }, 500);
  }

  public editarHorario()
  {
    let horariosTotal = this.asignarDisponibilidad(this.inicializarHorario(this.diaSemana));
    let indice = this.buscarHorario(this.diaSemana);
    if(indice != null && this.horarioUsuario != null)
    {
      this.horarioUsuario.diasHorarios[indice].horarios = horariosTotal;
      this.firestore.editarHorarios(this.autenticacion.usuarioActual.uid,this.horarioUsuario.diasHorarios);
    }
    this.cambiarAccion("ver","");
  }

  public buscarHorario(dia:string)
  {
    if(this.horarioUsuario != null)
    {
      for(let i = 0; i<this.horarioUsuario.diasHorarios.length; i++)
      {
        if(dia == this.horarioUsuario.diasHorarios[i].dia)
        {
          return i;
        }
      }
    }
    return null;
  }

  public borrarHorario()
  {
    
    let indice = this.buscarHorario(this.diaSemana);

    swal.fire(
    {
      title: "¿Estás seguro qué quieres borrar los horarios del día " + this.diaSemana + "?",
      showCancelButton: true,
      confirmButtonText: "Eliminar"
    }).then((resultado) => 
    {
      if(resultado.isConfirmed) 
      {
        if(indice != null && this.horarioUsuario != null)
        {
          this.horarioUsuario.diasHorarios.splice(indice,1);
          this.firestore.editarHorarios(this.autenticacion.usuarioActual.uid,this.horarioUsuario.diasHorarios);
    
          if(this.horarioUsuario.diasHorarios.length == 0)
          {
            this.horarioUsuario = null;
          }
          this.diasRestantes.push(this.diaSemana);
        }
      }
      this.cambiarAccion("ver",""); 
    });
  }

  private asignarDisponibilidad(horariosTotal:any)
  {
    for(let i = 0; i<this.horarios.length;i++)
    {
      for(let j = 0; j<horariosTotal.length;j++)
      {
        if(this.horarios[i].hora == horariosTotal[j].hora)
        {
          horariosTotal[j].estaActivo = true;
          break;
        }
      }
    }
    return horariosTotal;
  }

  public cambiarAccion(accionNueva:string,dia:any)
  {
    this.spinner.show();
    setTimeout(() => {
      this.accion = accionNueva;
      if(this.accion == "alta")
      {
        this.reiniciarInputs();
      }
      else
      {
        if(this.accion == "editar-eliminar")
        {
          this.diaSemana = dia.dia;
        }
      }
      this.spinner.hide();     
    }, 500);
  }

  private reiniciarInputs()
  {
    this.horarios = [];
    this.mensajeHorarios = "";
    this.diaSemana = "";
    //this.consultorio = 0;
  }

  public mostrarHorarioSeleccionado()
  {
    this.mensajeHorarios = this.obtenerHorario();
  }

  public obtenerHorario()
  {
    let horario = "";
    
    for(let i = 0; i < this.horarios.length; i++)
    {
      horario += this.horarios[i].hora

      if(i != (this.horarios.length - 1))
      {
        horario += "-";
      }
    }

    return horario;
  }

  private inicializarHorario(diaSemana:string)
  {
    //Hardcodeo la información por defecto

    if(diaSemana == "Sábado")
    {
      let horariosSabados : Horario [] =
      [
        {hora:"8:00",estaActivo:false},
        {hora:"8:30",estaActivo:false},
        {hora:"9:00",estaActivo:false},
        {hora:"9:30",estaActivo:false},
        {hora:"10:00",estaActivo:false},
        {hora:"10:30",estaActivo:false},
        {hora:"11:00",estaActivo:false},
        {hora:"11:30",estaActivo:false},
        {hora:"12:00",estaActivo:false},
        {hora:"12:30",estaActivo:false},
        {hora:"13:00",estaActivo:false},
        {hora:"13:30",estaActivo:false},
        {hora:"14:00",estaActivo:false}
      ]

      return horariosSabados;
    }
    else
    {
      let horariosDiaSemana : Horario [] =
      [
        {hora:"8:00",estaActivo:false},
        {hora:"8:30",estaActivo:false},
        {hora:"9:00",estaActivo:false},
        {hora:"9:30",estaActivo:false},
        {hora:"10:00",estaActivo:false},
        {hora:"10:30",estaActivo:false},
        {hora:"11:00",estaActivo:false},
        {hora:"11:30",estaActivo:false},
        {hora:"12:00",estaActivo:false},
        {hora:"12:30",estaActivo:false},
        {hora:"13:00",estaActivo:false},
        {hora:"13:30",estaActivo:false},
        {hora:"14:00",estaActivo:false},
        {hora:"14:30",estaActivo:false},
        {hora:"15:00",estaActivo:false},
        {hora:"15:30",estaActivo:false},
        {hora:"16:00",estaActivo:false},
        {hora:"16:30",estaActivo:false},
        {hora:"17:00",estaActivo:false},
        {hora:"17:30",estaActivo:false},
        {hora:"18:00",estaActivo:false},
      ]
      return horariosDiaSemana;
    }
  }
}
