import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, firstValueFrom } from 'rxjs';
import { Turno } from 'src/app/interfaces/Turnos';
import { Historia } from 'src/app/interfaces/Usuario';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent {

  public turnosDisponibles:any[] = [];
  public suscripcionTurnos!: Subscription;
  public suscripcionUsuarios!: Subscription;
  public tipoFiltrado: string = "Paciente";
  public consultoriosRestantes = [];
  public palabraBusqueda:string = ""
  public todosUsuarios: any[] = [];
  public pacientesEspecialista : any[] = [];
  public uidPacientes : string[] = [];
  public flagHistoriaClinica = false;
  // public historiaClinica : Historia | null = null;
  public flagCrear = false;
  public pacienteElegidoUid:string = "";
  public turnoElegido:any;
  public turnosTotales = [];

  public formulario: FormGroup = this.forms.group({
    turnoElegido: ['', ],
    altura: ['', [Validators.required, Validators.min(70), Validators.max(250)]],
    peso: ['', [Validators.required, Validators.min(0), Validators.max(500)]],
    temperatura: ['', [Validators.required, Validators.min(25), Validators.max(50)]],
    presion: ['', [Validators.required, Validators.min(1), Validators.max(300)]],
    claveUno: ['', ],
    datoUno: ['', ],
    claveDos: ['', ],
    datoDos: ['', ],
    claveTres: ['', ],
    datoTres: ['', ],
  }); 


  constructor(public firestore:FirestoreService,private spinner:NgxSpinnerService, private forms: FormBuilder,private router:Router)
  {

  }

  async ngOnInit()
  {
    this.inicializarPagina();
    
    this.spinner.show();

    setTimeout(async () => {
      await this.cargarTurnosDisponibles();
  
      await this.obtenerPacientes();
      this.spinner.hide();
    }, 500);
  }
  
  ngOnDestroy()
  {
    // this.suscripcionTurnos.unsubscribe();
    // this.suscripcionUsuarios.unsubscribe();
  }

  async cargarTurnosDisponibles()
  {
    const turnos = await firstValueFrom(this.firestore.obtenerTurnosPorUid(this.firestore.datosUsuarioActual.uid,this.firestore.datosUsuarioActual.tipoUsuario));

      for (let i = 0; i < turnos.length ; i++) {
        const turnoAux = turnos[i];
  
        if(turnoAux.estadoTurno == "Realizado")
        {
          this.turnosDisponibles.push(turnoAux);
          this.uidPacientes.push(turnoAux.uidPaciente);
        }           
      }

      this.turnosDisponibles.sort(function (a, b) { 
        if(a.horarioTurno.toDate().getTime() > b.horarioTurno.toDate().getTime())
         {
           return -1;
         }
         else
         {
           return 1;
         }
     })
  }



  verificarHistoriaClinica(paciente:any)
  {
    if(paciente.historiaClinica)
    {
      // this.formulario.value["altura"] = paciente.historiaClinica.altura;
      // this.formulario.value["peso"] = paciente.historiaClinica.peso;
      // this.formulario.value["temperatura"] = paciente.historiaClinica.temperatura;
      // this.formulario.value["presion"] = paciente.historiaClinica.presion;
      return true;
    }

    return false;
  }

  async cambiarTurno()
  {
    if(this.formulario.value["turnoElegido"] != "")
    {
      this.spinner.show();
       
      setTimeout(() => {
        let indice = parseInt(this.formulario.value["turnoElegido"]);
        if(this.turnosTotales[indice].historiaClinica)
        {
          this.formulario.setValue(
            {
              turnoElegido:indice.toString(),
              altura:this.turnosTotales[indice].historiaClinica.altura,
              peso:this.turnosTotales[indice].historiaClinica.peso,
              temperatura:this.turnosTotales[indice].historiaClinica.temperatura,
              presion:this.turnosTotales[indice].historiaClinica.presion,
              datoUno:this.turnosTotales[indice].historiaClinica.datosDinamicos.length > 0 ? this.turnosTotales[indice].historiaClinica.datosDinamicos[0]["valor"] : "",
              claveUno: this.turnosTotales[indice].historiaClinica.datosDinamicos.length > 0 ? this.turnosTotales[indice].historiaClinica.datosDinamicos[0]["clave"] : "",
              claveDos: this.turnosTotales[indice].historiaClinica.datosDinamicos.length > 1 ? this.turnosTotales[indice].historiaClinica.datosDinamicos[1]["clave"] : "",
              datoDos:this.turnosTotales[indice].historiaClinica.datosDinamicos.length > 1 ? this.turnosTotales[indice].historiaClinica.datosDinamicos[1]["valor"] : "",
              claveTres: this.turnosTotales[indice].historiaClinica.datosDinamicos.length > 2 ? this.turnosTotales[indice].historiaClinica.datosDinamicos[2]["clave"] : "",
              datoTres:this.turnosTotales[indice].historiaClinica.datosDinamicos.length > 2 ? this.turnosTotales[indice].historiaClinica.datosDinamicos[2]["valor"] : "",
            }
          ); 
        }
        else
        {
          this.formulario.setValue(
            {
              turnoElegido:indice.toString(),
              altura:"",
              peso:"",
              temperatura:"",
              presion:"",
              datoUno:"",
              claveUno: "",
              claveDos: "",
              datoDos:"",
              claveTres: "",
              datoTres:""
            });   
          }
        this.spinner.hide();
      }, 850); 
    }
  }

  // async obtenerUltimasAtenciones()
  // {

  //   let ultimosTurnos = await this.obtenerTurnos();
  //   let ultimosTurnosAux = []

  //   for (let index = 0; index < ultimosTurnos.length; index++) {
  //     const turno = ultimosTurnos[index];

  //     if (turno.historiaClinica)
  //     {
  //       ultimosTurnosAux.push()  
  //     }
      
  //   }
  // }

  crearModificarHistoriaClinica()
  {
    this.spinner.show();
    setTimeout(async () => {

      console.log(this.formulario.value['turnoElegido']);

      if(this.formulario.value['turnoElegido'] != "")
      {
        if(!this.esValidoElCampo('altura') && !this.esValidoElCampo('peso') && !this.esValidoElCampo('temperatura') && !this.esValidoElCampo('presion') && (this.formulario.value['altura'] != "" && this.formulario.value['peso'] != "" && this.formulario.value['temperatura'] != "" && this.formulario.value['presion'] != ""))
          {
            const datosDinamicos : any = []
            let indiceTurno = parseInt(this.formulario.value['turnoElegido'])

            const turno = this.turnosTotales[indiceTurno];
    
            if(this.formulario.value["claveUno"] && this.formulario.value["datoUno"] && this.formulario.value["claveUno"] != "" && this.formulario.value["datoUno"] != "")
            {
              const datoDinamico = {clave:this.formulario.value["claveUno"],valor:this.formulario.value["datoUno"]}
              datosDinamicos.push(datoDinamico);
            }   
    
            if(this.formulario.value["claveDos"] && this.formulario.value["datoDos"] && this.formulario.value["claveDos"] != "" && this.formulario.value["datoDos"] != "")
            {
              const datoDinamico = {clave:this.formulario.value["claveDos"],valor:this.formulario.value["datoDos"]}
              datosDinamicos.push(datoDinamico);
            }   
    
    
            if(this.formulario.value["claveTres"] && this.formulario.value["datoTres"] && this.formulario.value["claveTres"] != "" && this.formulario.value["datoTres"] != "")
            {
              const datoDinamico = {clave:this.formulario.value["claveTres"],valor:this.formulario.value["datoTres"]}
              datosDinamicos.push(datoDinamico);
            }   
    
            const historiaClinica:Historia = 
            {
              altura:this.formulario.value["altura"],
              peso:this.formulario.value["peso"],
              temperatura:this.formulario.value["temperatura"],
              presion:this.formulario.value["presion"],
              datosDinamicos:datosDinamicos,
            }
    
            const historia = {historiaClinica:historiaClinica}        
    
            await this.firestore.actualizarTurno(turno.idTurno,historia);
            this.pacientesEspecialista = []
            await this.obtenerPacientes();
            this.turnoElegido = "";
            this.turnosTotales = [];
            this.turnosDisponibles = [];
            await this.cargarTurnosDisponibles();
    
            swal.fire
            (
              {
                title:"Éxito",
                text:"Historia clínica cargada con éxito!",
                icon:"success"  
              }
            ).then(respuesta =>
              {
                this.cambiarFlagCrear("");
              }
            )        
          }
          else
          {
            swal.fire
            (
              {
                title:"Error",
                text:"Hubo un error en alguno de los datos fijos. Fijese por favor",
                icon:"error"
              }
            )
            this.formulario.markAllAsTouched();
          }
          this.spinner.hide();
      }
      else
      {
        swal.fire
        (
          {
            title:"Error",
            text:"Elija al turno al cual cargarle la historia clinica",
            icon:"error"
          }
        )
      }
      this.spinner.hide();
    }, 1100);
  }

  public mostrarHistoriaClinica(turno:any,paciente:any)
  {
    if(turno.historiaClinica)
    {
      let datosDinamicos = "";

      switch(turno.historiaClinica.datosDinamicos.length)
      {
        case 0:
          datosDinamicos += "<h3>No hay ningun dato dinámico cargado</h3>"
          break;
        case 1:
          datosDinamicos += 
          `<h3>${turno.historiaClinica.datosDinamicos[0].clave}: ${turno.historiaClinica.datosDinamicos[0].valor}</h3>`
          break;
        case 2:
          datosDinamicos += 
          `<h3>${turno.historiaClinica.datosDinamicos[0].clave}: ${turno.historiaClinica.datosDinamicos[0].valor}</h3>
           <h3>${turno.historiaClinica.datosDinamicos[1].clave}: ${turno.historiaClinica.datosDinamicos[1].valor}</h3>`          
          break;
        case 3:
          datosDinamicos += 
          `<h3>${turno.historiaClinica.datosDinamicos[0].clave}: ${turno.historiaClinica.datosDinamicos[0].valor}</h3>
           <h3>${turno.historiaClinica.datosDinamicos[1].clave}: ${turno.historiaClinica.datosDinamicos[1].valor}</h3>
           <h3>${turno.historiaClinica.datosDinamicos[2].clave}: ${turno.historiaClinica.datosDinamicos[2].valor}</h3>
           `          
          break;
      }

      swal.fire(
        {
          title:`Historia clinica del paciente ${paciente.nombre} ${paciente.apellido} \n dia ${turno.horarioTurno.toDate().toLocaleString("en-GB").slice(0,-3).replace(",","")}`,
          html:
          `
          <h1>Datos Fijos</h1>
          <h3>Altura: ${turno.historiaClinica.altura} cm </h3>
          <h3>Peso: ${turno.historiaClinica.peso} kg </h3>
          <h3>Temperatura: ${turno.historiaClinica.temperatura} °C </h3>
          <h3>Presión: ${turno.historiaClinica.presion} mmHg </h3>

          <br>
          <h1>Datos Dinámicos</h1>
          ${datosDinamicos}
          `
        }
      )
    }
  }

  public async obtenerPacientes()
  {
    const setUid = new Set(this.uidPacientes);

    let uidPacientes = [...setUid];
    
    for (let i = 0; i < uidPacientes.length; i++) {
      const uid = uidPacientes[i];

      const usuario = await this.firestore.obtenerUsuariosEspecificos('uid',uid);
      this.pacientesEspecialista.push(usuario);
    }
  }

  esValidoElCampo(campo: string): boolean | null 
  {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

  obtenerError(campo: string): string | null {
    if (!this.formulario.controls[campo] && !this.formulario.controls[campo].errors) return null;

    const errores = this.formulario.controls[campo].errors;
    for (const clave of Object.keys(errores!)) 
    {
      switch (clave) 
      {
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Minimo ${errores!['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Maximo ${errores!['maxlength'].requiredLength} caracteres.`;
        case 'min':
          return `Como minimo debe ser ${errores!['min'].min}.`;
        case 'max':
          return `Como maximo debe ser ${errores!['max'].max}.`;
        case 'email':
          return "El formato del mail es incorrecto";
      }
    }
    return null;
  }

  async obtenerTurnos()
  {
    let turnos = await firstValueFrom(this.firestore.obtenerTurnosPorUid(this.firestore.datosUsuarioActual.uid,"Especialista"));
    let turnosAux = [];
    
    for (let i = 0; i < turnos.length; i++) {
      const turno = turnos[i];

      if(turno.uidPaciente == this.pacienteElegidoUid && turno.estadoTurno == "Realizado")
      {
        turnosAux.push(turno);
      }

    }

    // turnosAux.sort((a, b) => a.horarioTurno.toDate().getTime() > b.horarioTurno.toDate().getTime());

    turnosAux.sort(function (a, b) { 
       if(a.horarioTurno.toDate().getTime() > b.horarioTurno.toDate().getTime())
        {
          return -1;
        }
        else
        {
          return 1;
        }
    })
    return turnosAux;

  }

  async obtenerTurnosHistoriaClinica(uidPaciente)
  {
    let turnos = await firstValueFrom(this.firestore.obtenerTurnosPorUid(this.firestore.datosUsuarioActual.uid,"Especialista"));
    let turnosAux = [];
    
    for (let i = 0; i < turnos.length; i++) {
      const turno = turnos[i];

      if(turno.uidPaciente == this.pacienteElegidoUid && turno.estadoTurno == "Realizado")
      {
        turnosAux.push(turno);
      }

    }

    // turnosAux.sort((a, b) => a.horarioTurno.toDate().getTime() > b.horarioTurno.toDate().getTime());

    turnosAux.sort(function (a, b) { 
       if(a.horarioTurno.toDate().getTime() > b.horarioTurno.toDate().getTime())
        {
          return -1;
        }
        else
        {
          return 1;
        }
    })
    return turnosAux;

  }

  cambiarFlagCrear(paciente:any)
  {
    this.spinner.show();
    setTimeout(async () => {
      this.flagCrear = !this.flagCrear;   
      if(this.flagCrear)
      {
        this.formulario.reset();
        // if(paciente.historiaClinica)
        // {
        //   this.formulario.setValue(
        //     {
        //       altura:paciente.historiaClinica.altura,
        //       peso:paciente.historiaClinica.peso,
        //       temperatura:paciente.historiaClinica.temperatura,
        //       presion:paciente.historiaClinica.presion,
        //       claveUno: paciente.historiaClinica.datosDinamicos.length > 0 ? paciente.historiaClinica.datosDinamicos[0]["clave"] : "",
        //       datoUno:paciente.historiaClinica.datosDinamicos.length > 0 ? paciente.historiaClinica.datosDinamicos[0]["valor"] : "",
        //       claveDos: paciente.historiaClinica.datosDinamicos.length > 1 ? paciente.historiaClinica.datosDinamicos[1]["clave"] : "",
        //       datoDos:paciente.historiaClinica.datosDinamicos.length > 1 ? paciente.historiaClinica.datosDinamicos[1]["valor"] : "",
        //       claveTres: paciente.historiaClinica.datosDinamicos.length > 2 ? paciente.historiaClinica.datosDinamicos[2]["clave"] : "",
        //       datoTres:paciente.historiaClinica.datosDinamicos.length > 2 ? paciente.historiaClinica.datosDinamicos[2]["valor"] : "",
        //     }
        //   ); 
        // }
      }
      if(paciente == "")
      {
        this.pacienteElegidoUid = "";
      }
      else
      {
        this.pacienteElegidoUid = paciente.uid;
        this.turnosTotales = await this.obtenerTurnos();
      }
      this.spinner.hide();   
    }, 850);
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
