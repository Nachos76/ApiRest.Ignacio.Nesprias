import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take,filter, debounceTime,distinctUntilChanged, takeUntil, map, Observable, Subscription, Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent implements OnInit {
  titulo: string = 'Listado de Usuarios';
  displayedColumnsTable = ['id', 'nombre', 'email', 'rol', 'actions'];
  tableDataSource$: Observable<MatTableDataSource<Usuario>> | undefined;
  destroy$: Subject<boolean> = new Subject<boolean>();
  buscador = new FormControl();

  susbcriptions: Subscription = new Subscription();

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.obtenerUsuarios()
    // this.tableDataSource$ = this.usuarioService.obtenerUsuarios().pipe(
    //   tap((usuarios) => console.log(usuarios)),
    //   map((usuarios) => new MatTableDataSource<Usuario>(usuarios))
    // );
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
      this.obtenerUsuarios(nombre)
      // this.tableDataSource$ = this.usuarioService
      //   .obtenerUsuarios(nombre)
      //   .pipe(map((usuario) => new MatTableDataSource<Usuario>(usuario)));
    });
  }

  obtenerUsuarios(nombre?: string) {
    this.tableDataSource$ = this.usuarioService.obtenerUsuarios(nombre).pipe(
      map((usuarios) => new MatTableDataSource<Usuario>(usuarios))
    );
  }

  seleccionarUsuario(id: number) {
   // this.usuarioService.seleccionarUsuarioxId(id);
    this.router.navigate(['/usuarios/detalle/'+id]);
  }

  eliminarUsuario(item: Usuario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el registro de  ' +
        item?.nombre +
        ' ' +
        item?.apellido,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.usuarioService
        .borrarUsuarioxId(item.id)
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (e) => console.error(e),
          complete: () => this.obtenerUsuarios()
            // (this.tableDataSource$ = this.cursosService.obtenerCursos().pipe(
            //   tap((cursos) => console.log(cursos)),
            //   map((cursos) => new MatTableDataSource<Curso>(cursos))
            // )),
        });
      }
    });
  }

  editarUsuario(id?: number) {
    //this.usuarioService.seleccionarUsuarioxId(id);
    this.router.navigate(['/usuarios/form-usuarios/'+id]);
  }

  agregarUsuario() {
    //this.usuarioService.seleccionarUsuarioxIndice(-1);
    this.router.navigate(['/usuarios/form-usuarios']);
  }
}
