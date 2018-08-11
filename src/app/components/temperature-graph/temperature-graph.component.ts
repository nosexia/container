import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng4-charts/ng4-charts'
@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  styleUrls: ['./temperature-graph.component.less']
})
export class TemperatureGraphComponent implements OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  deviceName: any[] = []
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label : (tooltipItem, data) => {
          // let label = data.datasets[tooltipItem.datasetIndex].label;
          let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return [this.deviceName[tooltipItem.index], value];
        }
      }
    },
    scales: {
      yAxes: [
          {
              ticks: {
                  reverse : false,
                  min: 0,
                  max: 100
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
    this.upDateCharts(newValue.title, newValue.value, newValue.timer, newValue.deviceName);
  }
  @Input() warn: boolean;
  constructor(
    private datePipe: DatePipe
  ) {
  }
  
  ngOnDestroy() {
    this.barChartData[0].data = [];
    this.deviceName = [];
    if (this.chart.chart) {
      this.chart.chart.update();
    }
  }
  upDateCharts (title: string, value: number, timer: any, deviceName: string) :void {
    if (timer === 0) return
    if (title === 'Acceleration(g)') {
      this.barChartOptions.scales.yAxes[0].ticks.max = 20
    } else if (title === 'Temperature(℃)') {
      this.barChartOptions.scales.yAxes[0].ticks.max = 128
    }
    if (this.barChartData[0].data.length > 7) {
      this.barChartData[0].data.shift();
      this.barChartLabels.shift();
      this.deviceName.shift();
      this.barChartLabels.shift();
    }
    this.barChartData[0].data.push(value);
    this.deviceName.push(deviceName)
    this.barChartData[0].label = title;
    this.barChartLabels.push(this.transformDate(timer));
    if (this.chart.chart) {
      this.chart.chart.update();
    }
  }
  transformDate (date: Date) {
    return this.datePipe.transform(date, 'hh:mm:ss');
  }
}
