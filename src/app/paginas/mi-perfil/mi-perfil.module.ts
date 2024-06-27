import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { RegistrarHorariosComponent } from 'src/app/componentes/registrar-horarios/registrar-horarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [MiPerfilComponent,RegistrarHorariosComponent],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule
  ]
})
export class MiPerfilModule { }
