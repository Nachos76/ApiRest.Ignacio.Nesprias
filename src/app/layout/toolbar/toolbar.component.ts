import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { ThemeMode } from 'src/app/theme/models/theme.enum';
import { ThemeService } from 'src/app/theme/services/theme.service';
import { Theme } from 'src/app/theme/models/theme.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Roles } from 'src/app/models/roles.enum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output()
  toggleSidenav = new EventEmitter<any>();
  usuarioLogueadoPromise?: Promise<Usuario | void>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  usuarioLogueado?:Usuario
  ThemeMode = ThemeMode
  currentTheme: Theme
  roles = Roles;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private usuarioService: UsuarioService,
    private router: Router,
    private themeService: ThemeService,
    private authService : AuthService
  ) {this.currentTheme = this.themeService.getCurrentTheme();}



  ngOnInit(): void {
    this.usuarioLogueadoPromise = this.usuarioService
      .obtenerUsuarioLogueado()
    //  .then((usuario) => { this.usuarioLogueado = usuario})
      .catch((error) => {
        console.log(error); //Uncaught {msg: "error"}
      });
  }

  toggle() {
    this.toggleSidenav.emit(true);
  }

  navegarA(ruta:string) {
    this.router.navigate( ["/"+ruta] )

  }

  editarPerfil(){
    this.usuarioService.seleccionarUsuarioLogueado()
    this.navegarA( "/usuarios/form-usuarios")
  }
  
  changeThemeMode(themeMode: ThemeMode){
    this.themeService.changeThemeMode(themeMode == ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK, themeMode);
  }

  salir() {
    this.authService.logout();
  }
}
