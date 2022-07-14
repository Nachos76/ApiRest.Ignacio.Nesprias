import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { FormularioUsuariosComponent } from './formulario-usuarios/formulario-usuarios.component';
import { MaterialModule } from '../../modules/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';




@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    FormularioUsuariosComponent,
    DetalleUsuariosComponent   
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ]
})
export class UsuariosModule { }
