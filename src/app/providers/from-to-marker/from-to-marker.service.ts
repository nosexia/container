import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { interval } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FromToMarkerService {
  fromto: any = {
    startTime: '',
    endTime: '',
    fromCity: '',
    toCity: '',
    fromLatitude: 0,
    fromLongitude: 0,
    toLatitude: 0,
    toLongitude: 0,
    roadmaps: [],
    relRoadmaps: [],
    journeyId: null,
    liveLatitude: 0,
    liveLongitude: 0,
    livePositionLine: []
  }
  public timer: any = null;
  constructor(
    private router: Router
  ) { }

  setParams (params: string, value: any) {
    this.fromto[params] = value
  }
  resetParams () {
    this.fromto = {
      startTime: '',
      endTime: '',
      fromCity: '',
      toCity: '',
      fromLatitude: 0,
      fromLongitude: 0,
      toLatitude: 0,
      toLongitude: 0,
      roadmaps: [],
      relRoadmaps: [],
      journeyId: null,
      liveLatitude: 0,
      liveLongitude: 0,
      livePositionLine: []
    }
  }
  startJourney () {
    if (this.fromto.roadmaps.length === 0) return
    const source = interval(600000 / this.fromto.roadmaps.length);
    const subscribe = source.subscribe(val => {
      if (val === this.fromto.roadmaps.length - 1) {
        subscribe.unsubscribe()
      }
      this.fromto.liveLatitude = this.fromto.roadmaps[val].latitude;
      this.fromto.liveLongitude = this.fromto.roadmaps[val].longitude;
      this.fromto.livePositionLine.push({
        latitude: this.fromto.roadmaps[val].latitude,
        longitude: this.fromto.roadmaps[val].longitude
      })
    });
  }
  clearTimer () {
    this.fromto = {
      startTime: '',
      endTime: '',
      fromCity: '',
      toCity: '',
      fromLatitude: 0,
      fromLongitude: 0,
      toLatitude: 0,
      toLongitude: 0,
      roadmaps: [],
      relRoadmaps: [],
      journeyId: null,
      liveLatitude: 0,
      liveLongitude: 0,
      livePositionLine: []
    }
    this.timer.unsubscribe()
  }
  enRoute () {
    // 初始化清除清时期
    if (this.timer !== null) {
      this.timer.unsubscribe()
    }
    let nowTime = new Date().getTime();
    let Points: any = ((nowTime - this.fromto.startTime) / 600000) * this.fromto.roadmaps.length;
    let newPoint: number = parseInt(Points);
    this.fromto.liveLatitude = this.fromto.roadmaps[newPoint].latitude;
    this.fromto.liveLongitude = this.fromto.roadmaps[newPoint].longitude;
    this.fromto.roadmaps.forEach((is, index) => {
      if (index <= newPoint) {
        this.fromto.livePositionLine.push({
          latitude: this.fromto.roadmaps[index].latitude,
          longitude: this.fromto.roadmaps[index].longitude
        })
      }
    })
    const source = interval(600000 / this.fromto.roadmaps.length);
    this.timer = source.subscribe(val => {
      if (newPoint + val === this.fromto.roadmaps.length) {
        // 当前点等于总数的时候，取消订阅
        this.timer.unsubscribe()
        this.resetParams();
        this.router.navigate([''])
      }
      this.fromto.liveLatitude = this.fromto.roadmaps[newPoint + val].latitude;
      this.fromto.liveLongitude = this.fromto.roadmaps[newPoint + val].longitude;
      this.fromto.livePositionLine.push({
        latitude: this.fromto.roadmaps[newPoint + val].latitude,
        longitude: this.fromto.roadmaps[newPoint + val].longitude
      })
    });
  }

}
