import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from 'src/app/core/services/cursos.service';
import { Curso } from 'src/app/models/curso.model';

@Component({
  templateUrl: './formulario-cursos.component.html',
  styleUrls: ['./formulario-cursos.component.scss']
})
export class FormularioCursosComponent implements OnInit {
  titulo: string = 'Ingresar nuevo curso';
  susbcriptions: Subscription = new Subscription();

  formulario = this.fb.group(
    {
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required, this.fechaValidator]],
      cantClases: ['', [Validators.required, Validators.min(1)]],
      precio: ['',[Validators.required, Validators.min(1)]],
      capacidad: ['',[Validators.required, Validators.min(1)]],
      estado: ['', [Validators.required]],
      descripcion: [''],
      imagen: [''],
    }
  );
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cursosService: CursosService
  ) { }



  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.susbcriptions.add(
      this.cursosService.obtenerCursoSeleccionado().subscribe({
        next: (curso) => {
          if (curso) {
            this.formulario.patchValue(curso);
          } else {
            this.formulario.reset();
          }
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }
  cancelar() {
    this.router.navigate(['/cursos']);
  }

  agregarUsuario(curso: Curso) {
    if (curso.id) {
      //es usuario existente
      this.cursosService.editarCurso(curso);
    } else {
      //es nuevo usuario
      curso.id = this.cursosService.obtenerSiguienteId();
      this.cursosService.agregarCurso(curso);
    }
    this.router.navigate(['/cursos']);
    this.formulario.reset();
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }

  fechaValidator(g: AbstractControl) {
    return new Date(g.value).getTime() > Date.now() ? null : { invalid: true };
  }

}
