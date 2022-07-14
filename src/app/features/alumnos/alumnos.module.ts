import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';
import { FormularioAlumnoComponent } from './formulario-alumno/formulario-alumno.component';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListadoAlumnosComponent,
    FormularioAlumnoComponent,
    DetalleAlumnoComponent,
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class AlumnosModule {}
