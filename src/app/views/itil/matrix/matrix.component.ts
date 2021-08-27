import { Component, OnInit } from '@angular/core';
import { Criterion } from '../../../models/criterion';
import { ItilService } from '../../../services/itil.service';

@Component({
  templateUrl: './matrix.component.html'
})
export class MatrixComponent implements OnInit {

  allCriterion: Criterion[] = [];
  filterCriterion: Criterion[] = [];
  sortCriterion = [];

  constructor(private itilService: ItilService) {
    this.allCriterion = itilService.readLocal('check');
    this.allCriterion.forEach(itil => {
      if (itil.checked == true) this.filterCriterion.push(itil)
    });
  }

  ngOnInit(): void {

  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.sortCriterion.push(option.label);
    } else {
      var i = this.sortCriterion.indexOf(option.label);
      if (-1 !== i) {
        this.sortCriterion.splice(i, 1);
      }
    }
  }

  validation(){
    if(this.filterCriterion.length!=this.sortCriterion.length)alert('Complete la prioridad');

  }

}
