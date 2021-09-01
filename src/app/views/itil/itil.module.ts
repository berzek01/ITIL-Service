import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItilComponent } from './itil.component';
import { FormsModule } from '@angular/forms';
import { ItilRoutingModule } from './itil-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatrixComponent } from './matrix/matrix.component';
import { StadisticComponent } from './stadistic/stadistic.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ItilComponent, MatrixComponent, StadisticComponent],
  imports: [
    CommonModule,
    FormsModule,
    ItilRoutingModule,
    ModalModule,
    ChartsModule,
    BsDropdownModule.forRoot()
  ]
})
export class ItilModule { }
