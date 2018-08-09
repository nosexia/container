import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import bc from 'highcharts/modules/histogram-bellcurve.js';
bc(Highcharts);
@Component({
  selector: 'app-statisticals',
  templateUrl: './statisticals.component.html',
  styleUrls: ['./statisticals.component.less']
})
export class StatisticalsComponent implements OnInit {

  // @Input() chartData: any
  // @Input() chartLabels: any;
  // @Input() chartOptions: any;
  @Input() set data (data) {
    this.chartOptions = data;
    this.updateFlag = true;
  };
  Highcharts = Highcharts;
  updateFlag = false;
  chartOptions = {};
  constructor(
  ) {
  }

  ngOnInit(): void {

  }
  
  onChartClick(event) {
    console.log(event);
  }

  
  
}