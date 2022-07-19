import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadingStrategy,
  PreloadAllModules,
} from '@angular/router';

import { ListadoAlumnosComponent } from './features/alumnos/listado-alumnos/listado-alumnos.component';
import { ListadoCursosComponent } from './features/cursos/listado-cursos/listado-cursos.component';
import { Alumno } from './models/alumno.model';
import { LoginComponent } from './core/auth/login/login.component';
import { CursosModule } from './features/cursos/cursos.module';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LoginLayoutComponent } from './pages/login-layout/login-layout.component';
import { AuthModule } from './core/auth/auth.module';
import { Roles } from './models/roles.enum';
import { AuthRoleGuard } from './core/guards/auth-role.guard';

const routes: Routes = [
  // { path: '', component: LoginComponent},
  // { path: 'cursos', loadChildren: () => import('./features/cursos/cursos.module').then(m => m.CursosModule) },
  // { path: 'alumnos', loadChildren: () => import('./features/alumnos/alumnos.module').then(m => m.AlumnosModule) },
  // { path: 'usuarios', loadChildren: () => import('./features/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  // { path: 'inscripciones', loadChildren: () => import('./features/inscripciones/inscripciones.module').then(m => m.InscripcionesModule) },
  // { path: 'alumnos', loadChildren: () => import('./features/alumnos/alumnos.module').then(m => m.AlumnosModule) },

  //{path:'**', redirectTo:''}

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/cursos/cursos.module').then((m) => m.CursosModule),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./features/cursos/cursos.module').then((m) => m.CursosModule),
      },
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./features/alumnos/alumnos.module').then(
            (m) => m.AlumnosModule
          ),
      },
      {
        path: 'usuarios',
        canActivate: [AuthRoleGuard],
        data: {
          roles: [Roles.ADMIN],
        },
        loadChildren: () =>
          import('./features/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
      {
        path: 'inscripciones',
        loadChildren: () =>
          import('./features/inscripciones/inscripciones.module').then(
            (m) => m.InscripcionesModule
          ),
      },
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./features/alumnos/alumnos.module').then(
            (m) => m.AlumnosModule
          ),
      },
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
