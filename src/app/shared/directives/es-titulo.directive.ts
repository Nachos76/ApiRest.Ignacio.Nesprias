import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEsTitulo]'
})
export class EsTituloDirective {

  constructor(private elementRef: ElementRef) { 
    this.elementRef.nativeElement.style.fontSize = '20px'
  }

}
