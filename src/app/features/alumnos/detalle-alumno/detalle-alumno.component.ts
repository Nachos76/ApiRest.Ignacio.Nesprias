import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map, Observable, Subscription } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { Alumno } from 'src/app/models/alumno.model';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.scss'],
})
export class DetalleAlumnoComponent implements OnInit {
  titulo: string = 'Detalle del alumno';
  susbcriptions: Subscription = new Subscription();
  alumno?: Alumno;

  displayedColumnsTable = [
    'id',
    'nombre',
    'fechaInicio',
    'descripcion',
    'actions',
  ];
  tableDataSource$: Observable<MatTableDataSource<Inscripcion>> | undefined;
  buscador = new FormControl();
  defaultImagen: string = 'assets/avatars/avatar.png';

  constructor(
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.susbcriptions.add(
      this.activatedRoute.params.subscribe((param) => {
        //this.activatedRoute.snapshot.params['id']  //otra forma de obtener el parametro
        this.alumnosService.seleccionarAlumnoxId(Number(param['id'])).subscribe({
          next: (alumno) => {
            if (alumno) {
              this.alumno = alumno;
              this.obtenerCursos(this.alumno!.id)
            } else {
              this.alumno = undefined;
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      })
    );


    this.buscador.valueChanges.subscribe((nombre: string) => {
      this.obtenerCursos(this.alumno!.id, nombre)
    });
  }

  reemplazarURL(str?: string | null) {
    return str?.replace('https://getavataaars.com/', 'https://avataaars.io/');
  }
  
  volver(): void {
    this.router.navigate(['/alumnos']);
  }

  eliminar(item: Inscripcion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message: 'Esta seguro que desea eliminar el registro de ' + item?.alumno?.nombre + ' ' + item?.alumno?.apellido + ' del curso ' + item?.curso?.nombre,
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
            complete: () => this.obtenerCursos(this.alumno!.id),
          });
      }
    });
  }


  obtenerCursos(id: number, nombre?: string) {
    this.tableDataSource$ = this.inscripcionesService
      .obtenerInscripcionesxAlumno(id, nombre)
      .pipe(
        map(
          (inscripciones) => new MatTableDataSource<Inscripcion>(inscripciones)
        )
      );
  }
}
