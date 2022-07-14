import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { CursosService } from 'src/app/core/services/cursos.service';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { Curso } from 'src/app/models/curso.model';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  templateUrl: './detalle-cursos.component.html',
  styleUrls: ['./detalle-cursos.component.scss'],
})
export class DetalleCursosComponent implements OnInit {
  titulo: string = 'Detalle del curso';
  susbcriptions: Subscription = new Subscription();
  curso?: Curso;

  displayedColumnsTable = ['id', 'nombre', 'descripcion','actions'];
  tableDataSource$: Observable<MatTableDataSource<Inscripcion>> | undefined;
  buscador = new FormControl();

  constructor(
    private cursoService: CursosService,
    private router: Router,
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.cursoService.obtenerCursoSeleccionado().subscribe({
        next: (curso) => {
          if (curso) {
            this.curso = curso;
            this.tableDataSource$ = this.inscripcionesService
              .obtenerInscripcionesxCurso(this.curso?.id)
              .pipe(
                map(
                  (inscripcion) =>
                    new MatTableDataSource<Inscripcion>(inscripcion)
                )
              );
          } else {
            this.curso = undefined;
          }
        },
        error: (error) => {
          console.error(error);
        },
      })
    );

    this.buscador.valueChanges.subscribe((nombre: string) => {
      this.tableDataSource$ = this.inscripcionesService
        .obtenerInscripcionesxCurso(this.curso?.id, nombre)
        .pipe(
          map((inscripcion) => new MatTableDataSource<Inscripcion>(inscripcion))
        );
    });
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }
  eliminar(item?: Inscripcion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el registro de ' +
        item?.alumno.nombre +
        ' ' +
        item?.alumno.apellido +
        ' del curso ' +
        item?.curso.nombre,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.inscripcionesService.borrarInscripcionporId(item?.id);
      }
    });
  }
}
