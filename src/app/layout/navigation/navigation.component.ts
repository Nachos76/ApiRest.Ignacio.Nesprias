import { Component, ViewChild } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @ViewChild('sidenav', {static: false}) sidenav?: AsideComponent;
  constructor() {}

  toggleSidenav(){
    this.sidenav?.toggle();

  }
}
