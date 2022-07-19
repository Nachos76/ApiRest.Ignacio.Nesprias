import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take, BehaviorSubject, throwError } from 'rxjs';
import { AuthUser } from 'src/app/models/auth.model';
import { Roles } from 'src/app/models/roles.enum';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlAPI = 'https://62ce1cb7066bd2b6992ffea7.mockapi.io/api/v1/';

  private estaLogueado$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private usuarioLogueado$: BehaviorSubject<Usuario | null> =
    new BehaviorSubject<Usuario | null>(null);
  private userRecordarme: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  login(authUser: AuthUser) {
    this.userRecordarme = authUser.recordarme;
    this.http
      .get<Usuario[]>(
        this.urlAPI +
          'usuarios?p=1&l=1&email=' +
          authUser.email +
          '&password=' +
          authUser.password
      )
      .pipe(take(1))
      .subscribe({
        next: (usuarios) => {
          if (usuarios) {
            //valido que lo que trae es igual a lo que pedi, porque mockApi me hace un like
            let u =
              usuarios.find(
                (usuario: Usuario) =>
                  usuario.email === authUser.email &&
                  usuario.password === authUser.password
              ) || null;
            this.estaLogueado$.next(u ? true : false);
            this.usuarioLogueado$.next(u);

            if (authUser.recordarme) 
              localStorage.setItem('token', 'ponele que estas logueado');
            

            this.router.navigate(['/']);
          } else {
            this.usuarioLogueado$.next(null);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  fakeLogin(authUser: AuthUser) {
    if (
      authUser.email == 'admin@greencoder.com' &&
      authUser.password == '123Pass'
    ) {
      this.estaLogueado$.next(true);
      this.usuarioLogueado$.next({
        id: 2001,
        nombre: 'Demo',
        apellido: 'Admin',
        email: 'admin@greencoder.com',
        password: '123Pass',
        confirmPassword: '123Pass',
        rol: Roles.ADMIN,
        estado: 1, //activo
        imagen: '',
        descripcion: '',
        fechaAlta: '',
      });
      this.router.navigate(['/']);
    } else if (
      authUser.email == 'usuario@greencoder.com' &&
      authUser.password == '123Pass'
    ) {
      this.estaLogueado$.next(true);
      this.usuarioLogueado$.next({
        id: 2002,
        nombre: 'Juan',
        apellido: 'Usuario',
        email: 'usuario@greencoder.com',
        password: '123Pass',
        confirmPassword: '123Pass',
        rol: Roles.USER,
        estado: 1, //activo
        imagen: '',
        descripcion: '',
        fechaAlta: '',
      });
      this.router.navigate(['/']);
    } else {
      this.estaLogueado$.next(false);
      this.usuarioLogueado$.next(null);
    }
  }

  get estaAutenticado() {
    return this.estaLogueado$.asObservable();
  }

  get usuarioLogueado() {
    return this.usuarioLogueado$.asObservable();
  }

  logout() {
    this.estaLogueado$.next(false);
    this.usuarioLogueado$.next(null);
    if (!this.userRecordarme) localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  
}
