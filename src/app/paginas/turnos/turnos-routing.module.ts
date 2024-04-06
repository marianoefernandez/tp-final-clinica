import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosComponent } from './turnos.component';

const routes: Routes = 
[
  {
    path:"",
    component:TurnosComponent,
    children:
    [
      {
        path:"ver-turnos",
        loadChildren: ()=>import('../ver-turnos/ver-turnos.module').then(modulo => modulo.VerTurnosModule)
      }
      ,
      {
        path:"mis-turnos",
        loadChildren: ()=>import('../mis-turnos/mis-turnos.module').then(modulo => modulo.MisTurnosModule)
      }
      ,
      {
        path:"solicitar-turno",
        loadChildren: ()=>import('../solicitar-turno/solicitar-turno.module').then(modulo => modulo.SolicitarTurnoModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
