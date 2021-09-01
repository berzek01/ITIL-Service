import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItilComponent } from './itil.component';
import { MatrixComponent } from './matrix/matrix.component';
import { StadisticComponent } from './stadistic/stadistic.component';

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
      },
      {
        path: 'stadistic',
        component: StadisticComponent,
        data: {
          title: 'Stadistic'
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
