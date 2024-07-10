import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appNavbar]'
})
export class NavbarDirective {

  @Input() appNavbar: string = ''; 

  @HostBinding('style.background-color') backgroundColor!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.actualizar();
  }

  ngOnChanges() {
    this.actualizar();
  }


  private actualizar() {
    
    switch (this.appNavbar) {
      case 'Paciente':
        this.backgroundColor = '#dc3545';
        break;
      case 'Especialista':
        this.backgroundColor = '#007bff';
        break;
      case 'Administrador':
        this.backgroundColor = '#b59410';
        break;
    }
  }

}
