import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tostring'
})
export class TostringPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return value.toString();
  }

}
