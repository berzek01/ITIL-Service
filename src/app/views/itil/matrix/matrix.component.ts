import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Criterion } from '../../../models/criterion';
import { ItilService } from '../../../services/itil.service';

@Component({
  templateUrl: './matrix.component.html'
})
export class MatrixComponent implements OnInit {

  allCriterion: Criterion[] = [];
  filterCriterion: Criterion[] = [];
  disorderSortCriterion = [];
  orderSortCriterion = [];
  weightedVector = [];
  RelationCXS = [];

  constructor(private route:Router,private itilService: ItilService) {
    this.allCriterion = itilService.readLocal('check');
    this.allCriterion.forEach(itil => {
      if (itil.checked == true) this.filterCriterion.push(itil)
    });
  }

  ngOnInit(): void {

  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.disorderSortCriterion.push(option);
    } else {
      var i = this.disorderSortCriterion.indexOf(option);
      if (-1 !== i) {
        this.disorderSortCriterion.splice(i, 1);
      }
    }
  }

  validation() {
    if (this.filterCriterion.length != this.disorderSortCriterion.length) {
      alert('Complete la prioridad');
      return;
    }
    if (this.disorderSortCriterion.length == 4) {
      this.itilService.getMatrix4x4().subscribe(
        resp => {
          this.weightedVector=(resp as any).weightedVector;
          alert('validación '+((resp as any).CR));
          this.algorithm();
        }, err => console.log(err));
    }
  }

  algorithm(){
    this.itilService.getMatrixGeneral().subscribe(
      resp => {
        this.weightedVector=(resp as any).CXS;
        this.orderCriterion();
        this.orderSortCriterion.forEach(c =>{
          
        });
        //this.route.navigate(['/itil/stadistic']);
      }, err => console.log(err));
  }

  orderCriterion(){
    this.orderSortCriterion = this.disorderSortCriterion;
    this.orderSortCriterion.sort(function (a, b) {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
  }

}
