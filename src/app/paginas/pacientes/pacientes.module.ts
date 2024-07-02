import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PacientesComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PacientesModule { }
