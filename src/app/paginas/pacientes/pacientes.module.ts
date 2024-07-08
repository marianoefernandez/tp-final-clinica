import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';


@NgModule({
  declarations: [PacientesComponent,FechaPipe],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PacientesModule { }
