import { Roles } from '../models/roles.enum';
import { Usuario } from '../models/usuario.model';


export const USUARIOS: Usuario[] = [
    {   id: 2001, 
        nombre:"Juan",
        apellido:"Alumno",
        email:"jperez99@gmail.com",
        password:"password1234" ,
        confirmPassword:"password1234", 
        rol: Roles.USER,
        estado:1,   //activo
        imagen: "/assets/avatars/av1.png",
        descripcion:"Curioso, fanatico de lo que hago.",
        fechaAlta:'2021-10-06'
    },
    {   id: 2002, 
        nombre:"Roberto",
        apellido:"Saenz",
        email:"jperez99@gmail.com",
        password:"password1234" ,
        confirmPassword:"password1234", 
        rol: Roles.ADMIN,
        estado:1,   //activo
        imagen: "/assets/avatars/av2.png",
        descripcion:"El serio administrador de siempre, je",
        fechaAlta:'2020-02-06'
    },
    {   id: 2003, 
        nombre:"Lucy",
        apellido: "Liu",
        email:"jperez99@gmail.com",
        password:"password1234" ,
        confirmPassword:"password1234", 
        rol: Roles.USER,
        estado:0,   //activo
        imagen: "/assets/avatars/av7.png",
        descripcion:"Mejor me borro de acá",
        fechaAlta:'2021-07-23'
    }  
  ];