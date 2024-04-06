import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {
    path:"",redirectTo:"login",pathMatch:"full"
  }
  ,
  {
    path:"login",
    loadChildren: ()=>import('../login/login.module').then(modulo => modulo.LoginModule)
  }
  ,
  {
    path:"registro",
    loadChildren: ()=>import('../registro/registro.module').then(modulo => modulo.RegistroModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionesRoutingModule { }
