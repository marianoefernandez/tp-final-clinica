import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModoNocturnoService {

  constructor() 
  {

  }

  $emisor = new EventEmitter();

  public modoNocturno : boolean = false

  public emitirEvento() 
  {
      this.$emisor.emit();
  }   

  public cambiarModo()
  {
    this.modoNocturno = ! this.modoNocturno
  }
  
}
