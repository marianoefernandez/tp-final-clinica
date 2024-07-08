import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent
{

  public escondoInteraccion : boolean = true;
  public componente : string = "";

  constructor(private spinner:NgxSpinnerService, private firestore:FirestoreService)
  {

  }

  abrirComponente(componente:string)
  {
    this.componente = componente;
    this.escondoInteraccion = false;
  }

  async descargarExcel()
  {
    const listaUsuarios = await firstValueFrom(this.firestore.obtenerUsuarios());
    let listaAux : any[] = []

    for (let index = 0; index < listaUsuarios.length; index++) {
      const usuario = listaUsuarios[index];
      const userAux = 
      {
        dni:usuario.dni,
        nombre:usuario.nombre,
        apellido:usuario.apellido,
        tipoUsuario:usuario.tipoUsuario,
        email:usuario.email,
        obraSocial:usuario.obraSocial ? usuario.obraSocial : "NO TIENE",
        fechaRegistro:usuario.fechaRegistro,
        especialidades:this.obtenerEspecialidadesString(usuario.especialidad),
        edad:usuario.edad
      }

      listaAux.push(userAux);
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listaAux);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, "Usuarios.xlsx");

  }

  obtenerEspecialidadesString(especialidades)
  {
    let especialidadesString = "";

    if(especialidades)
    {
      for (let index = 0; index < especialidades.length; index++) {
        const especialidad = especialidades[index];
        especialidadesString += especialidad.especialidad;
        especialidadesString += "-"
      }

      especialidadesString.slice(0,-1);

    }
    else
    {
      especialidadesString = "NO TIENE";
    }


    return especialidadesString;
  }

  volverAtras()
  {
    this.spinner.show();
    setTimeout(() => {
      this.componente = ""; 
      this.escondoInteraccion = true;
      this.spinner.hide();   
    }, 1200);
  }

}
