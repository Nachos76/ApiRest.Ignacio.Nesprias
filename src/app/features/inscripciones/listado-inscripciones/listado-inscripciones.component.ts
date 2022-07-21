import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take,distinctUntilChanged, filter, takeUntil, debounceTime, map, Observable, Subscription, Subject } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';
import { InscripcionesService } from '../../../core/services/inscripciones.service';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss'],
})
export class ListadoInscripcionesComponent implements OnInit {
  titulo: string = 'Listado de Inscripciones';
  displayedColumnsTable = [
    'id',
    'alumno',
    'curso',
    'fecha',
    'estado',
    'actions',
  ];
  tableDataSource$: Observable<MatTableDataSource<Inscripcion>> | undefined;
  buscador = new FormControl();
  susbcriptions: Subscription = new Subscription();
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.obtenerInscripciones()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    this.buscador.valueChanges
    .pipe(
      filter((res) => res.length > 2 || res.length === 0),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    )
    .subscribe((nombre: string) => {
      this.obtenerInscripciones(nombre)
    });
  }

  obtenerInscripciones(nombre?: string) {
    this.tableDataSource$ = this.inscripcionesService.obtenerInscripciones(nombre).pipe(
      map((inscripciones) => new MatTableDataSource<Inscripcion>(inscripciones))
    );
  }

  agregar() {
    this.router.navigate(['/inscripciones/form']);
  }

  seleccionar(id: number) {
    this.router.navigate(['/inscripciones/detalle/'+id]);
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
            complete: () => this.obtenerInscripciones()
          });
      }
    });
  }

  editar(id: number) {
    this.router.navigate(['/inscripciones/form/'+id]);
  }

}
