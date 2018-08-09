import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceStateColor'
})
export class DeviceStateColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
