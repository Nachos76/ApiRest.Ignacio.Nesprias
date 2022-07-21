import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleInscripcionesComponent } from './detalle-inscripciones/detalle-inscripciones.component';
import { FormularioInscripcionesComponent } from './formulario-inscripciones/formulario-inscripciones.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';

const routes: Routes = [
  { path: '', component: ListadoInscripcionesComponent },
  { path: 'form/:id', component: FormularioInscripcionesComponent},
  { path: 'form', component: FormularioInscripcionesComponent},
  { path: 'detalle/:id', component: DetalleInscripcionesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
