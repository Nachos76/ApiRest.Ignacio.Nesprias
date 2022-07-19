import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { ThemeInitializerProvider } from './theme/theme-initializer.provider';

import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { MainComponent } from './layout/main/main.component';
import { ListadoAlumnosComponent } from './features/alumnos/listado-alumnos/listado-alumnos.component';
import { DetalleAlumnoComponent } from './features/alumnos/detalle-alumno/detalle-alumno.component';

import { GrillaComponent } from './shared/components/grilla/grilla.component';
import { AsideComponent } from './layout/aside/aside.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FormularioAlumnoComponent } from './features/alumnos/formulario-alumno/formulario-alumno.component';
import { ListadoCursosComponent } from './features/cursos/listado-cursos/listado-cursos.component';

import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './features/usuarios/usuarios-routing.module';
import { AuthModule } from './core/auth/auth.module';
import { LayoutModule } from './layout/layout.module';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { LoginLayoutComponent } from './pages/login-layout/login-layout.component';
registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ToolbarComponent,
    AsideComponent,
    MainComponent,
    NavigationComponent,
    MainLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    LayoutModule,
  ],
  providers: [ThemeInitializerProvider, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
