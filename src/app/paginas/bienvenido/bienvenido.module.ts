import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarDirective } from 'src/app/directivas/navbar.directive';


@NgModule({
  declarations: [NavbarComponent,NavbarDirective],
  imports: [
    CommonModule,
    BienvenidoRoutingModule
  ]
})
export class BienvenidoModule { }
