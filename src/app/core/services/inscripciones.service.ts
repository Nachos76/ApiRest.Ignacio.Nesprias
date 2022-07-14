import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';

import { INSCRIPCIONES } from '../../data/mock-inscripciones';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  listaInscripciones: Inscripcion[] = INSCRIPCIONES;
  inscripcionSeleccionado$ = new BehaviorSubject<Inscripcion | null>(null);
  inscripciones$ = new BehaviorSubject<Inscripcion[]>(this.listaInscripciones);

  constructor() {}

  agregarInscripcion(inscripcion: Inscripcion) {
    this.listaInscripciones.push(inscripcion);
    this.inscripciones$.next(this.listaInscripciones);
  }

  obtenerInscripciones(nombre?: string) {
    return this.inscripciones$
      .asObservable()
      .pipe(
        map((inscripciones) =>
          nombre
            ? inscripciones.filter((inscripcion) =>
                (inscripcion.curso.nombre + ' ' + inscripcion.curso.id)
                  .toLowerCase()
                  .includes(nombre.toLowerCase().trim())
              )
            : inscripciones
        )
      );
  }

  obtenerInscripcionSeleccionado() {
    return this.inscripcionSeleccionado$.asObservable();
  }

  seleccionarInscripcionxIndice(index?: number) {
    this.inscripcionSeleccionado$.next(
      index !== undefined ? this.listaInscripciones[index] : null
    );
  }

  seleccionarInscripcionxId(id?: number) {
    let index = this.listaInscripciones.findIndex((item) => item.id == id);
    this.inscripcionSeleccionado$.next(
      index !== undefined ? this.listaInscripciones[index] : null
    );
  }

  borrarInscripcionporIndice(index?: number) {
    this.listaInscripciones = this.listaInscripciones.filter(
      (_, i) => index != i
    );
    this.inscripciones$.next(this.listaInscripciones);
  }

  borrarInscripcionporId(id?: number) {
    let index = this.listaInscripciones.findIndex((item) => item.id == id);
    this.listaInscripciones = this.listaInscripciones.filter(
      (_, i) => index != i
    );
    this.inscripciones$.next(this.listaInscripciones);
  }

  editarInscripcion(inscripcion: Inscripcion) {
    let itemIndex = this.listaInscripciones.findIndex(
      (item) => item.id == inscripcion.id
    );
    this.listaInscripciones[itemIndex] = inscripcion;
    this.inscripciones$.next(this.listaInscripciones);
  }

  obtenerInscripcionesxAlumno(id?: number,nombre?: string) {
    return this.inscripciones$
      .asObservable()
      .pipe(
        map((inscripciones) =>
            id
            ? inscripciones.filter((inscripcion) =>
                (inscripcion.alumno.id===id)
              )
            : undefined
        ),
        map((inscripciones) =>
        nombre
          ? inscripciones?.filter((inscripcion) =>
              (inscripcion.curso.nombre + ' ' + inscripcion.curso.id)
                .toLowerCase()
                .includes(nombre.toLowerCase().trim())
            )
          : inscripciones
      )
      );
  }

  obtenerInscripcionesxCurso(id?: number, nombre?: string) {
    return this.inscripciones$
      .asObservable()
      .pipe(
        map((inscripciones) =>
            id
            ? inscripciones.filter((inscripcion) =>
                (inscripcion.curso.id===id)
              )
            : undefined
        ),
        map((inscripciones) =>
        nombre
          ? inscripciones?.filter((inscripcion) =>
              (inscripcion.alumno.nombre + ' '  + inscripcion.alumno.apellido + ' ' + inscripcion.alumno.id)
                .toLowerCase()
                .includes(nombre.toLowerCase().trim())
            )
          : inscripciones
      )
      );
  }


  obtenerSiguienteId() {
    return Math.max(...this.listaInscripciones.map((o) => o.id + 1));
  }
}
