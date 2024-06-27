import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public diasSemanaSinSabado : any[] = [{dia:"Lunes"},{dia:"Martes"},{dia:"Miercoles"},{dia:"Jueves"},{dia:"Viernes"}]
  public diasRestantes : string [] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"]
  public diasRegistrados : string = "";
  public diaSemana : string = "";
  public horarios : Horario[] = [];
  public mensajeHorarios : string = "";
  public horarioUsuario : EspecialistaHorario | null = null;
  //public flagAltaHorarios = false;
  public accion = "ver";
  public formulario: FormGroup;
  public horariosAgregados : any[] = [{dia:"Lunes",horarios:[]},{dia:"Martes",horarios:[]},{dia:"Miercoles",horarios:[]},{dia:"Jueves",horarios:[]},{dia:"Viernes",horarios:[]},{dia:"Sábado",horarios:[]}]

  //cantidadConsultorios : number[] = [1,2,3,4,5,6];
  // consultorio : number = 0;


  constructor(private spinner:NgxSpinnerService, private autenticacion:AutenticacionService, private firestore:FirestoreService,fb:FormBuilder)
  {
    this.formulario = fb.group({
      horarios:  new FormArray([])
     });
  }

  public async ngOnInit()
  {
    this.horarioUsuario = await this.firestore.obtenerHorarioUsuario(this.autenticacion.usuarioActual.uid);
    console.log(this.horarioUsuario);

    if(this.horarioUsuario != null && this.horarioUsuario?.diasHorarios.length != 0)
    {
      this.eliminarDiasRestantes();
      console.log(this.horarioUsuario);
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
      // let horariosTotal: Horario[]; 
      // let diasHorarios: DiasHorario[];
      console.log(this.horariosAgregados);
      console.log(this.modificarHorarios());
      
      if(this.horarioUsuario != null)
      {
        // diasHorarios = this.horarioUsuario.diasHorarios;
        // horariosTotal = this.asignarDisponibilidad(this.inicializarHorario(this.diaSemana));
        // diasHorarios.push({dia:this.diaSemana,horarios:horariosTotal});
        // this.horarioUsuario = {uid:this.autenticacion.usuarioActual.uid,diasHorarios};
        this.horarioUsuario = this.modificarHorarios();
        await this.firestore.editarHorarios(this.horarioUsuario.uid,this.horarioUsuario.diasHorarios);
      }
      else
      {
        // horariosTotal = this.asignarDisponibilidad(this.inicializarHorario(this.diaSemana));
        // diasHorarios = [{dia:this.diaSemana,horarios:horariosTotal}];
        // this.horarioUsuario = {uid:this.autenticacion.usuarioActual.uid,diasHorarios};
        this.horarioUsuario = this.modificarHorarios();
        await this.firestore.agregarHorarios(this.horarioUsuario);
      }
      this.diasRestantes.splice(this.diasRestantes.indexOf(this.diaSemana),1);
      this.cambiarAccion("ver","");
      this.spinner.hide();
    }, 500);
  }

  public modificarHorarios()
  {
    let diasHorariosAux : DiasHorario[] = []
    let horarioAux : any = [];

    for (let i = 0; i < this.horariosAgregados.length; i++) 
    {
      const horario = this.horariosAgregados[i]  

      
      if(horario.horarios.length > 0)
      {
        let diaHorario : DiasHorario | null = null
        if(horario.dia != "Sábado")
        {
          horarioAux = this.inicializarHorario("Lunes");          
        }
        else
        {
          horarioAux = this.inicializarHorario("Sábado");          
        }

        for (let j = 0; j < horarioAux.length; j++) {
          const horarioDos = horarioAux[j];
          
          for (let k = 0; k < horario.horarios.length; k++)
          {
            const horarioTres = horario.horarios[k];

            if(horarioDos.hora == horarioTres)
            {
              horarioDos.estaActivo = true;
            }
          }
          diaHorario= {dia:horario.dia,horarios:horarioAux};
        }
        if(diaHorario)
        {
          diasHorariosAux.push(diaHorario);
        }
      }
    }

    const nuevoHorario : EspecialistaHorario = {uid:this.firestore.datosUsuarioActual.uid,diasHorarios:diasHorariosAux}
    return nuevoHorario;
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
        this.agregarHorariosAnteriores();
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

  public agregarHorariosAnteriores()
  {
    if(this.horarioUsuario)
    {
      let indice = -1;
      for (let i = 0; i < this.horarioUsuario.diasHorarios.length; i++) 
      {
        switch(this.horarioUsuario.diasHorarios[i].dia)
        {
          case "Lunes":
            indice = 0
            break;
          case "Martes":
            indice = 1
            break;
          case "Miercoles":
            indice = 2
            break;
          case "Jueves":
            indice = 3
            break;
          case "Viernes":
            indice = 4
            break;
          case "Sábado":
            indice = 5
            break;
        }

        for (let j = 0; j < this.horarioUsuario.diasHorarios[i].horarios.length; j++) {
          const horario = this.horarioUsuario.diasHorarios[i].horarios[j];

          if(horario.estaActivo)
          {
            this.horariosAgregados[indice].horarios.push(horario.hora);
          }
        }
      }
    }
  }

  private reiniciarInputs()
  {
    this.horarios = [];
    this.mensajeHorarios = "";
    this.diaSemana = "";
    //this.consultorio = 0;
  }

  public mostrarDiaSeleccionado()
  {
    this.mensajeHorarios = this.obtenerDia();
  }

  public obtenerDia()
  {
    let dia = "";
    
    for(let i = 0; i < this.diasRegistrados.length; i++)
    {
      dia += this.horarios[i].hora

      if(i != (this.diasRegistrados.length - 1))
      {
        dia += "-";
      }
    }

    return dia;
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

  cambioHorario(dia:string,event: any) {
    
    // const horariosElegidos = (this.formulario.controls['horarios'] as FormArray);
    if (event.target.checked) {
      this.agregarHorarioCheck(event.target.value,dia);
    } 
    else 
    {
      this.borrarHorarioCheck(event.target.value,dia);
    }
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

  verificarHorarios(dia:string,hora:string)
  {
    if(this.horarioUsuario)
    {
      for (let i = 0; i < this.horarioUsuario?.diasHorarios.length; i++) {
        const horario = this.horarioUsuario?.diasHorarios[i]
        if(horario.dia == dia)
        {
          for (let j = 0; j < horario.horarios.length; j++) {
            const horaHorario = horario.horarios[j];

            if(horaHorario.hora == hora && horaHorario.estaActivo)
            {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  agregarHorarioCheck(hora:any,dia:string)
  {
    for (let i = 0; i < this.horariosAgregados.length; i++) 
      {
        const horario = this.horariosAgregados[i];
        if(horario.dia == dia)
        {
          horario.horarios.push(hora)
        }
      }
  }

  borrarHorarioCheck(horaABorrar:any,dia:string)
  {
    for (let i = 0; i < this.horariosAgregados.length; i++) 
      {
        const horario = this.horariosAgregados[i];
        if(horario.dia == dia)
        {
          for (let j = 0; j < horario.horarios.length; j++) {
            const hora = horario.horarios[j];
            if(horaABorrar == hora)
            {
              horario.horarios.splice(j,1);
            }
          }
        }
      }
  }

  // agregarHorario()
  // {
  //   console.log(this.horariosAgregados);
  // }
}

