import { Component, OnInit, Input } from '@angular/core';
// import { Chart } from 'angular-highcharts';
// import 'highcharts/js/histogram-bellcurve.js';
// import 'highcharts/js/histogram-bellcurve.src.js';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import bc from 'highcharts/modules/histogram-bellcurve.js';
Highcharts.setOptions({
 global: {
  useUTC: false
 }
});
bc(Highcharts);
@Component({
  selector: 'app-container-sensor',
  templateUrl: './container-sensor.component.html',
  styleUrls: ['./container-sensor.component.less']
})
export class ContainerSensorComponent implements OnInit {
  @Input() set newValue (newValue) {
    this.addPoint(newValue.title, newValue.value, newValue.timer, newValue.deviceName);
  }
  @Input() warn: boolean;
  // private fromPara: any = Date.UTC(2010, 0, 3);
  // private toPara: any = Date.UTC(2010, 0, 5)
  timers: boolean = false;
  Highcharts = Highcharts;
  updateFlag = false;
  chartOptions = {
    chart: {
      type: 'spline',
      marginRight: 10
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled:false
    },
    plotOptions: {
      line: {
        animation: false
      }
    },
    title: {
      text: ''
    },
    tooltip: {
      formatter: function (value) {
        return '<b>' + this.series.name + '</b><br/>' + this.x + '<b><br/>' + this.y + '</b><br/>'        
      }
    },    
    xAxis: {
      categories: []
    },
    yAxis: {
      max: 80,
      min: 0,  
      tickInterval: 20,
      title: {
        text: null
      }
    },
    series: [{
      name: '',
      deviceName: [],
      data: []
    }]
  }
  notPaintedGray: boolean = true;
  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }
  resetData () {
    this.chartOptions = {
      chart: {
        type: 'spline',
        marginRight: 10
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        line: {
          animation: false
        }
      },
      title: {
        text: ''
      },
      tooltip: {
        formatter: function (value) {
          // console.log('index' + this.series.data.indexOf( this.point ))
          // console.log('deviceName' + value.chart.series[0].userOptions.deviceName)
          // let newValue = value.chart.series[0].userOptions.deviceName.filter(item => {
          //   return item !== null
          // })
          // return '<b>' + value.chart.series[0].userOptions.deviceName[this.series.data.indexOf( this.point )] + '</b><br/><b>' + this.series.name + '</b><br/>' + this.x + '<b><br/>' + this.y + '</b><br/>'
          return '<b>' + this.series.name + '</b><br/>' + this.x + '<b><br/>' + this.y + '</b><br/>'
        }
      },    
      xAxis: {
        categories: []
      },
      yAxis: {
        max: 80,
        min: 0,  
        tickInterval: 20,
        title: {
          text: null
        }
      },
      series: [{
        name: '',
        deviceName: [],
        data: []
      }]
    }
    this.updateFlag = true;
  }
  // a () {
  //   this.chartOptions.xAxis.plotBands.push({ // mark the weekend
  //     color: '#ddd',		
  //     from: 6,
  //     to: 8,
  //     label: {
  //       text: 'c1',
  //       align: 'center',
  //     }
  //   })
  //   this.updateFlag = true;
  // }
  addPoint (title: string, value: number, timer: Date, deviceName: string) {
    if (title === 'Acceleration(g)') {
      this.chartOptions.yAxis.max = 10
      this.chartOptions.yAxis.tickInterval = 1
    }
    if (!timer) return
    if (value !== null) {
      if (value === -1) {
        if (this.chartOptions.series[0].data.length >= 10) {
          this.chartOptions.series[0].data.shift();
          this.chartOptions.series[0].deviceName.shift();
          this.chartOptions.xAxis.categories.shift();
        }
        this.chartOptions.series[0].deviceName.push(null);
        this.chartOptions.series[0].name = title;
        this.chartOptions.title.text = title;
        this.chartOptions.series[0].data.push(null);
        this.chartOptions.xAxis.categories.push(this.transformDate(timer));
      } else {
        if (this.chartOptions.series[0].data.length >= 10) {
          this.chartOptions.series[0].data.shift();
          this.chartOptions.xAxis.categories.shift();
          this.chartOptions.series[0].deviceName.shift();
        }
        if (deviceName) {
          this.chartOptions.series[0].deviceName.push(deviceName);
          console.log(deviceName)
        }
        this.chartOptions.series[0].name = title;
        this.chartOptions.title.text = title; 
        this.chartOptions.series[0].data.push(value);
        this.chartOptions.xAxis.categories.push(this.transformDate(timer));
      }
    } else {
      if (this.chartOptions.series[0].data.length >= 10) {
        this.chartOptions.series[0].data.shift();
        this.chartOptions.series[0].deviceName.shift();
        this.chartOptions.xAxis.categories.shift();
      }
      this.chartOptions.series[0].deviceName.push(null);
      this.chartOptions.series[0].name = title;
      this.chartOptions.title.text = title;
      this.chartOptions.series[0].data.push(null);
      this.chartOptions.xAxis.categories.push(this.transformDate(timer));
    }
    this.updateFlag = true;
  }
  // addK (value: any, deviceName: any, title: string) {

  //   // if (value !== null) {
  //   //   this.a = 0
  //   //   if (this.chartOptions.series[0].data.length >= 10) {
  //   //     this.chartOptions.series[0].data.shift();
  //   //     this.chartOptions.xAxis.categories.shift();
  //   //   }
  //   //   if (deviceName) {
  //   //     this.chartOptions.series[0].deviceName.push(deviceName);
  //   //   }
  //   //   this.chartOptions.series[0].name = title;
  //   //   this.chartOptions.title.text = title; 
  //   //   this.chartOptions.series[0].data.push(value);
  //   //   this.chartOptions.xAxis.categories.push(this.transformDate(new Date()));
  //   // } else {
  //   //   if (this.a === 0) {
  //   //     var b = this.transformDate(new Date())
  //   //     this.chartOptions.xAxis.plotBands.push({
  //   //       color: '#ddd',  
  //   //       from: b,
  //   //       to: b,
  //   //       label: {
  //   //         text: 'disconnect',
  //   //         align: 'center'
  //   //       }
  //   //     })
  //   //     this.a = 1
  //   //   } else if (this.a === 1) {
  //   //     this.chartOptions.xAxis.plotBands[this.chartOptions.xAxis.plotBands.length - 1].to = b      }
  //   //   if (this.chartOptions.series[0].data.length >= 10) {
  //   //     this.chartOptions.series[0].data.shift();
  //   //     this.chartOptions.xAxis.categories.shift();
  //   //   }
  //   //   if (deviceName) {
  //   //     this.chartOptions.series[0].deviceName.push(deviceName);
  //   //   }
  //   //   this.chartOptions.series[0].name = title;
  //   //   this.chartOptions.title.text = title;
  //   //   this.chartOptions.series[0].data.push(null);
  //   //   this.chartOptions.xAxis.categories.push(b);
      
  //   // }
  //   this.updateFlag = true;
  // }
  transformDate (date: Date) {
    return this.datePipe.transform(date, 'h:mm:ss');
  }
}
