import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { LayoutModule } from '@angular/cdk/layout';
// import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
// import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatRadioModule,
    MatChipsModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
