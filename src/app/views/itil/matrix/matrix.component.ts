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
  orderSortCriterion = [];
  saveSortCriterion = [];
  weightedVector = [];
  RelationCXS = [];
  AllVectors = [];

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
      this.orderSortCriterion.push(option);
    } else {
      var i = this.orderSortCriterion.indexOf(option);
      if (-1 !== i) {
        this.orderSortCriterion.splice(i, 1);
      }
    }
  }

  validation() {
    if (this.filterCriterion.length != this.orderSortCriterion.length) {
      alert('Complete la prioridad');
      return;
    }
    if (this.orderSortCriterion.length == 4) {
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
        this.orderCriterion();
        this.RelationCXS=[];
        this.orderSortCriterion.forEach(c =>{
          this.RelationCXS.push((resp as any).CXS[(c.id-1)][0]);
          this.RelationCXS.push((resp as any).CXS[(c.id-1)][1]);
        });
        this.RelationCXS = this.RelationCXS.sort(function (a, b) {  return a - b;  });
        this.algorithm2();
      }, err => console.log(err));
  }

  algorithm2(){
    this.AllVectors=[];
    this.itilService.getMatrixGeneral().subscribe(
      resp=>{
          this.orderSortCriterion.forEach((e)=>{
            if (e.id==1) this.collect((resp as any).S1,e.id);
            else if (e.id==2) this.collect((resp as any).S2,e.id);
            else if (e.id==3) this.collect((resp as any).S3,e.id);
            else if (e.id==4) this.collect((resp as any).S4,e.id);
            else if (e.id==5) this.collect((resp as any).S5,e.id);
            else if (e.id==6) this.collect((resp as any).S6,e.id);
            else if (e.id==7) this.collect((resp as any).S7,e.id);
            else if (e.id==8) this.collect((resp as any).S8,e.id);
            else if (e.id==9) this.collect((resp as any).S9,e.id);
          });
        }, err => console.log(err));
    setTimeout(()=>{
      this.criterionXService();
    },3000);
  }

  collect(service,id){
    var matrixF=[];
    var matrixC=[];//matriz 8x8
    for(var i=0; i<service.length;i++){
      for(var j=0; j<service.length;j++){
        for(var k=0; k<this.RelationCXS.length;k++){
          if (this.RelationCXS[k]-1==j) matrixF.push(service[i][j])
        }  
      }
      for(var k2=0; k2<this.RelationCXS.length;k2++){
        if (this.RelationCXS[k2]-1==i) matrixC.push(matrixF)
      } 
      matrixF=[];
    }
    //suma columnas
    var sumMatrix=[];//total columnas
    var tempSum=0;
    for(var i=0;i<matrixC.length;i++){
      for(var j=0;j<matrixC.length;j++){
        tempSum+=matrixC[j][i];
      }
      sumMatrix.push(tempSum);
      tempSum=0;
    }
    //Matriz normalizada
    var normalizedMatrix=[];//matriz normalizada
    var normalizedFil=[];
    for(var i=0;i<matrixC.length;i++){
      for(var j=0;j<matrixC.length;j++){
        normalizedFil.push(matrixC[i][j]/sumMatrix[j]);
      }
      normalizedMatrix.push(normalizedFil);
      normalizedFil=[];
    }
    //Vector 
    var vectorMatrix=[];//vector resultante
    var tempVect=0;
    for(var i=0;i<matrixC.length;i++){
      for(var j=0;j<matrixC.length;j++){
        tempVect+=normalizedMatrix[i][j];
      }
      vectorMatrix.push(tempVect/matrixC.length);
      tempVect=0;
    }
    this.AllVectors.push({vector:vectorMatrix,id:id});
    // this.AllVectorsId.push(id);
  }

  criterionXService(){
    var Matrix=[[],[],[],[]];
    var ClearMatrix=[];
    var suma=0;
    var ponderado=[];
    console.log(this.AllVectors);
    console.log(this.saveSortCriterion);
    console.log(this.weightedVector);
    this.AllVectors.forEach((e)=>{
      for(var i=0;i<this.weightedVector.length;i++){
        if(e.id==this.saveSortCriterion[i].id){
          // Matrix[i].splice(i,i,e.vector);
          Matrix[i].push(e.vector);
        }
      }
    });
    Matrix.forEach((e)=> {
      ClearMatrix.push(e[0]);
    })
    console.log(ClearMatrix);
    for(var i=0;i<this.AllVectors[0].vector.length;i++){
      for(var j=0;j<this.weightedVector.length;j++){
        suma+=this.weightedVector[j]*ClearMatrix[j][i];
      }
      ponderado.push(suma.toFixed(2));
      suma=0;
    }
    console.log(ponderado);
    // this.route.navigate(['/itil/stadistic']);
  }

  //util
  orderCriterion(){
    this.saveSortCriterion={...this.orderSortCriterion};
    this.orderSortCriterion.sort(function (a, b) {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
  }
  // orderVectors(){ 
  //   var save=[[],[],[],[]];
  //   this.AllVectors.forEach((e)=>{
  //     for(var i=0;i<this.weightedVector.length;i++){
  //       if(e.id==this.saveSortCriterion[i].id){
  //         save[i].splice(i,i,e.vector);
  //       }
  //     }
  //   });
  //   console.log(save);
  // }

}
