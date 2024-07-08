import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Subscription, firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { Logs } from 'src/app/interfaces/Informes';
import { FormControl, FormGroup } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit,OnDestroy
{
  @ViewChild('chart',{static:false}) chart: ChartComponent;
  
  public chartOptions: Partial<ChartOptions>;

  public flagImagen : boolean = true;
  public flagHorarios : boolean = true;
  public turnosDisponibles:any[] = [];
  public especialidadElegida : string = "";
  public especialidadesRegistradas : string[] = [];
  public nombrePDF = ""
  public opcionElegida = "";
  public logsTotales = [];
  public todosTurnos = [];
  public suscripcion : Subscription | null = null
  public especialistasDisponibles = []
  public flagOpcion = true;
  public elementoSeleccionado = "";
  public listaSeleccionada : any = [];
  public flagGraficos = false;
  public labels = [];
  public flagImprimir = false;

  fechas = new FormGroup({
    inicio: new FormControl(null),
    fin: new FormControl(null)
  });

  constructor(public autenticacion:AutenticacionService,public firestore:FirestoreService,private spinner:NgxSpinnerService)
  {
    this.chartOptions = {
      series: [
        {
          name: 'Grafico',
          data: [10],
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        foreColor: '#ffffff'
      },
      title: {
        text: "",
      },
      xaxis: {
        categories: [
          'Ejemplo',
        ],
      },
    };
  }
  ngOnDestroy(): void {
    if(this.suscripcion)
    {
      this.suscripcion.unsubscribe();
    }
  }

  async ngOnInit()
  {
    if(this.firestore.datosUsuarioActual.tipoUsuario == "Paciente")
    {
      await this.cargarTurnosDisponibles();
    }
    else
    {
      if(this.firestore.datosUsuarioActual.tipoUsuario == "Administrador")
      {
        this.especialistasDisponibles = await this.firestore.obtenerUsuariosEspecificos('tipoUsuario','Especialista');

        this.suscripcion = this.firestore.obtenerTurnos().subscribe(async turnos =>
          {
            if(this.todosTurnos.length)
              {
                this.todosTurnos = this.todosTurnos.concat(turnos);          
              }
              else
              {
                this.todosTurnos = await firstValueFrom(this.firestore.obtenerTurnos());
              }          
          });
      }
    }
  }

  async cargarTurnosDisponibles()
  {
    const turnos = await firstValueFrom(this.firestore.obtenerTurnosPorUid(this.firestore.datosUsuarioActual.uid,this.firestore.datosUsuarioActual.tipoUsuario));

      for (let i = 0; i < turnos.length ; i++) {
        const turnoAux : any = turnos[i];
  
        if(turnoAux.estadoTurno == "Realizado" && turnoAux.uidPaciente == this.firestore.datosUsuarioActual.uid && turnoAux.historiaClinica)
        {
          this.turnosDisponibles.push(turnoAux);
          this.especialidadesRegistradas.push(turnoAux.especialidad);
        }           
      }

      const setEspecialidades = new Set(this.especialidadesRegistradas);
      this.especialidadesRegistradas = [...setEspecialidades];
      this.nombrePDF = `${this.firestore.datosUsuarioActual.nombre} ${this.firestore.datosUsuarioActual.apellido} Historia Clinica`;
      
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

  async descargarExcel(lista:any[],nombre:string)
  {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(lista);
    const book: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(book, worksheet, 'Hoja 1');
    XLSX.writeFile(book, nombre);
  }

  cambiarValorBanderaImagen()
  {
    this.flagImagen = ! this.flagImagen;
  }

  cambiarValorBanderaHorarios()
  {
    this.flagHorarios = ! this.flagHorarios;
  }

  formatearString(dato:any)
  {
    let mensajeAux = ""

    for (let i = 0; i < dato.length; i++) {
      const letra = dato[i];
    
      if(letra === letra.toUpperCase() || i === 0)
      {
        if(i !== 0)
        {
          mensajeAux+= " "
        }    
        mensajeAux += letra.toUpperCase();
      }
      else
      {
        mensajeAux += letra;
      }
    }
    
    return mensajeAux;
  }


  obtenerValor(dato:any)
  {
    
    if (typeof dato === "boolean") 
    {
      dato = dato ? "Si" : "No";
    }
    else
    {
      if (Array.isArray(dato))
      {
        dato = this.obtenerEspecialidad(dato)
      }
    }

    return dato;
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

  obtenerDatosDinamicosHistorial(turno:any)
  {
    let datosDinamicos = "";

    switch(turno.historiaClinica.datosDinamicos.length)
    {
      case 0:
        datosDinamicos += "No hay ningun dato dinámico cargado.\n"
        break;
      case 1:
        datosDinamicos += `${turno.historiaClinica.datosDinamicos[0].clave}: ${turno.historiaClinica.datosDinamicos[0].valor}\n`
        break;
      case 2:
        datosDinamicos += `${turno.historiaClinica.datosDinamicos[0].clave}: ${turno.historiaClinica.datosDinamicos[0].valor}\n`
        datosDinamicos += `${turno.historiaClinica.datosDinamicos[1].clave}: ${turno.historiaClinica.datosDinamicos[1].valor}\n`
        break;
      case 3:
        datosDinamicos += `${turno.historiaClinica.datosDinamicos[0].clave}: ${turno.historiaClinica.datosDinamicos[0].valor}\n`
        datosDinamicos += `${turno.historiaClinica.datosDinamicos[1].clave}: ${turno.historiaClinica.datosDinamicos[1].valor}\n`
        datosDinamicos += `${turno.historiaClinica.datosDinamicos[2].clave}: ${turno.historiaClinica.datosDinamicos[2].valor}\n`
        break;
    }

    datosDinamicos += "\n";

    return datosDinamicos;
  }

  async descargarPDFEspecialidad()
  {
    this.turnosDisponibles = this.turnosDisponibles.filter((turno) => turno.especialidad == this.especialidadElegida);
    this.nombrePDF = `${this.firestore.datosUsuarioActual.nombre} ${this.firestore.datosUsuarioActual.apellido} ${this.especialidadElegida} Historia Clinica`;
    await this.descargarPDF();
    this.turnosDisponibles = [];
    await this.cargarTurnosDisponibles();

  }

  async lanzarSpinner(tiempo:number)
  {
    if(this.especialidadElegida != "")
    {
      this.spinner.show();
       
      setTimeout(() => {
        this.spinner.hide();
      }, tiempo);
    }
  }

  async elegirOpcion()
  {
    if(this.opcionElegida != "")
    {
      this.spinner.show();
       
      setTimeout(() => {
        this.spinner.hide();
      }, 900);
    }
  }

  async descargarPDF()
  {

    let dinamicos = []
    let hoy = new Date()

    for (let index = 0; index < this.turnosDisponibles.length; index++) {
      const turno = this.turnosDisponibles[index];

      dinamicos.push(this.obtenerDatosDinamicosHistorial(turno));
      
    }

    let contenido : any = []

    contenido.push(
      {
      image: 'logo',
      width: 150,
      height:150,
      alignment: 'center',
    },
    {
      text: `\nHistoria clinica del paciente ${this.firestore.datosUsuarioActual.nombre} ${this.firestore.datosUsuarioActual.apellido}.\n\n`,
      style: 'header'
    });

    for (let index = 0; index < this.turnosDisponibles.length; index++) {
      const turno = this.turnosDisponibles[index];
      const especialista = await this.firestore.obtenerUsuariosEspecificos("uid",turno.uidEspecialista);

      contenido.push(
        {
          text: `${index + 1}. Turno del día ${turno.horarioTurno.toDate().toLocaleString("en-GB").slice(0,-3).replace(",","")} \nEspecialista ${especialista[0].nombre} ${especialista[0].apellido}: `,
          style: 'subheader'
        },
        {
          text: `Datos Fijos.`,
          style: 'subheader'
        },
        `
        Altura: ${turno.historiaClinica.altura} cm\n
        Peso: ${turno.historiaClinica.peso} kg\n
        Temperatura: ${turno.historiaClinica.temperatura} °C\n
        Presión: ${turno.historiaClinica.presion} mmHg\n\n
        `,
        {
          text: `Datos Dinámicos.\n\n`,
          style: 'subheader'
        },
        dinamicos[index],
        "\n"
      )
    }

    contenido.push(
      {
        text: "\n\n Fecha de Emisión: " + hoy.toLocaleDateString(),
        style: 'subheader'
      }
    );


      const datosPdf : any = {
        content:contenido,

        styles: {
          header: {
            fontSize: 18,
            alignment: 'center',
            bold: true
          },
          subheader: {
            fontSize: 15,
            alignment: 'center',
            bold: true
          },
          quote: {
            italics: true
          },
          small: {
            fontSize: 8,
            alignment: 'center',
          }
        },

        images: {
          logo:"https://i.ibb.co/2KNNN5d/clinica.png"
        }
      }
  
      const pdf = pdfMake.createPdf(datosPdf);
      pdf.download(this.nombrePDF); 
  }

  public descargarGraficoPDF(texto:string)
  {
    this.flagImprimir = true;
    this.spinner.show();
    this.chart.render().then(() => {
      setTimeout(() => {
        this.chart.dataURI().then(async ({ imgURI }) => { 
          const datosPdf : any = {
            content:[
              {
                text: `${texto}`,
                style: 'header'
              },
              {
                image: 'foto',
                fit: [500, 350],
                pageBreak: 'after'                
                // alignment: 'center',

              }
            ],
      
            styles: {
              header: {
                fontSize: 18,
                alignment: 'center',
                bold: true
              },
              subheader: {
                fontSize: 15,
                alignment: 'center',
                bold: true
              },
              quote: {
                italics: true
              },
              small: {
                fontSize: 8,
                alignment: 'center',
              }
            },
      
            images: {
              foto:imgURI
            }
          }
      
          const pdf = pdfMake.createPdf(datosPdf);
          pdf.download(texto); 
          await this.administrarDescargas("pdf");
          this.spinner.hide();
          this.flagImprimir = false;
        })
      }, 1000);
  })

  }

  public async administrarDescargas(opcion:string)
  {
    let listaAux = [];
    let contadores = [];
    let especialistas = [];

    switch(this.opcionElegida)
    {
      case "1":
        let listaLogs = await firstValueFrom(this.firestore.obtenerLogs());
        listaLogs.sort(function (a, b) { 
          if(a.hora.toDate().getTime() < b.hora.toDate().getTime())
           {
             return -1;
           }
           else
           {
             return 1;
           }
       })

        let fechasLogs = [];
  
        for (let i = 0; i < listaLogs.length; i++) 
        {
          const diaLog = listaLogs[i].hora.toDate().toLocaleDateString("en-GB");
          fechasLogs.push(diaLog);
          listaLogs[i].hora = listaLogs[i].hora.toDate().toLocaleString("en-GB").replace(",","");
          const log : Logs =
          {
            nombre:listaLogs[i].nombre,
            apellido:listaLogs[i].apellido,
            dni:listaLogs[i].dni,
            tipoUsuario:listaLogs[i].tipoUsuario,
            hora:listaLogs[i].hora,
          }
          listaAux.push(log);
        }

        const setDia = new Set(fechasLogs);
        fechasLogs = [...setDia];

        for (let i = 0; i < fechasLogs.length; i++) {
          let contador = listaAux.filter(log => log.hora.slice(0,-9) == fechasLogs[i]).length;
          contadores.push(contador);
        }

        this.chartOptions.series =[
          {
            name: 'Inicios de Sesión',
            data: contadores,
          },
        ]

        this.chartOptions.xaxis = {
          categories:fechasLogs
        }

        this.chartOptions.chart = {
          height: 350,
          type: 'line',
        }
        
        if(opcion == "excel")
          {
            await this.descargarExcel(listaAux,"Logs.xlsx");
          }
          else
          {
            if(opcion == "pdf")
            {

            }
            else
            {
              this.listaSeleccionada = listaAux;
              this.elementoSeleccionado = "Log de ingresos al sistema. Indicando el usuario, día y horario que ingreso al sistema";
              this.cambiarFlag();
            }
          }
        break;
      case "2":
        const listaEspecialidades = this.obtenerEspecialidades();

        for (let i = 0; i < listaEspecialidades.length; i++) {
          const especialidad = listaEspecialidades[i];
          let contador = this.todosTurnos.filter(turno => turno.especialidad == especialidad).length;
          contadores.push(contador);
          const aux = {especialidad:especialidad,cantidad:contador};
          listaAux.push(aux);
        }

        this.chartOptions.series =[
          {
            name: 'Turnos',
            data: contadores,
          },
        ]

        this.chartOptions.xaxis = {
          categories:listaEspecialidades
        }

        this.chartOptions.chart = {
          height: 350,
          type: 'bar',
        }

        if(opcion == "excel")
        {
          await this.descargarExcel(listaAux,"CantidadTurnosEspecialidad.xlsx");
        }
        else
        {
          if(opcion == "pdf")
          {

          }
          else
          {
            this.elementoSeleccionado = "Cantidad de turnos por especialidad.";
            this.listaSeleccionada = listaAux;
            this.cambiarFlag();
          }
        }
        break;
      case "3":
        const listaDias = this.obtenerDias();

        for (let i = 0; i < listaDias.length; i++) {
          const dia = listaDias[i];
          let contador = this.todosTurnos.filter(turno => turno.horarioTurno.toDate().toLocaleDateString() == dia).length;
          const aux = {dia:dia,cantidad:contador};
          contadores.push(contador);
          listaAux.push(aux);
        }

        this.chartOptions.series =[
          {
            name: 'Turnos',
            data: contadores,
          },
        ]

        this.chartOptions.xaxis = {
          categories:listaDias
        }

        this.chartOptions.chart = {
          height: 350,
          type: 'bar',
        }

        if(opcion == "excel")
          {
            await this.descargarExcel(listaAux,"CantidadTurnosDia.xlsx");
          }
          else
          {
            if(opcion == "pdf")
            {
  
            }
            else
            {
              this.elementoSeleccionado = "Cantidad de turnos por día.";
              this.listaSeleccionada = listaAux;
              this.cambiarFlag();
            }
          }
        break;

      case "4":
        if(this.fechas.value['inicio'] && this.fechas.value['fin'])
        {
          const inicio = this.fechas.value['inicio'];
          const fin = this.fechas.value['fin'];

          
          for (let index = 0; index < this.especialistasDisponibles.length; index++) {
            const especialista = this.especialistasDisponibles[index];
            especialistas.push(especialista.nombre + " " + especialista.apellido);
            let contador = this.todosTurnos.filter(turno => turno.horarioTurno.toDate() >= inicio && turno.horarioTurno.toDate() <= fin && turno.uidEspecialista == especialista.uid).length;
            contadores.push(contador);
            const aux = {especialista:especialista.nombre + " " + especialista.apellido,cantidad:contador};
            listaAux.push(aux);
          }

          this.chartOptions.series =contadores
          this.labels = especialistas;
  
          this.chartOptions.xaxis = {
            categories:especialistas,
          }
  
          this.chartOptions.chart = {
            height: 350,
            type: 'pie',
          }

          if(opcion == "excel")
          {
            await this.descargarExcel(listaAux,`CantidadTurnosDia (${inicio.toLocaleDateString("en-GB")}) y (${fin.toLocaleDateString("en-GB")}).xlsx`);
          }
          else
          {
            if(opcion == "pdf")
            {

            }
            else
            {
              this.elementoSeleccionado = "Cantidad de turnos solicitado por médico en un lapso de tiempo.";
              this.listaSeleccionada = listaAux;
              this.cambiarFlag();
            }
          }
        }
        else
        {
          swal.fire({title:"Error en la fecha",text:"Debe indicar una fecha para poder descargar el archivo",icon:"error"});
        }
        break;
      case "5":
        if(this.fechas.value['inicio'] && this.fechas.value['fin'])
          {
            const inicio = this.fechas.value['inicio'];
            const fin = this.fechas.value['fin'];
            
            for (let index = 0; index < this.especialistasDisponibles.length; index++) {
              const especialista = this.especialistasDisponibles[index];
              especialistas.push(especialista.nombre + " " + especialista.apellido);
              let contador = this.todosTurnos.filter(turno => turno.horarioTurno.toDate() >= inicio && turno.horarioTurno.toDate() <= fin && turno.uidEspecialista == especialista.uid && turno.estadoTurno == "Realizado").length;
              contadores.push(contador);
              const aux = {especialista:especialista.nombre + " " + especialista.apellido,cantidad:contador};
              listaAux.push(aux);
            }

            this.chartOptions.series =contadores
            this.labels = especialistas;
    
            this.chartOptions.xaxis = {
              categories:especialistas,
            }
    
            this.chartOptions.chart = {
              height: 350,
              type: 'pie',
            }

            if(opcion == "excel")
            {
              await this.descargarExcel(listaAux,`CantidadTurnosFinalizadosDia (${inicio.toLocaleDateString("en-GB")}) y (${fin.toLocaleDateString("en-GB")}).xlsx`);
            }
            else
            {
              if(opcion == "pdf")
              {
    
              }
              else
              {
                this.elementoSeleccionado = "Cantidad de turnos finalizados por médico en un lapso de tiempo.";
                this.listaSeleccionada = listaAux;
                this.cambiarFlag();
              }
            }
          }
          else
          {
            swal.fire({title:"Error en la fecha",text:"Debe indicar una fecha para poder descargar el archivo",icon:"error"});
          }
        break;
    }
  }

  public cambiarFlag()
  {
    this.flagOpcion = !this.flagOpcion;
    this.flagGraficos = false;
  }


  public cambiarFlagGrafico()
  {
    this.flagGraficos = !this.flagGraficos;
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

  private obtenerDias()
  {
    let dias : string[] = [];
    for(let i = 0; i<this.todosTurnos.length; i++)
    {
      const turno = this.todosTurnos[i];
      dias.push(turno.horarioTurno.toDate().toLocaleDateString());
    }

    //Elimino los repetidos
    const setDias = new Set(dias);
    dias = [...setDias];
    
    return dias
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
