import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioUsuariosComponent } from './formulario-usuarios/formulario-usuarios.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';


const routes: Routes = [
  { path: '', component: ListadoUsuariosComponent },
  // { path: 'usuarios', component: ListadoUsuariosComponent },
  { path: 'form-usuarios', component: FormularioUsuariosComponent},
  { path: 'detalle', component: DetalleUsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
