import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from './solicitar-turno.component';
import { FormsModule } from '@angular/forms';
import { DiaPipe } from 'src/app/pipes/dia.pipe';


@NgModule({
  declarations: [SolicitarTurnoComponent,DiaPipe],
  imports: [
    CommonModule,
    SolicitarTurnoRoutingModule,
    FormsModule
  ]
})
export class SolicitarTurnoModule { }
