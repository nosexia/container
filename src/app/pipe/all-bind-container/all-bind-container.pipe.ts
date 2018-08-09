import { Pipe, PipeTransform } from '@angular/core';
import { AllMapService } from '../../providers/all-map/all-map.service'
@Pipe({
  name: 'allBindContainer'
})
export class AllBindContainerPipe implements PipeTransform {

  constructor(
    private allMapService: AllMapService
  ) {
    if (!this.allMapService.containerList) return
    if (this.allMapService.containerList.length === 0) {
      this.allMapService.actionTerminalList();
    }
  }
  transform(id: any, type?: any, state?: any): string {
    if (state === 0 || state === 3) return '- -'
    if (type === 0) {
      // 传过来的是containerId
      const newId = this.allMapService.deviceList.filter((item) => {
        return item.deviceId === id
      })
      if (newId.length === 0) return '- -'
      return newId[0].deviceName
    } else if (type === 1){
      const newId = this.allMapService.containerList.filter((item) => {
        return item.deviceId === id
      })
      if (newId.length === 0) return '- -'
      return newId[0].containerName
    }
  }

}
