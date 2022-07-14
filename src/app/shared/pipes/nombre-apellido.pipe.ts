import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreApellido'
})
export class NombreApellidoPipe implements PipeTransform {

  transform(nombre: string|null|undefined, ...[apellido, usarMayusculas]: [string | null | undefined, 'nombre' | 'apellido' | 'ambos' | null]): string {
    switch (usarMayusculas) {
      case 'nombre':
        return nombre?.toUpperCase() + (apellido ? ' ' + apellido : '');
      case 'apellido':
        return nombre + (apellido ? ' ' + apellido.toUpperCase() : '');
      case 'ambos':
        return nombre?.toUpperCase() + (apellido ? ' ' + apellido.toUpperCase() : '');
      default:
        return nombre + (apellido ? ' ' + apellido : '');
    }
  }

}
