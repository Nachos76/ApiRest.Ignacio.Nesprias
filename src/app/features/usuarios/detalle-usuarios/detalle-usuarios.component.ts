import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  templateUrl: './detalle-usuarios.component.html',
  styleUrls: ['./detalle-usuarios.component.scss'],
})
export class DetalleUsuariosComponent implements OnInit {
  titulo: string = 'Detalles del usuario';
  susbcriptions: Subscription = new Subscription();
  usuario?: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.usuarioService.obtenerUsuarioSeleccionado().subscribe({
        next: (usuario) => {
          if (usuario) {
            this.usuario = usuario;
          } else {
            this.usuario = undefined;
          }
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  volver(): void {
    this.router.navigate(['/usuarios']);
  }
}
