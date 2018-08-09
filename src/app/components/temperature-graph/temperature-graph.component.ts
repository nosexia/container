import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng4-charts/ng4-charts'
@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.less']
})
export class TemperatureGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
          {
              ticks: {
                  reverse : false,
                  min: 0,
                  max: 90
              }
          }
        ]
      }
  };
  myColors = [
  {
      backgroundColor: 'rgba(81, 192, 191, .1)',
      borderColor: 'rgb(81, 192, 191)',
      pointBackgroundColor: 'rgb(81, 192, 191)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(81, 192, 191, .8)'
    }
  ]
  public barChartLabels:string[] = [];
  public barChartType:string = 'line';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    { data: [], label: '', fill: false }
  ];
  @Input() set newValue (newValue) {
    this.upDateCharts(newValue.title, newValue.value);
  }
  @Input() warn: boolean;
  constructor(
    private datePipe: DatePipe
  ) {
  }
  ngOnInit() {
  }
  upDateCharts (title: string, value: number) :void {
    if (this.barChartData[0].data.length > 6) {
      this.barChartData[0].data.shift();
      this.barChartLabels.shift();
    }
    this.barChartData[0].data.push(value);
    this.barChartData[0].label = title;
    this.barChartLabels.push(this.transformDate(new Date()));
    if (this.chart.chart) {
      this.chart.chart.update();
    }
  }
  transformDate (date: Date) {
    return this.datePipe.transform(date, 'hh:mm:ss');
  }
}
