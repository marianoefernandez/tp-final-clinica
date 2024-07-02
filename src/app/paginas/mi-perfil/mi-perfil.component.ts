import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import swal from 'sweetalert2'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent 
{

  public flagImagen : boolean = true;
  public flagHorarios : boolean = true;

  constructor(public autenticacion:AutenticacionService,public firestore:FirestoreService)
  {
    
  }

  ngOnInit()
  {
    
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

  descargarPDF(paciente:any)
  {
    if(paciente.historiaClinica)
    {
      let datosDinamicos = "";
      let hoy = new Date();

      switch(paciente.historiaClinica.datosDinamicos.length)
      {
        case 0:
          datosDinamicos += "No hay ningun dato dinámico cargado.\n"
          break;
        case 1:
          datosDinamicos += `${paciente.historiaClinica.datosDinamicos[0].clave}: ${paciente.historiaClinica.datosDinamicos[0].valor}\n`
          break;
        case 2:
          datosDinamicos += `${paciente.historiaClinica.datosDinamicos[0].clave}: ${paciente.historiaClinica.datosDinamicos[0].valor}\n`
          datosDinamicos += `${paciente.historiaClinica.datosDinamicos[1].clave}: ${paciente.historiaClinica.datosDinamicos[1].valor}\n`
          break;
        case 3:
          datosDinamicos += `${paciente.historiaClinica.datosDinamicos[0].clave}: ${paciente.historiaClinica.datosDinamicos[0].valor}\n`
          datosDinamicos += `${paciente.historiaClinica.datosDinamicos[1].clave}: ${paciente.historiaClinica.datosDinamicos[1].valor}\n`
          datosDinamicos += `${paciente.historiaClinica.datosDinamicos[2].clave}: ${paciente.historiaClinica.datosDinamicos[2].valor}\n`
          break;
      }


      const datosPdf : any = {
        content:[
          {
            image: 'logo',
            width: 150,
            height:150,
            alignment: 'center',
          },
          {
            text: `\nHistoria clinica del paciente ${paciente.nombre} ${paciente.apellido}.\n\n`,
            style: 'header'
          },
          {
            text: `Datos Fijos.`,
            style: 'subheader'
          },
          `
          Altura: ${paciente.historiaClinica.altura} cm\n
          Peso: ${paciente.historiaClinica.peso} kg\n
          Temperatura: ${paciente.historiaClinica.temperatura} °C\n
          Presión: ${paciente.historiaClinica.presion} mmHg\n\n
          `,
          {
            text: `Datos Dinámicos.\n\n`,
            style: 'subheader'
          },
          datosDinamicos,

          {
            text: "\n\n Fecha de Emisión: " + hoy.toLocaleDateString(),
            style: 'subheader'
          },
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
          logo:"https://i.ibb.co/2KNNN5d/clinica.png"
        }
      }
  
      const pdf = pdfMake.createPdf(datosPdf);
      pdf.download(`${paciente.nombre} ${paciente.apellido} Historia Clinica`); 
    }
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
