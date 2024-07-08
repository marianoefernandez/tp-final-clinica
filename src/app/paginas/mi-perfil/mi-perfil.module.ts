import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { RegistrarHorariosComponent } from 'src/app/componentes/registrar-horarios/registrar-horarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { NgApexchartsModule } from 'ng-apexcharts';
// import 'moment/locale/ja';
// import 'moment/locale/fr';



@NgModule({
  declarations: [MiPerfilComponent,RegistrarHorariosComponent,CapitalizePipe],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgApexchartsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ]
})
export class MiPerfilModule { }
