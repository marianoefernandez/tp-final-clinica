import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerTurnosRoutingModule } from './ver-turnos-routing.module';
import { VerTurnosComponent } from './ver-turnos.component';


@NgModule({
  declarations: [
    VerTurnosComponent
  ],
  imports: [
    CommonModule,
    VerTurnosRoutingModule
  ]
})
export class VerTurnosModule { }
