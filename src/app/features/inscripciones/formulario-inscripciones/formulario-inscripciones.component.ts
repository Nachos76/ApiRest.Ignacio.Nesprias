import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { Curso } from 'src/app/models/curso.model';
import { Alumno } from 'src/app/models/alumno.model';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AlumnosService } from 'src/app/core/services/alumnos.service';

@Component({
  templateUrl: './formulario-inscripciones.component.html',
  styleUrls: ['./formulario-inscripciones.component.scss'],
})
export class FormularioInscripcionesComponent implements OnInit {
  titulo: string = 'Ingresar nueva inscripción';
  susbcriptions: Subscription = new Subscription();

  formulario = this.fb.group({
    id: [''],
    cursoId: ['', [Validators.required]],
    alumnoId: ['', [Validators.required]],
    fecha: [''],
    estado: ['', [Validators.required]],
  });

  cursosOPT$!: Observable<Curso[]>;
  alumnosOPT$!: Observable<Alumno[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService
  ) {
    this.cursosOPT$ = this.cursosService
      .obtenerCursos()
      .pipe(map((curso) => curso));
    this.alumnosOPT$ = this.alumnosService
      .obtenerAlumnos()
      .pipe(map((alumno) => alumno));
  }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.inscripcionesService.obtenerInscripcionSeleccionado().subscribe({
        next: (inscripcion) => {
          if (inscripcion) {
            this.formulario.patchValue(inscripcion);
            this.formulario.get('cursoId')?.setValue(inscripcion.curso.id);
            this.formulario.get('alumnoId')?.setValue(inscripcion.alumno.id);
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
    this.router.navigate(['/inscripciones']);
  }

  agregarInscripcion(inscripcion: Inscripcion) {
    inscripcion.curso = this.cursosService.obtenerCursoxId(this.formulario.get('cursoId')!.value);
    inscripcion.alumno = this.alumnosService.obtenerAlumnoxId(this.formulario.get('alumnoId')!.value);
    if (inscripcion.id) {
      //es usuario existente
      this.inscripcionesService.editarInscripcion(inscripcion);
    } else {
      //es nuevo usuario
      inscripcion.id = this.inscripcionesService.obtenerSiguienteId();
      this.inscripcionesService.agregarInscripcion(inscripcion);
    }
    this.router.navigate(['/inscripciones']);
    this.formulario.reset();
  }

  volver(): void {
    this.router.navigate(['/inscripciones']);
  }
}

