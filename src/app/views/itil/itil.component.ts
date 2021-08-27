import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Criterion } from '../../models/criterion';
import { ItilService } from '../../services/itil.service';

@Component({
  templateUrl: './itil.component.html'
})
export class ItilComponent {

  allCriterion : Criterion[]=[];
  newCriterion = [];
  constructor(private route:Router,private itilService:ItilService) { 
    this.allCriterion=[{id:1,label:"criterio 1",checked:false},{id:2,label:"criterio 2",checked:false},
    {id:3,label:"criterio 3",checked:false},{id:4,label:"criterio 4",checked:false},
    {id:5,label:"criterio 5",checked:false},{id:6,label:"criterio 6",checked:false},
    {id:7,label:"criterio 7",checked:false},{id:8,label:"criterio 8",checked:false},
    {id:9,label:"criterio 9",checked:false},{id:10,label:"criterio 10",checked:false}];
  }

  onSaveCheck() {
    this.onSaveEdit();
    this.route.navigate(['/itil/matrix']);
  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      option.checked = true;
    } else {
      option.checked = false;
    }
  }

  onSaveEdit() {
    this.itilService.writeLocal("check", this.allCriterion);
  }

}
