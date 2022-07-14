import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  defaultColor:string="dark"
  @Input()
    color!:string
  @Input()
    texto!:string
  constructor() { }

  ngOnInit(): void {
    this.color = (this.color)?this.color:this.defaultColor
  }

}
