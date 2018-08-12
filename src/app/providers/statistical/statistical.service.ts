import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import HTTP_URL from '../../datas/http-url.data';
import { StorageService } from '../storage-type/storage.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ContainerSocketService } from '../container-socket/container-socket.service';
import { ContainerAllSocketService } from '../container-all-socket/container-all-socket.service';
import { EnterpriseAllSocketService } from '../enterprise-all-socket/enterprise-all-socket.service';
import { DatePipe } from '@angular/common';
// import { Z_DATA_ERROR } from 'zlib';


let colorsshandian = ['#f5222d','#FD883E', '#13b054'];
let colors = ['#78a7d0','#318eba', '#0d5481'];
// 中值
let x1 = [];
let y1 = [];

// 中位数
let x2 = [];
let y2 = [];

// 中值的中值
let x3 = [];
let y3 = [];

let sensorTag = 0;

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {
  datas: any;
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private datePipe: DatePipe,
    private containerSocketService: ContainerSocketService,
    private containerAllSocketService: ContainerAllSocketService,
    private enterpriseAllSocketService: EnterpriseAllSocketService
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
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150          
        },
        yAxis: {
          title: {
            text: null
          }
        },
        series: [{
          name: 'Average',
          type: 'line',
          data: y1
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
        }, {
          title: { text: '' },
          opposite: true
        }],
        yAxis: [{
          title: { text: '' },
        }, {
          title: { text: 'Fx' },
          opposite: true
        }],
        series: [{
          name: 'Bell curve',
          type: 'bellcurve',
          xAxis: 1,
          yAxis: 1,
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
      }, 

      chartOptions3: {
        title: {
          text: 'Median of median'
        },
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
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150          
        },
        yAxis: {
          title: {
            text: null
          }
        },
        series: [{
          name: 'Average',
          type: 'line',
          data: y3
          }]
      },
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
    // 设置全局type
    sensorTag = type;
    // 重至所有数据
    x1 = [];
    y1 = [];
    y2 = [];
    y3 = [];
    // 获取单个集装箱数据
    if (null !== pas.enterpriseId && null !== pas.containerId) {
      this.queryStatus(pas.containerId);
    } else if(null !== pas.enterpriseId) {
        // 获取企业下的所有集装箱数据
      this.queryEnterpriseStatus(pas.enterpriseId);
    } else {
      // 获取所有企业数据
      this.queryEnterpriseAllStatus();
    }
  }


  closeWSS() {
    this.containerSocketService.closeWS();
    this.containerAllSocketService.closeWS();
    this.enterpriseAllSocketService.closeWS();
  }
  socketConnect(id: string, channel: number) {
    this.closeWSS();
    this.containerSocketService.createObservableSocket(id, channel)
    .subscribe(data => {
      data = JSON.parse(data);

      // 折线图一次性只可以展示10调数据
      if (x1.length >= 10) {
        x1.shift();       
      }
      x1.push(this.transformDate(data.avg.unixtime * 1000));
      if (y1.length >= 10) {
        y1.shift();
      }

      if (65 === sensorTag) {        
        y1.push(data.avg.tempAvg);
        y2.push(data.mid.tempMidPoint[0]);
      } else if(66 === sensorTag) {
        y1.push(data.avg.humMidPoint);
        y2.push(data.mid.humMidPoint[0]);
      } else if(67 === sensorTag) {
        y1.push(data.avg.acceAvg);
        y2.push(data.mid.acceMidPoint[0]);
      }
      this.RenderTableData();
    }),
    error => console.log(error),
    () => console.log('结束')
  }
  transformDate (date: number) {
    return this.datePipe.transform(date, 'h:mm:ss');
  }
  /**
   * 带有企业id和集装箱id
   * @param id containerId
   */
  queryStatus(id: string) {
    this.getReqMyData({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      deviceType: 0,
      containerId: id
    }).subscribe(res => {
      if (res.respCode !== '00000') {
        console.log('获取状态失败')
        return false
      }
      this.socketConnect(id, res.user.channel);
    });
  }

  queryEnterpriseStatus(id: string) {
    this.getReqMyData({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      deviceType: 0,
      enterpriseId: id
    }).subscribe(res => {
      if (res.respCode !== '00000') {
        console.log('获取状态失败');
        return false
      }
      this.socketConnectAll(id, res.user.channel);
    });
  }

  socketConnectAll(id: string, channel: number) {
    this.closeWSS();
    this.containerAllSocketService.createObservableSocket(id, channel)
    .subscribe(data => {
      data = JSON.parse(data);
      console.log(data);

      // 折线图一次性只可以展示10调数据
      if (x1.length >= 10) {
        x1.shift();       
      }
      x1.push(this.transformDate(data.avg.unixtime * 1000));
      if (y1.length >= 10) {
        y1.shift();
      }

      if (y3.length >= 10 ) {
        y3.shift();
      }
      if (65 === sensorTag) { 
        y1.push(data.avg.tempAvg);
        y2.push(data.mid.tempMidPoint[0]);
        y3.push(data.midmid.tempMidMid)
      } else if (66 === sensorTag) {
        y1.push(data.avg.humMidPoint);
        y2.push(data.mid.humMidPoint[0]);
        y3.push(data.midmid.humMidMid);
      } else if(67 === sensorTag) {
        y1.push(data.avg.acceAvg);
        y2.push(data.mid.acceMidPoint[0]);
        y3.push(data.midmid.acceMidMid);
      }

      this.RenderTableData();
    }),
    error => console.log(error),
    () => console.log('结束')
  }

  queryEnterpriseAllStatus() {
    this.getReqMyData({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      deviceType: 0,
      enterpriseId: -1
    }).subscribe(res => {
      if (res.respCode !== '00000') {
        console.log('获取状态失败');
        return false
      }
      this.socketConnectEnterpriseAll();
    });
  }

  socketConnectEnterpriseAll() {
    this.closeWSS();
    this.enterpriseAllSocketService.createObservableSocket()
    .subscribe(data => {
      data = JSON.parse(data);
      console.log(data);
      // 折线图一次性只可以展示10调数据
      if (x1.length >= 10) {
        x1.shift();       
      }
      x1.push(this.transformDate(data.avg.unixtime * 1000));
      if (y1.length >= 10) {
        y1.shift();
      }

      if (y3.length >= 10 ) {
        y3.shift();
      }
      if (65 === sensorTag) { 
        y1.push(data.avg.tempAvg);
        y2.push(data.mid.tempMidPoint[0]);
        y3.push(data.midmid.tempMidMid)
      } else if (66 === sensorTag) {
        y1.push(data.avg.humMidPoint);
        y2.push(data.mid.humMidPoint[0]);
        y3.push(data.midmid.humMidMid);
      } else if(67 === sensorTag) {
        y1.push(data.avg.acceAvg);
        y2.push(data.mid.acceMidPoint[0]);
        y3.push(data.midmid.acceMidMid);
      }

      this.RenderTableData();

    }),
    error => console.log(error),
    () => console.log('结束')    
  }

  // 充值图标
  resetTableData() {
    x1 = [];
    y1 = [];
    y2 = [];
    y3 = [];
    this.RenderTableData();
  }

  // 渲染图标数据
  RenderTableData() {
    this.datas.chartOptions1 = {
      title: {
        text: 'Average'
      },

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
      xAxis: {
        categories: x1
      },
      yAxis: {
        title: {
          text: null
        }
      },
      tooltip: {
        formatter:  function(value) {           
          return '<b>' + this.series.name + '</b><br/>' + this.x + '<br/>' + this.y;
        }
      },
      series: [{
        name: 'Average',
        type: 'line',
        data: y1
      }],
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
      }, {
        title: { text: '' },
        opposite: true
      }],
      yAxis: [{
        title: { text: '' },
      }, {
        title: { text: '' },
        opposite: true
      }],
      series: [{
        name: 'Bell curve',
        type: 'bellcurve',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 1,
        zoneAxis: 'x'
      }, {
        name: 'Data',
        type: 'scatter',
        data: y2,
        marker: {
          radius: 1,
          symbol: 'circle'
        }
      }]
    }

    this.datas.chartOptions3 = {
      title: {
        text: 'Median of median'
      },

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
      xAxis: {
        categories: x1
      },
      yAxis: {
        title: {
          text: null
        }
      },
      tooltip: {
        formatter:  function(value) {           
          return '<b>' + this.series.name + '</b><br/>' + this.x + '<br/>' + this.y;
        }
      },
      series: [{
        name: 'Median of median',
        type: 'line',
        data: y3
      }],
    }
  }

  
  getReqMyData (body: any) {
    return this.httpService.post(HTTP_URL.reqMyData, body)
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
