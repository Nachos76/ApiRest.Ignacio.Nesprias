import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap, map, Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadoUsuariosComponent implements OnInit {
  titulo: string = 'Listado de Usuarios';
  displayedColumnsTable = ['id', 'nombre', 'email', 'rol', 'actions'];
  tableDataSource$: Observable<MatTableDataSource<Usuario>> | undefined;

  buscador = new FormControl();

  susbcriptions: Subscription = new Subscription();

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.tableDataSource$ = this.usuarioService.obtenerUsuarios().pipe(
      tap((usuarios) => console.log(usuarios)),
      map((usuarios) => new MatTableDataSource<Usuario>(usuarios))
    );
  }

  ngOnInit(): void {
    this.buscador.valueChanges.subscribe((nombre: string) => {
      this.tableDataSource$ = this.usuarioService
        .obtenerUsuarios(nombre)
        .pipe(map((usuario) => new MatTableDataSource<Usuario>(usuario)));
    });
  }

  seleccionarUsuario(id?: number) {
    this.usuarioService.seleccionarUsuarioxId(id);
    this.router.navigate(['/usuarios/detalle']);
  }

  eliminarUsuario(item?: Usuario) {
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
        this.usuarioService.borrarUsuarioporId(item?.id);
      }
    });
  }

  editarUsuario(id?: number) {
    this.usuarioService.seleccionarUsuarioxId(id);
    this.router.navigate(['/usuarios/form-usuarios']);
  }

  agregarUsuario() {
    this.usuarioService.seleccionarUsuarioxIndice(-1);
    this.router.navigate(['/usuarios/form-usuarios']);
  }
}
