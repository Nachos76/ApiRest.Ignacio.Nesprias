import { Roles } from './roles.enum';
export interface Usuario {
    id:number   //id del usuario
    nombre:string   //nombre del usuario
    apellido:string   //apellido del usuario
    email:string    //email del usuario
    password?:string //password del usuario
    confirmPassword?:string, //confirmacion password del usuario
    rol:Roles, //rol del usuario
    estado:number   //estado del usuario //Activo-inactiva
    imagen:string|null   //imagen del usuario
    descripcion?:string   //descripcion/presentacion del usuario
    fechaAlta?:string //fecha alta del usuario
}
