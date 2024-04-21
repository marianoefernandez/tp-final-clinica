import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerTurnosRoutingModule } from './ver-turnos-routing.module';
import { VerTurnosComponent } from './ver-turnos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerTurnosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VerTurnosRoutingModule
  ]
})
export class VerTurnosModule { }
