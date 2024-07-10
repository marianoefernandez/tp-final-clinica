import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[appSubrayar]',
})
export class SubrayarDirective {

  @Input() appSubrayar = '';

  constructor(private el: ElementRef) {
    // this.el.nativeElement.style.textDecoration = 'underline';
    // this.el.nativeElement.style.textDecorationColor = 'red';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.subrayar(this.appSubrayar);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.subrayar('');
  }
  
  private subrayar(color: string) {
    if(color != '')
    {
      this.el.nativeElement.style.textDecoration = 'underline';
      this.el.nativeElement.style.textDecorationColor = color;
    }
    else
    {
      this.el.nativeElement.style.textDecoration = '';
      this.el.nativeElement.style.textDecorationColor = '';
    }
  }
}