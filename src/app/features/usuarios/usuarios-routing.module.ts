import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioUsuariosComponent } from './formulario-usuarios/formulario-usuarios.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: ListadoUsuariosComponent },
  // { path: 'usuarios', component: ListadoUsuariosComponent },
  {
    path: 'form-usuarios/:id',
    canActivate: [AuthGuard],
    component: FormularioUsuariosComponent,
  },
  {
    path: 'form-usuarios',
    canActivate: [AuthGuard],
    component: FormularioUsuariosComponent,
  },
  {
    path: 'detalle/:id',
    canActivate: [AuthGuard],
    component: DetalleUsuariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
