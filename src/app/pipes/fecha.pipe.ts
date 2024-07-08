import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any): unknown 
  {
    return value.toDate().toLocaleString("en-GB").slice(0,-3).replace(",",""); 
  }

}
