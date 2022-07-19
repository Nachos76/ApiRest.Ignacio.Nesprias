import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { FormularioCursosComponent } from './formulario-cursos/formulario-cursos.component';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';

const routes: Routes = [
  { path: '', component: ListadoCursosComponent},
  { path: 'form/:id', component: FormularioCursosComponent},
  { path: 'form', component: FormularioCursosComponent},
  { path: 'detalle/:id', component: DetalleCursosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }

