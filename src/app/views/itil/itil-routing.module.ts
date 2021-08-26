import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItilComponent } from './itil.component';
import { MatrixComponent } from './matrix/matrix.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ITIL'
    },
    children: [
      {
        path: 'list',
        component: ItilComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'matrix',
        component: MatrixComponent,
        data: {
          title: 'Matrix'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItilRoutingModule {}
