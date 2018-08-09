import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import HTTP_URL from '../../datas/http-url.data';
import { StorageService } from '../storage-type/storage.service';
let colorsshandian = ['#bc0a11','#f8ab66', '#13b054'];
let colors = ['#78a7d0','#318eba', '#0d5481'];
// 初始图标
let initData1 = [[]];
let initData2 = [[]];
@Injectable({
  providedIn: 'root'
})
export class StatisticalService {
  datas: any;
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
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
          text: 'test1'
        },
        xAxis: [{
          title: { text: 'Data' },
          // gridLineColor: '#ffffff',
          gridLineWidth: 0,

        }, {
          title: { text: 'Bell curve' },
          opposite: true
        }],
        yAxis: [{
          title: { text: 'Data' }
        }, {
          title: { text: 'Bell curve' },
          opposite: true
        }],
        series: [{
          name: 'Bell curve',
          type: 'bellcurve',
          xAxis: 1,
          yAxis: 1,
          data: initData1,
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
          data: initData1,
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
          text: 'test2'
        },
        xAxis: [{
          title: { text: 'Data' },
          // gridLineColor: '#ffffff',
          gridLineWidth: 0,

        }, {
          title: { text: 'Bell curve' },
          opposite: true
        }],
        yAxis: [{
          title: { text: 'Data' }
        }, {
          title: { text: 'Bell curve' },
          opposite: true
        }],
        series: [{
          name: 'Bell curve',
          type: 'bellcurve',
          xAxis: 1,
          yAxis: 1,
          data: initData2,
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
          data: initData2,
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
        // this.httpService.post(HTTP_URL.statistics, {
    //   token: this.storageService.getStorage.token,
    //   opUserId: this.storageService.getStorage.userId,
    //   sensorTag: type,
    //   containerId: pas.containerId
    // }).subscribe(res => {
    //   debugger;
    //   res.data.forEach((item, index) => {
    //     // debugger;
    //   });
    // });
    initData1 = [[26,0.2],[26.8,0.4],[28,0.1],[29,0.2],[25,0.1],[24,0.1]];
    this.datas.chartOptions1 = {
      title: {
        text: 'test1'
      },
      xAxis: [{
        title: { text: 'Data' },
        gridLineWidth: 0,
      }, {
        title: { text: 'Bell curve' },
        opposite: true
      }],
      yAxis: [{
        title: { text: 'Data' }
      }, {
        title: { text: 'Bell curve' },
        opposite: true
      }],
      series: [{
        name: 'Bell curve',
        type: 'bellcurve',
        xAxis: 1,
        yAxis: 1,
        data: initData1,
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
        data: initData1,
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

    initData2 = [[26,0.2],[26.8,0.4],[35,0.1],[38,0.2],[25,0.1],[24,0.1]];
    this.datas.chartOptions2 = {
      title: {
        text: 'test2'
      },
      xAxis: [{
        title: { text: 'Data' },
        gridLineWidth: 0,
      }, {
        title: { text: 'Bell curve' },
        opposite: true
      }],
      yAxis: [{
        title: { text: 'Data' }
      }, {
        title: { text: 'Bell curve' },
        opposite: true
      }],
      series: [{
        name: 'Bell curve',
        type: 'bellcurve',
        xAxis: 1,
        yAxis: 1,
        data: initData2,
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
        data: initData2,
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
