import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap, take } from 'rxjs';
import { AuthUser } from 'src/app/models/auth.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario!: Usuario | undefined;

  formulario = this.fb.group({
    email: [
      'usuario@greencoder.com',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    password: ['123Pass', Validators.required],
    recordarme: ['true'],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}


  ngOnInit(): void {}

  autenticar(authUser: AuthUser) {
    if (authUser) {
      this.authService.fakeLogin(authUser);
      this.authService.estaAutenticado.pipe(
        take(1),
        map((estaAutenticado: boolean) => {
          if (!estaAutenticado) {
            this.authService.login(authUser)
          }
        })
      ).subscribe();
    }
  //TODO: Mostrar mensaje de usuario o contraseña erronea
   // this.formulario.reset();
  }
}
