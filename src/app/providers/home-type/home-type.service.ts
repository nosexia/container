import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeTypeService {
  // 判断是否显示首页或者joureylist
  public showAllCD: boolean = true;
  // 判断是否显示右边的状态
  public showRight: boolean = false;
  // 显示tab还是只有device
  public showTab: boolean = true;
  constructor() { }
}
