import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss']
})
export class BadgeListComponent implements OnInit {
  @Input()
    items!:string[]|undefined
  color:string = "gray"
  texto:string = "hola"
  constructor() { }

  ngOnInit(): void {
  }

  retornarColor(element:any)  {
      let result = typeof element !== "string" ? element.toString() : element;
      switch (result.toLowerCase()) {  
        case  "javascript": 
          this.color="yelow"
          break
        case  "angular":
          this.color="red"
          break
        case  "typescript":
          this.color="indigo"
          break
        case  "c#": 
          this.color="violet"
          break
        case  "html": 
          this.color="orange"
          break
        case  "css": 
          this.color="blue"
          break
        case  "SQL": 
          this.color="blue"
          break
        case  "python": 
          this.color="indigo"
          break
        default:
          this.color="gray"
      }
      return this.color
  }

}
