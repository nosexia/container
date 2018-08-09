import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'containerState'
})
export class ContainerStatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 0) {
      return 'offline'
    } else if (value === 1) {
      return 'activated'
    }  else if (value === 2) {
      return 'attached'
    } else {
      return '- -'
    }
  }

}
