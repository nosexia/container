import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceState'
})
export class DeviceStatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 0) {
      return 'offline'
    } else if (value === 1) {
      return 'activated'
    } else {
      return '- -'
    }
  }

}
