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
    {id:7,label:"criterio 7",checked:false}];
  }

  onSaveCheck() {
    if(!this.validation()){
      alert('Seleccione 4 criterios');return;
    }
    this.itilService.writeLocal("check", this.allCriterion);
    this.route.navigate(['/itil/matrix']);
  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      option.checked = true;
    } else {
      option.checked = false;
    }
  }

  validation(){
    this.newCriterion=[];
    this.allCriterion.forEach((criterion) => {
      if(criterion.checked) {this.newCriterion.push(criterion);}
    });
    return (this.newCriterion.length == 4) ? true:false;
  }

}
