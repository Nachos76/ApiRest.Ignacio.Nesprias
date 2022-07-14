import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../Dialogs/confirm-dialog/confirm-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.scss']
})
export class GrillaComponent implements OnInit {
@Input()
  titulo!:string
@Input()
  datos!:any[]
@Output()
  enviarSeleccionado = new EventEmitter<any>();
@Output()
  actualizarSeleccionado = new EventEmitter<any>();
@Output()
  eliminarSeleccionado = new EventEmitter<any>();
@Output()
  agregarSeleccionado = new EventEmitter<any>();  
  
@ViewChild(MatTable) grilla?: MatTable<any>;  

 
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  seleccionarItem(item:any)
  { 
    this.enviarSeleccionado.emit(item);  

  }
  
  actualizarItem(item:any)
  { 
    this.actualizarSeleccionado.emit(item);  

  }

  eliminarItem(item:any)
  { 
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    //dialogConfig.width='250px',

    
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message: 'Esta seguro que desea eliminar el registro de  ' + item.nombre + ' ' + item.apellido,
    };


    const confirmDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        //this.employeeList = this.employeeList.filter(item => item.employeeId !== employeeObj.employeeId);
        this.eliminarSeleccionado.emit(item.id);  
      }
    });
    

  }

 agregarItem(){
    this.agregarSeleccionado.emit(true);  
  }

 renderRows(){
    this.grilla?.renderRows()
  }
}




