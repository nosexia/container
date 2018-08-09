import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import HTTP_URL from '../../datas/http-url.data';
import { StorageService } from '../storage-type/storage.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
let colorsshandian = ['#f5222d','#FD883E', '#13b054'];
let colors = ['#78a7d0','#318eba', '#0d5481'];
// 初始数据
let x1 = [];
let y1 = [];

let x2 = [];
let y2 = [[]];

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {
  datas: any;
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { 
    this.resetData()
  }

  resetData (): void {
    this.datas = {
      // average
      avgVal: {
        chartLabels: [],
        chartData: [
          { data: [], label: 'average', fill: false }
        ],
        chartOptions: {
          responsive: true,
          title: {
            display: true,
            text: 'average',
            position: 'bottom'
          }
        }
      },
      // median
      middleVal: {
        chartLabels: [],
        chartData: [
          { data: [], label: 'median', fill: false }
        ],
        chartOptions: {
          responsive: true,
          title: {
            display: true,
            text: 'median',
            position: 'bottom'
          }
        }
      },
      // variance
      varianceVal: {
        chartLabels: [],
        chartData: [
          { data: [], label: 'variance', fill: false }
        ],
        chartOptions: {
          responsive: true,
          title: {
            display: true,
            text: 'variance',
            position: 'bottom'
          }
        }
      },
      // unique
      uniqueVal: {
        chartLabels: [],
        chartData: [
          { data: [], label: 'unique', fill: false }
        ],
        chartOptions: {
          responsive: true,
          title: {
            display: true,
            text: 'unique',
            position: 'bottom'
          }
        }
      },

      chartOptions1: {
        title: {
          text: 'Average'
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        xAxis: [{
          title: { text: '' },
          gridLineWidth: 0,
          labels: {
            rotation: 90
          }
        }, {
          title: { text: '' },
          opposite: true
        }],
        yAxis: [{
          title: { text: 'Fx' }
        }],
        series: [{
          name: 'Bell curve',
          type: 'bellcurve',
          xAxis: 1,
          yAxis: 0,
          data: x1,
          baseSeries: 1,
          zoneAxis: 'x',
          zones: [{
            value: 0,
            color: colors[0],
          }, {
            value: 0.1,
            color: colors[1],
          }, {
            value: 0.3,
            color: colors[2],
          }, {
            value: 0.4,
            color: colors[0],
          }, {
            color: colors[2],
          }],
          followPointer: true
        }, {
          name: 'Data',
          type: 'scatter',
          data: y1,
          marker: {
            radius: 4,
            symbol: 'circle'
          },
          zones: [{
            value: 0.1,
            color: colorsshandian[0],
          }, {
            value: 0.2,
            color: colorsshandian[1],
          }, {
            value: 0.3,
            color: colorsshandian[2],
          }, {
            value: 0.4,
            color: colorsshandian[2],
          }]
        }]
      },


      chartOptions2: {
        title: {
          text: 'Median'
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        xAxis: [{
          title: { text: '' },
          // gridLineColor: '#ffffff',
          gridLineWidth: 0,

        }, {
          title: { text: '' },
          opposite: true
        }],
        yAxis: [{
          title: { text: 'Fx' }
        }],
        series: [{
          name: 'Bell curve',
          type: 'bellcurve',
          xAxis: 1,
          yAxis: 0,
          data: x2,
          baseSeries: 1,
          zoneAxis: 'x',
          zones: [{
            value: 0,
            color: colors[0],
          }, {
            value: 0.1,
            color: colors[1],
          }, {
            value: 0.3,
            color: colors[2],
          }, {
            value: 0.4,
            color: colors[0],
          }, {
            color: colors[2],
          }],
          followPointer: true
        }, {
          name: 'Data',
          type: 'scatter',
          data: y2,
          marker: {
            radius: 4,
            symbol: 'circle'
          },
          zones: [{
            value: 0.1,
            color: colorsshandian[0],
          }, {
            value: 0.2,
            color: colorsshandian[1],
          }, {
            value: 0.3,
            color: colorsshandian[2],
          }, {
            value: 0.4,
            color: colorsshandian[2],
          }]
        }]
      }
    }
  }

  commonList (pas: any, type: number) {
    let params = {
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      enterpriseId: pas.enterpriseId, 
      journeyId: pas.journeyId, 
      containerId: pas.containerId
    }
    this.resetData()
    setTimeout(() => {
      if (type === 0) {
        if (params.containerId !== -1 && params.journeyId !== -1) {
          this.getThonevone({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            journeyId: pas.journeyId, 
            containerId: pas.containerId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal) 
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        } else if (params.journeyId !== -1 && params.containerId === -1) {
          this.getTonevmany({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            enterpriseId: pas.enterpriseId, 
            journeyId: pas.journeyId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal)
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        } else if (params.journeyId === -1 && params.containerId === -1) {
          this.getTmanyvmany({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            enterpriseId: pas.enterpriseId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal)
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        }
      } else if (type === 1) {
        if (params.containerId !== -1 && params.journeyId !== -1) {
          this.getHonevone({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            journeyId: pas.journeyId, 
            containerId: pas.containerId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal)
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        } else if (params.journeyId !== -1 && params.containerId === -1) {
          this.getHonevmany({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            enterpriseId: pas.enterpriseId, 
            journeyId: pas.journeyId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal)
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        } else if (params.journeyId === -1 && params.containerId === -1) {
          this.getHmanyvmany({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            enterpriseId: pas.enterpriseId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal)
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        }
      } else if (type === 2) {
        if (params.containerId !== -1 && params.journeyId !== -1) {
          this.getAhonevone({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            journeyId: pas.journeyId, 
            containerId: pas.containerId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal)
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        } else if (params.journeyId !== -1 && params.containerId === -1) {
          this.getAonevmany({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            enterpriseId: pas.enterpriseId, 
            journeyId: pas.journeyId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal)
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        } else if (params.journeyId === -1 && params.containerId === -1) {
          this.getAmanyvmany({
            token: this.storageService.getStorage.token,
            opUserId: this.storageService.getStorage.userId,
            enterpriseId: pas.enterpriseId
          }).subscribe(res => {
            res.data.forEach((item, index) => {
              this.datas.avgVal.chartLabels.push(index)
              this.datas.avgVal.chartData[0].data.push(item.avgVal)
              this.datas.middleVal.chartLabels.push(index)
              this.datas.middleVal.chartData[0].data.push(item.middleVal)
              this.datas.varianceVal.chartLabels.push(index)
              this.datas.varianceVal.chartData[0].data.push(item.varianceVal)
              this.datas.uniqueVal.chartLabels.push(index)
              this.datas.uniqueVal.chartData[0].data.push(item.uniqueVal)
            })
          })
        }
      }
    }, 1000)
    
  }
  /**
   * 数据统计
   * @param pas  集装箱ID
   * @param type 温度65 湿度66 加速度67
   */
  showStatisticsData(pas: any, type: number) {
    this.httpService.post(HTTP_URL.statistics, {
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      sensorTag: type,
      containerId: pas.containerId
    }).subscribe(res => {
      res.forEach((item, index) => {
        if (0 === index) {
          x1 = item.x;
          y1 = [10, 20, 30, 40, 50];
          // y1 = [];
          // item.data.forEach(item => {
          //   y1.push([item.tag, item.fx]);
          // });
        } else {
          x2 = item.x;
          y2 = [];
          item.data.forEach(item => {
            y2.push([item.tag, item.fx]);
          });           
        }
      this.datas.chartOptions1 = {
          title: {
            text: 'Average'
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          xAxis: [{
            title: { text: '' },
            gridLineWidth: 0,
            tickAmount: x1.length,
            labels: {
              rotation: 90
            }
          }, {
            title: { text: '' },
            opposite: true,
            visible: false
          }],
          yAxis: [{
            title: { text: 'Fx' },
            ceiling: 1
          }],
          series: [{
            name: 'Bell curve',
            type: 'line',
            xAxis: 1,
            yAxis: 0,
            data: x1,
            baseSeries: 1,
            zoneAxis: 'x',
            followPointer: true
          }, {
            name: 'Data',
            type: 'scatter',
            data: y1,
            marker: {
              radius: 4,
              symbol: 'circle'
            }
          }]
        }


        this.datas.chartOptions2 = {
          title: {
            text: 'Median'
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          xAxis: [{
            title: { text: '' },
            gridLineWidth: 0,
            tickAmount: x1.length,
            labels: {
              rotation: 45,
              step: 2
            }
          }, {
            title: { text: '' },
            opposite: true,
            visible: false
          }],
          yAxis: [{
            title: { text: 'Fx' },
            ceiling: 1
          }],
          series: [{
            name: 'Bell curve',
            type: 'bellcurve',
            xAxis: 1,
            yAxis: 0,
            data: x2,
            baseSeries: 1,
            zoneAxis: 'x',
            zones: [{
              value: 0,
              color: colors[0],
            }, {
              value: 0.1,
              color: colors[1],
            }, {
              value: 0.3,
              color: colors[2],
            }, {
              value: 0.4,
              color: colors[0],
            }, {
              color: colors[2],
            }],
            followPointer: true
          }, {
            name: 'Data',
            type: 'scatter',
            data: y2,
            marker: {
              radius: 4,
              symbol: 'circle'
            },
            zones: [{
              value: 0.1,
              color: colorsshandian[0],
            }, {
              value: 0.2,
              color: colorsshandian[1],
            }, {
              value: 0.4,
              color: colorsshandian[2],
            }, {
              value: 0.6,
              color: colorsshandian[2],
            }, {
              value: 0.8,
              color: colorsshandian[1],
            }]
          }]
        }

      });
    }); 
  }
  getThonevone (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.thonevone, body)
  }
  getTmanyvmany(body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.tmanyvmany, body)
  }
  getTonevmany (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.tonevmany, body)
  }
  getAhonevone(body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.ahonevone, body)
  }
  getAmanyvmany (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.amanyvmany, body)
  }
  getAonevmany (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.aonevmany, body)
  }
  getHmanyvmany (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.hmanyvmany, body)
  }
  getHonevmany (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.honevmany, body)
  }
  getHonevone (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.honevone, body)
  }
}
