import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItilComponent } from './itil.component';
import { FormsModule } from '@angular/forms';
import { ItilRoutingModule } from './itil-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatrixComponent } from './matrix/matrix.component';

@NgModule({
  declarations: [ItilComponent, MatrixComponent],
  imports: [
    CommonModule,
    FormsModule,
    ItilRoutingModule,
    ModalModule,
    BsDropdownModule.forRoot()
  ]
})
export class ItilModule { }
