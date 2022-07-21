import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.scss'],
})
export class FormularioUsuariosComponent implements OnInit {
  titulo: string = 'Ingresar nuevo usuario';
  susbcriptions: Subscription = new Subscription();

  formulario = this.fb.group(
    {
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
        ],
      ],
      imagen: [''],
      descripcion: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validator: this.passwordMatchValidator }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.activatedRoute.params.subscribe((param) => {
        //this.activatedRoute.snapshot.params['id']  //otra forma de obtener el parametro
        if (Number(param['id']))
          this.usuarioService
            .seleccionarUsuarioxId(Number(param['id']))
            .subscribe({
              next: (usuario) => {
                if (usuario) {
                  this.formulario.patchValue(usuario);
                } else {
                  this.formulario.reset();
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
      })
    );

  }

  passwordMatchValidator(g: AbstractControl) {
    return g.get('password')?.value ===
      g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

  agregarUsuario(usuario: Usuario) {
    if (usuario.id) {
      //es usuario existente
      this.susbcriptions.add(
        this.usuarioService.editarUsuario(usuario).subscribe({
          next: (usuario) => {
            console.log(usuario);
            this.router.navigate(['/usuarios']);
            this.formulario.reset();
          },
          error: (error) => {
            console.error(error);
          },
        })
      );
    } else {
      //es nuevo usuario
      this.susbcriptions.add(
        this.usuarioService.agregarUsuario(usuario).subscribe({
          next: (usuario) => {
            console.log(usuario);
            this.router.navigate(['/usuarios']);
            this.formulario.reset();
          },
          error: (error) => {
            console.error(error);
          },
        })
      );
    }
    
  }

  agregarUsuarioOri(usuario: Usuario) {
    if (usuario.id) {
      //es usuario existente
      this.usuarioService.editarUsuario(usuario);
    } else {
      //es nuevo usuario
      usuario.id = this.usuarioService.obtenerSiguienteId();
      this.usuarioService.agregarUsuario(usuario);
    }
    this.router.navigate(['/usuarios']);
    this.formulario.reset();
  }

  
  volver(): void {
    this.router.navigate(['/usuarios']);
  }
}
