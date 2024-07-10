import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dia'
})
export class DiaPipe implements PipeTransform {

  transform(value: any): unknown 
  {
    let diaCompleto = ""
    if(value.dia < 10)
      {
        diaCompleto += `0${value.dia}`;
      }
      else
      {
        diaCompleto += `${value.dia}`;
      }

      diaCompleto += " de " + this.obtenerMesPorNumero(value.mes);
      return diaCompleto;
  }

  public obtenerMesPorNumero(mes:number)
  {
    switch(mes)
    {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";   
    }
    return "Error";
  }

}
