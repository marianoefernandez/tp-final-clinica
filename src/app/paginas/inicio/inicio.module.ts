import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { SubrayarDirective } from 'src/app/directivas/subrayar.directive';


@NgModule({
  declarations: [InicioComponent,SubrayarDirective],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
