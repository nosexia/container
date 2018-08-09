import { Pipe, PipeTransform } from '@angular/core';
import { TerminalListService } from '../../providers/terminal-list/terminal-list.service'
@Pipe({
  name: 'containerBind'
})
export class ContainerBindPipe implements PipeTransform {
  constructor(
    private terminalListService: TerminalListService
  ) {
    if (!this.terminalListService.containerList) return
    if (this.terminalListService.containerList.length === 0) {
      this.terminalListService.actionTerminalList();
    }
  }
  transform(id: any, type?: any, state?: any): string {
    if (state === 0 || state === 3) return '- -'
    if (type === 0) {
      // 传过来的是containerId
      const newId = this.terminalListService.deviceList.filter((item) => {
        return item.deviceId === id
      })
      if (newId.length === 0) return '- -'
      return newId[0].deviceName
    } else if (type === 1){
      const newId = this.terminalListService.containerList.filter((item) => {
        return item.deviceId === id
      })
      if (newId.length === 0) return '- -'
      return newId[0].containerName
    }
  }

}
