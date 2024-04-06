import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ListarUsuariosComponent } from 'src/app/componentes/listar-usuarios/listar-usuarios.component';
import { RegistrarTodosUsuariosComponent } from 'src/app/componentes/registrar-todos-usuarios/registrar-todos-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuariosComponent,ListarUsuariosComponent,RegistrarTodosUsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
