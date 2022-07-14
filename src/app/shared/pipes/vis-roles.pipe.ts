import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from 'src/app/models/roles.enum';

@Pipe({
  name: 'visRoles'
})
export class VisRolesPipe implements PipeTransform {

  transform(rol: string|null|undefined): string {
    switch (rol) {
      case Roles.ADMIN:
        return "Administrador";
      case Roles.USER:
        return "Usuario";
      default:
        return "S/D";
    }
  }

}
