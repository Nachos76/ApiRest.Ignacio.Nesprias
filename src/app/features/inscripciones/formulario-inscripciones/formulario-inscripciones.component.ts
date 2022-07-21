import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, mergeMap, switchMap, map, Observable, Subscription } from 'rxjs';
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
    curso: ['', [Validators.required]],
    alumno: ['', [Validators.required]],
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
    private alumnosService: AlumnosService,
    private activatedRoute: ActivatedRoute
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
      this.activatedRoute.params.subscribe((param) => {
        //this.activatedRoute.snapshot.params['id']  //otra forma de obtener el parametro
        if (Number(param['id']))
          this.inscripcionesService
            .seleccionarInscripcionxId(Number(param['id']))
            .subscribe({
              next: (inscripcion) => {
                if (inscripcion) {
                  this.formulario.patchValue(inscripcion);
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

  compararxId(o1: any, o2: any) {
    return (o1.id == o2.id);
   }

  cancelar() {
    this.router.navigate(['/inscripciones']);
  }

  agregarInscripcion(inscripcion: Inscripcion) {

    inscripcion.cursoId=inscripcion.curso?.id;
    inscripcion.alumnoId=inscripcion.alumno?.id;
    if (inscripcion.id) {
      //es usuario existente
      this.susbcriptions.add(
        this.inscripcionesService.editarInscripcion(inscripcion).subscribe({
          next: (inscripcion) => {
            console.log(inscripcion);
            this.router.navigate(['/inscripciones']);
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
        this.inscripcionesService
          .agregarInscripcion(inscripcion)

          .subscribe({
            next: (inscripcion) => {
              console.log(inscripcion);
              this.router.navigate(['/inscripciones']);
              this.formulario.reset();
            },
            error: (error) => {
              console.error(error);
            },
          })
      );
    }
  }

  volver(): void {
    this.router.navigate(['/inscripciones']);
  }
}
