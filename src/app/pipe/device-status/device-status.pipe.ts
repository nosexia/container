import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceStatus'
})
export class DeviceStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return 'Offline';
    if (value === 1) {
      return 'Connected'
    } else if (value === 2) {
      return 'Attached'
    } else if (value === 3) {
      return 'Activated'
    }
  }
  
}
