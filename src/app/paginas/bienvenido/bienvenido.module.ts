import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    BienvenidoRoutingModule
  ]
})
export class BienvenidoModule { }
