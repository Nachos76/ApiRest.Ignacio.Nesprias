import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';
import { Alumno } from 'src/app/models/alumno.model';
import { ALUMNOS } from '../../data/mock-alumnos';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  listaAlumnos: Alumno[] = ALUMNOS;
  alumnosSeleccionado$ = new BehaviorSubject<Alumno | null>(null);
  alumnos$ = new BehaviorSubject<Alumno[]>(this.listaAlumnos);

  constructor() {}

  agregarAlumno(alumnos: Alumno) {
    this.listaAlumnos.push(alumnos);
    this.alumnos$.next(this.listaAlumnos);
  }

  obtenerAlumnos(nombre?: string) {
    return this.alumnos$
      .asObservable()
      .pipe(
        map((alumnos) =>
          nombre
            ? alumnos.filter((alumno) =>
                (
                  alumno.nombre +
                  ' ' +
                  alumno.apellido +
                  ' ' +
                  alumno.email +
                  ' ' +
                  alumno.id
                )
                  .toLowerCase()
                  .includes(nombre.toLowerCase().trim())
              )
            : alumnos
        )
      );
  }

  obtenerAlumnoSeleccionado() {
    return this.alumnosSeleccionado$.asObservable();
  }

  seleccionarAlumnoxIndice(index?: number) {
    this.alumnosSeleccionado$.next(
      index !== undefined ? this.listaAlumnos[index] : null
    );
  }

  seleccionarAlumnoxId(id?: number) {
    let index = this.listaAlumnos.findIndex((item) => item.id == id);
    this.alumnosSeleccionado$.next(
      index !== undefined ? this.listaAlumnos[index] : null
    );
  }

  borrarAlumnoporIndice(index?: number) {
    this.listaAlumnos = this.listaAlumnos.filter((_, i) => index != i);
    this.alumnos$.next(this.listaAlumnos);
  }

  borrarAlumnoporId(id?: number) {
    let index = this.listaAlumnos.findIndex((item) => item.id == id);
    this.listaAlumnos = this.listaAlumnos.filter((_, i) => index != i);
    this.alumnos$.next(this.listaAlumnos);
  }

  editarAlumno(alumno: Alumno) {
    let itemIndex = this.listaAlumnos.findIndex((item) => item.id == alumno.id);
    this.listaAlumnos[itemIndex] = alumno;
    this.alumnos$.next(this.listaAlumnos);
  }

  // buscarAlumnoxNombre(nombre: string) {
  //   return of(this.listaAlumnos).pipe(
  //     map((alumnos) =>
  //       alumnos.filter((alumno) =>
  //         (
  //           alumno.nombre +
  //           ' ' +
  //           alumno.apellido +
  //           ' ' +
  //           alumno.email +
  //           ' ' +
  //           alumno.id
  //         )
  //           .toLowerCase()
  //           .includes(nombre.toLowerCase())
  //       )
  //     ),
  //     catchError((error) => {
  //       throw new Error(error);
  //     })
  //   );
  // }

  obtenerSiguienteId() {
    return Math.max(...this.listaAlumnos.map((o) => o.id + 1));
  }

  obtenerAlumnoxId(id: number) {
    let index = this.listaAlumnos.findIndex((item) => item.id == id);
    //return index !== undefined ? this.listaCursos[index] : null
    return this.listaAlumnos[index] 
    ;
  }
}
