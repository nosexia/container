import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceType'
})
export class DeviceTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 0) {
      return 'Contaner'
    } else {
      return 'Device'
    }
  }

}
