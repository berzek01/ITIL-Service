import { Component, OnInit } from '@angular/core';
import { ItilService } from '../../../services/itil.service';

@Component({
  templateUrl: './stadistic.component.html'
})
export class StadisticComponent implements OnInit {

  cxs = [];
  orderSort = [];
  ponderado=[];
  ponderadoStr=[];
  stringCxS=[];

  constructor(private itilService:ItilService) {
    this.ponderado=itilService.readLocal('ponderado');
    this.orderSort=itilService.readLocal('orderSort');
    this.cxs=itilService.readLocal('cxs');
    this.saveAll();
  }

  ngOnInit(): void {
  }

  saveAll(){
    console.log(this.ponderado);
    console.log(this.orderSort);
    console.log(this.cxs);
    this.cxs.forEach(e=>{
      this.stringCxS.push('S'+e);
    });
    console.log(this.stringCxS);
    this.ponderado.forEach(e=>{
      this.ponderadoStr.push(parseInt(e,10));
    });
  }
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = this.stringCxS;
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: this.ponderadoStr, label: 'Series A'}
  ];

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

}
