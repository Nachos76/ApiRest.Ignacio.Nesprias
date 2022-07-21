import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map, Observable, subscribeOn, Subscription } from 'rxjs';
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

  displayedColumnsTable = ['id', 'nombre', 'descripcion', 'actions'];
  tableDataSource$: Observable<MatTableDataSource<Inscripcion>> | undefined;
  buscador = new FormControl();

  constructor(
    private cursosService: CursosService,
    private router: Router,
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.activatedRoute.params.subscribe((param) => {
        //this.activatedRoute.snapshot.params['id']  //otra forma de obtener el parametro
        this.cursosService.seleccionarCursoxId(Number(param['id'])).subscribe({
          next: (curso) => {
            if (curso) {
              this.curso = curso;
              this.obtenerAlumnos(this.curso!.id);
            } else {
              this.curso = undefined;
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      })
    );

    this.buscador.valueChanges.subscribe((nombre: string) => {
      this.obtenerAlumnos(this.curso!.id, nombre);
    });
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }

  eliminar(item: Inscripcion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el registro de ' +
        item?.alumno?.nombre +
        ' ' +
        item?.alumno?.apellido +
        ' del curso ' +
        item?.curso?.nombre,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.inscripcionesService
          .borrarInscripcionxId(item.id)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (e) => console.error(e),
            complete: () => this.obtenerAlumnos(this.curso!.id),
          });
      }
    });
  }

  obtenerAlumnos(id: number, nombre?: string) {
    this.tableDataSource$ = this.inscripcionesService
      .obtenerInscripcionesxCurso(id, nombre)
      .pipe(
        map(
          (inscripciones) => new MatTableDataSource<Inscripcion>(inscripciones)
        )
      );
  }
}
