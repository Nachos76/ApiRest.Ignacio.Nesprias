import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BadgeListComponent } from './components/badge-list/badge-list.component';
import { BadgeComponent } from './components/badge/badge.component';
import { TituloGrillaComponent } from './components/titulo-grilla/titulo-grilla.component';
import { ConfirmDialogComponent } from './components/Dialogs/confirm-dialog/confirm-dialog.component';
import { ContarHoyDirective } from './directives/contar-hoy.directive';
import { EsTituloDirective } from './directives/es-titulo.directive';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { MaterialModule } from '../modules/material.module';
import { VisEstadoPipe } from './pipes/vis-estado.pipe';
import { VisRolesPipe } from './pipes/vis-roles.pipe';
import { GrillaComponent } from './components/grilla/grilla.component';
import { RolesPermitidosDirective } from './directives/roles-permitidos.directive';




@NgModule({
  declarations: [
    AvatarComponent,
    BadgeListComponent,
    BadgeComponent,
    ContarHoyDirective,
    NombreApellidoPipe,
    EsTituloDirective,
    ConfirmDialogComponent,
    TituloGrillaComponent,
    VisEstadoPipe,
    VisRolesPipe,
    GrillaComponent,
    RolesPermitidosDirective

  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AvatarComponent,
    BadgeListComponent,
    BadgeComponent,
    ContarHoyDirective,
    NombreApellidoPipe,
    EsTituloDirective,
    ConfirmDialogComponent,
    TituloGrillaComponent,
    VisEstadoPipe,
    VisRolesPipe,
    GrillaComponent,
    RolesPermitidosDirective
  ]
})
export class SharedModule { }
