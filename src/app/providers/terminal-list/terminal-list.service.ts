import { Injectable, ViewChild } from '@angular/core';
import { HttpService } from '../http/http.service';
import { TerminalList } from '../../model/terminal-list/terminal-list';
import { TerminalListBody  } from '../../model/terminal-list-body/terminal-list-body';
import { Observable } from 'rxjs';
import { StorageService } from '../storage-type/storage.service';
import { DeviceSocketService } from '../device-socket/device-socket.service';
import { ContainerAndDeviceStatusService } from '../container-and-device-status/container-and-device-status.service';
import { TemperatureService } from '../temperature/temperature.service';
import { HumidityService } from '../humidity/humidity.service';
import { AccelerationService } from '../acceleration/acceleration.service';
import { DeviceBatteryService } from '../device-battery/device-battery.service';
import { CpuStatusService } from '../cpu-status/cpu-status.service';
import { MemoryStatusService } from '../memory-status/memory-status.service';
import { SignalService } from '../signal/signal.service';
import { FromToMarkerService } from '../from-to-marker/from-to-marker.service';
import { VehicleInformationService } from '../vehicle-information/vehicle-information.service';
import HTTP_URL from '../../datas/http-url.data';
import { AllMapService } from '../../providers/all-map/all-map.service';
import { StateBridgService} from '../../providers/state-bridge/state-bridg.service';
@Injectable({
  providedIn: 'root'
})
export class TerminalListService {

  containerList: any[];
  deviceList: any[];
  isClick: boolean = false;
  showRight: boolean = true;
  terminalListData: TerminalList;
  // clickId: string = '0';
  deviceIds: string = '0'
  firstJouney: boolean = true;
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private deviceSocketService: DeviceSocketService,
    private containerAndDeviceStatusService: ContainerAndDeviceStatusService,
    private temperatureService: TemperatureService,
    private accelerationService: AccelerationService,
    private humidityService: HumidityService,
    private deviceBatteryService: DeviceBatteryService,
    private cpuStatusService: CpuStatusService,
    private memoryStatusService: MemoryStatusService,
    private signalService: SignalService,
    private fromToMarkerService: FromToMarkerService,
    private vehicleInformationService: VehicleInformationService,
    private allMapService: AllMapService,
    private stateBridgService: StateBridgService
  ) {
    // 打破循环
    this.allMapService.setTerminalListService(this);
  }
  setShowRight (value: boolean) {
    this.showRight = value;
  }
  setClick () :void {
    this.isClick = true
  }
  actionTerminalList (id?: number): void {
    let bodys;
    if (id) {
      bodys = {
        token: this.storageService.getStorage.token,
        opUserId: this.storageService.getStorage.userId,
        journeyId: id
      }
      this.allMapService.DallShows = false
      this.fromToMarkerService.resetParams();
    } else {
      bodys = {
        token: this.storageService.getStorage.token,
        opUserId: this.storageService.getStorage.userId
      }
    }
    this.getTerminalList(bodys)
    .subscribe(res => {
      res.journey.fromLatitude = Number(res.journey.fromLatitude)
      res.journey.toLatitude = Number(res.journey.toLatitude)
      res.journey.fromLongitude = Number(res.journey.fromLongitude)
      res.journey.toLongitude = Number(res.journey.toLongitude)
      this.containerList = res.containers
      this.deviceList = res.devices
      this.fromToMarkerService.setParams('startTime', res.journey.startTime);
      this.fromToMarkerService.setParams('toCity', res.journey.toCity);
      this.fromToMarkerService.setParams('toLatitude', res.journey.toLatitude);
      this.fromToMarkerService.setParams('toLongitude', res.journey.toLongitude);
      this.fromToMarkerService.setParams('endTime', res.journey.endTime);
      this.fromToMarkerService.setParams('fromCity', res.journey.fromCity);
      if (this.firstJouney) {
        // 是否是第一次请求
        this.firstJouney = false
        this.fromToMarkerService.setParams('liveLatitude', res.journey.fromLatitude);
        this.fromToMarkerService.setParams('liveLongitude', res.journey.fromLongitude);
      }
      this.fromToMarkerService.setParams('fromLatitude', res.journey.fromLatitude);
      this.fromToMarkerService.setParams('fromLongitude', res.journey.fromLongitude);
      this.fromToMarkerService.setParams('roadmaps', res.journey.roadmaps);
      this.fromToMarkerService.setParams('relRoadmaps', res.journey.relRoadmaps);
      this.fromToMarkerService.setParams('journeyId', res.journey.journeyId);
      this.fromToMarkerService.startJourney()
    })
  }
  actionEnRoute (id: number): void {
    this.allMapService.DallShows = false
    this.getTerminalList({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      journeyId: id
    })
    .subscribe(res => {
      console.log(res)
      res.journey.fromLatitude = Number(res.journey.fromLatitude)
      res.journey.toLatitude = Number(res.journey.toLatitude)
      res.journey.fromLongitude = Number(res.journey.fromLongitude)
      res.journey.toLongitude = Number(res.journey.toLongitude)
      this.containerList = res.containers
      this.deviceList = res.devices
      this.fromToMarkerService.setParams('startTime', Number(res.containers[0].startTime));
      this.fromToMarkerService.setParams('toCity', res.journey.toCity);
      this.fromToMarkerService.setParams('toLatitude', res.journey.toLatitude);
      this.fromToMarkerService.setParams('toLongitude', res.journey.toLongitude);
      this.fromToMarkerService.setParams('endTime', res.journey.endTime);
      this.fromToMarkerService.setParams('fromCity', res.journey.fromCity);
      if (this.firstJouney) {
        // 是否是第一次请求
        this.firstJouney = false
        this.fromToMarkerService.setParams('liveLatitude', res.journey.fromLatitude);
        this.fromToMarkerService.setParams('liveLongitude', res.journey.fromLongitude);
      }
      this.fromToMarkerService.setParams('fromLatitude', res.journey.fromLatitude);
      this.fromToMarkerService.setParams('fromLongitude', res.journey.fromLongitude);
      this.fromToMarkerService.setParams('roadmaps', res.journey.roadmaps);
      this.fromToMarkerService.setParams('relRoadmaps', res.journey.relRoadmaps);
      this.fromToMarkerService.setParams('journeyId', res.journey.journeyId);
      this.fromToMarkerService.enRoute();
    })
  }
  seachTerminalData (deviceType: number, id: string) {
    this.temperatureService.resetData();
    this.humidityService.resetData();
    this.accelerationService.resetData();
    this.queryTerminalData({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      terminalId: id,
      deviceType: deviceType
    }).subscribe(res => {
      if (res.respCode !== '00000') {
        console.log('没有数据')
        return false
      }
      let datas = JSON.parse(res.data);
      this.setClick()
      if (deviceType === 0) {
        this.stateBridgService.setDeviceId(datas.bandDeviceId)
        this.stateBridgService.setContianerId(datas.terminalId)
      } else if (deviceType === 1) {
        this.stateBridgService.setDeviceId(datas.terminalId);
        this.stateBridgService.setContianerId('0');
      }
      if (this.getSensors(65, datas.sensors)[0].value !== null) {
        console.log('获取的温度' + this.getSensors(65, datas.sensors)[0].value)
        this.temperatureService.addData(this.getSensors(65, datas.sensors)[0].value, this.getSensors(1, datas.sensors)[0].value, datas.deviceName);
      }
      if (this.getSensors(66, datas.sensors)[0].value !== null) {
        console.log('获取的humidity' + this.getSensors(66, datas.sensors)[0].value);
        this.humidityService.addData(this.getSensors(66, datas.sensors)[0].value, this.getSensors(1, datas.sensors)[0].value, datas.deviceName);
      }
      if (this.getSensors(67, datas.sensors)[0].value !== null) {
        console.log('获取的加速度' + this.getSensors(67, datas.sensors)[0].value);        
        this.accelerationService.addData(this.getSensors(67, datas.sensors)[0].value, this.getSensors(1, datas.sensors)[0].value, datas.deviceName);
      }
      this.setRightStatus(datas, '1');
    })
  }
  // setDeviceState () {
  //   this.deviceList.forEach(item => {
  //     this.getTerminalState({
  //       token: this.storageService.getStorage.token,
  //       opUserId: this.storageService.getStorage.userId,
  //       terminalId: item.deviceId,
  //       deviceType: 0
  //     })
  //     .subscribe(res => {
  //       if (res.respCode !== '00000') {
  //         console.log('查询失败')
  //         return false
  //       }
  //       item.state = Number(res.state);
  //     })
  //   })
  // }
  // setContainerState () {
  //   this.containerList.forEach(item => {
  //     this.getTerminalState({
  //       token: this.storageService.getStorage.token,
  //       opUserId: this.storageService.getStorage.userId,
  //       terminalId: item.containerId,
  //       deviceType: 1
  //     })
  //     .subscribe(res => {
  //       if (res.respCode !== '00000') {
  //         console.log('查询失败')
  //       }
  //       item.state = Number(res.state)
  //     })
  //   })
  // }
  // 查询最近连接的设备数据
  queryTerminalData (body: any): Observable<any> {
    return this.httpService.post(HTTP_URL.terminalData, body)
  }
  // 请求设备信息
  getTerminalList (body: TerminalListBody): Observable<any> {
    return this.httpService.post(HTTP_URL.getTerminalList, body)
  }
  socketConnect (id: string, channel: number) {
    this.deviceSocketService.closeWS();
    this.deviceSocketService.createObservableSocket(id, channel)
    .subscribe(data => this.getSocketData(data)),
    error => console.log(error),
    () => console.log('结束')
  }
  getSocketData (data: string) {
    if (!this.isClick) return
    let datas = JSON.parse(data);
    console.log(datas)
    this.setRightStatus(datas, null);
    // this.containerAndDeviceStatusService.setStatus(0)
  }
  setRightStatus (datas: any, isclick: string) {
    // 调用reqmydata告诉服务器推哪个数据过来
      // if (datas.deviceType === 1) {
      //   this.setShowRight(false)
      //   this.containerAndDeviceStatusService.setState(datas.state);
      // } else if (datas.deviceType === 0) {
      //   this.setShowRight(true)
      // }
      if (isclick) {
        this.queryStatus(datas.deviceType, datas.terminalId, datas.bandDeviceId)
      } else {
        if (datas.sensors.length <= 3) {
          if (this.getSensors(65, datas.sensors)[0].value !== null) {
            // 判断温度
            this.temperatureService.setWarn(true);
          } else if (this.getSensors(66, datas.sensors)[0].value !== null)  {
            // 判断湿度
            this.humidityService.setWarn(true)
          } else if (this.getSensors(67, datas.sensors)[0].value !== null) {
            this.accelerationService.setWarn(true)
          } else if (this.getSensors(37, datas.sensors)[0].value !== null) {
            this.signalService.setWarn(true)
          } else if (this.getSensors(49, datas.sensors)[0].value !== null) {
            this.deviceBatteryService.setWarn(true);
          }
        }
      }
      if (!this.allMapService.DallShows) {
        var device = this.deviceList.filter(item => {
          // debugger
          return item.deviceId === datas.bandDeviceId
        })
        var container = this.containerList.filter(item => {
          return item.containerId === datas.terminalId
        })
        // 将左边的list状态改变下
        // this.deviceList.forEach(item => {
        //   if (item.deviceId === datas.bandDeviceId) {
        //     item.state = datas.state
        //   }
        // })
        // this.containerList.forEach(item => {
        //   if (item.containerId === datas.terminalId) {
        //     item.state = datas.state
        //   }
        // })
      } else {
        if (datas.deviceType === 0) {
          var device = this.allMapService.deviceList.filter(item => {
            return item.deviceId === datas.bandDeviceId
          })
        } else if (datas.deviceType === 1) {
          var device = this.allMapService.deviceList.filter(item => {
            return item.deviceId === datas.terminalId
          })
        }
        var container = this.allMapService.containerList.filter(item => {
          return item.containerId === datas.terminalId
        })
        // if (datas.deviceType === 0) {
        //   this.allMapService.deviceList.forEach(item => {
        //     if (item.deviceId === datas.bandDeviceId) {
        //       item.state = datas.state
        //     }
        //   })
        // } else if (datas.deviceType === 1) {
        //   this.allMapService.deviceList.forEach(item => {
        //     if (item.deviceId === datas.terminalId) {
        //       item.state = datas.state
        //     }
        //   })
        // }
        // this.allMapService.containerList.forEach(item => {
        //   if (item.containerId === datas.terminalId) {
        //     item.state = datas.state
        //   }
        // })
      }
      // 如果推送过来的数据id不是选中的数据
      // console.log(datas.terminalId === this.clickId)
      // if (datas.terminalId !== this.clickId) return;
      if (container.length !== 0) {
        this.containerAndDeviceStatusService.setContainerId(container[0].containerId)
        this.containerAndDeviceStatusService.setContainerName(container[0].containerName)
      }
      if (device.length !== 0) {
        this.containerAndDeviceStatusService.setDeviceId(device[0].deviceId)
        this.containerAndDeviceStatusService.setDeviceName(device[0].deviceName)
        this.vehicleInformationService.setParams('deviceName', device[0].deviceName);
      }
      console.log('状态为集装箱的状态为' + datas.state);
      this.containerAndDeviceStatusService.setState(datas.state);
      // this.containerAndDeviceStatusService.setContainerState(datas.state);
      if (this.getSensors(65, datas.sensors)[0].value !== null) {
        console.log('获取的温度' + this.getSensors(65, datas.sensors)[0].value)
        this.temperatureService.addData(this.getSensors(65, datas.sensors)[0].value, this.getSensors(1, datas.sensors)[0].value, datas.deviceName);
      } else {
        // 获取不到温度
        this.temperatureService.addData(null, 0, datas.deviceName);
      }
      if (this.getSensors(66, datas.sensors)[0].value !== null) {
        console.log('获取的humidity' + this.getSensors(66, datas.sensors)[0].value);
        this.humidityService.addData(this.getSensors(66, datas.sensors)[0].value, this.getSensors(1, datas.sensors)[0].value, datas.deviceName);
      } else {
        this.humidityService.addData(null, 0, datas.deviceName);
      }
      if (this.getSensors(67, datas.sensors)[0].value !== null) {
        this.accelerationService.addData(this.getSensors(67, datas.sensors)[0].value, this.getSensors(1, datas.sensors)[0].value, datas.deviceName);
      } else {
        this.accelerationService.addData(null, 0, datas.deviceName);
      }
      if (this.getSensors(68, datas.sensors)[0].value !== null) {
        console.log('门的状态为' + this.getSensors(68, datas.sensors)[0].value);
        this.containerAndDeviceStatusService.setDoor(this.getSensors(68, datas.sensors)[0].value);
      }
      if (this.getSensors(49, datas.sensors)[0].value !== null) {
        console.log('设备的电量为'+ this.getSensors(49, datas.sensors)[0].value);
        this.deviceBatteryService.setValue(this.getSensors(49, datas.sensors)[0].value);
      }
      if (this.getSensors(17, datas.sensors)[0].value !== null) {
        console.log('设备的CPU为'+ this.getSensors(17, datas.sensors)[0].value);
        this.cpuStatusService.setData(this.getSensors(17, datas.sensors)[0].value);
      }
      if (this.getSensors(18, datas.sensors)[0].value !== null) {
        console.log('设备的Memory为'+ this.getSensors(18, datas.sensors)[0].value);
        this.memoryStatusService.setData(this.getSensors(18, datas.sensors)[0].value);
      }      
      if (this.getSensors(37, datas.sensors)[0].value !== null) {
        console.log('设备的信号为' + this.getSensors(37, datas.sensors)[0].value);
        this.signalService.setValue(this.getSensors(37, datas.sensors)[0].value);
      }      
      //
      this.vehicleInformationService.setParams('status', datas.state);
      if (this.getSensors(1, datas.sensors)[0].value !== null) {
        console.log(this.getSensors(1, datas.sensors)[0].value)
        this.vehicleInformationService.setParams('gpsTime', this.getSensors(1, datas.sensors)[0].value)
      }
      if (this.getSensors(50, datas.sensors)[0].value !== null) {
        this.vehicleInformationService.setParams('latitude', this.getSensors(50, datas.sensors)[0].value / 1000000)
        this.vehicleInformationService.setParams('longitude', this.getSensors(50, datas.sensors)[1].value/ 1000000)
      }
      if (this.getSensors(2, datas.sensors)[0].value !== null) {
        this.vehicleInformationService.setParams('simiccid', this.getSensors(2, datas.sensors)[0].value)
        this.vehicleInformationService.setParams('simimsi', this.getSensors(2, datas.sensors)[1].value)
      }
      if (this.getSensors(3, datas.sensors)[0].value !== null) {
        this.vehicleInformationService.setParams('modulesn', this.getSensors(3, datas.sensors)[0].value)
        this.vehicleInformationService.setParams('moduleimei', this.getSensors(3, datas.sensors)[1].value)
      }
      if (this.getSensors(1, datas.sensors)[0].value !== null) {
        this.vehicleInformationService.setParams('time', Number(this.getSensors(1, datas.sensors)[0].value) * 1000)
      }
      this.vehicleInformationService.setParams('cellinfo', 
        (this.getSensors(33, datas.sensors)[0].value === null ? '' : this.getSensors(33, datas.sensors)[0].value.toString()) + ',' + 
        (this.getSensors(34, datas.sensors)[0].value === null ? '' : this.getSensors(34, datas.sensors)[0].value.toString()) + ',' + 
        (this.getSensors(35, datas.sensors)[0].value === null ? '' : this.getSensors(35, datas.sensors)[0].value.toString()) + ',' + 
        (this.getSensors(36, datas.sensors)[0].value === null ? '' : this.getSensors(36, datas.sensors)[0].value.toString())
      )
    // } 
    // else if (datas.deviceType === 1) {
    //   console.log('推过来的为设备')
    // }
  }
  getSensors(sensorTag: number, sensors: Array<any>): Array<any>  {
    console.log(sensorTag)
    let newSensors = sensors.filter(item => {
      return item.sensorTag === sensorTag
    })
    if (newSensors.length === 0) {
      return [{
        value: null
      }]
    }
    return newSensors[0].rules
  }
  queryStatus (deviceType: number, terminalId: string, deviceId: string) {
    // 0是contianer 1是device
    this.getReqMyData({
      token: this.storageService.getStorage.token,
      opUserId: this.storageService.getStorage.userId,
      deviceType: deviceType,
      terminalId: deviceType === 0 ? terminalId : deviceId
    })
    .subscribe(res => {
      console.log('获取channelReqmydata', res)
      if (res.respCode !== '00000') {
        console.log('查询失败')
      }
      this.setClick()
      // this.clickId = terminalId;
      if (deviceType === 1) {
        this.socketConnect(deviceId, res.user.channel)
      } else if (deviceType === 0) {
        this.socketConnect(terminalId, res.user.channel)
      }
    })
  }
  getReqMyData (body: any) {
    return this.httpService.post(HTTP_URL.reqMyData, body)
  }
  getTerminalState (body: any) {
    return this.httpService.post(HTTP_URL.terminalState, body)
  }
}
