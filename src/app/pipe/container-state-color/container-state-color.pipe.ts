import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'containerStateColor'
})
export class ContainerStateColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 0) {
      return '#B3B3B3';
    } else if (value === 1) {
      return '#FD883E';
    } else if (value === 2) {
      return '#87d068'
    } else if (value === 3) {
      return '#108ee9'
    }
  }

}
