import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';
import { FormsModule } from '@angular/forms';
import { TurnoscolorDirective } from 'src/app/directivas/turnoscolor.directive';


@NgModule({
  declarations: [MisTurnosComponent,TurnoscolorDirective],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    FormsModule
  ]
})
export class MisTurnosModule { }
