import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTurnoscolor]'
})
export class TurnoscolorDirective {

  @Input() appTurnoscolor: string = ''; 

  // @HostBinding('style.border-color') borderColor!: string;
  @HostBinding('style.background-color') backgroundColor!: string;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.actualizar(true);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.actualizar(false);
  }

  private actualizar(bandera:boolean) {
    
    if(bandera)
    {
      switch(this.appTurnoscolor)
      {
        case "Pendiente":
          // this.borderColor = 'orange'
          this.backgroundColor = 'orange'
          break;
        case "Aceptado":
          // this.borderColor = "green";
          this.backgroundColor = "green";
          break;
        case "Cancelado":
          // this.borderColor = "red";
          this.backgroundColor = "red";
          break;
        case "Rechazado":
          // this.borderColor = "#6c757d";
          this.backgroundColor = "#6c757d";
          break;
        case "Realizado":
          // this.borderColor = "#37c6f6";
          this.backgroundColor = "#37c6f6";
          break;
      }
    }
    else
    {
      this.backgroundColor = "#007bff"
    }
  }


}
