import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  private defaultImagen : string = 'assets/avatars/avatar.png'
  @Input()
  imagen! : string |null|undefined
  constructor() { }

  ngOnInit(): void {
    this.imagen = (this.imagen)?this.reemplazarURL(this.imagen):this.defaultImagen
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.imagen = (this.imagen)?this.reemplazarURL(this.imagen):this.defaultImagen
   }

   reemplazarURL(str:string){
      return str.replace("https://getavataaars.com/", "https://avataaars.io/");

   }
}
