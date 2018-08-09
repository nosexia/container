import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journeyStatus'
})
export class JourneyStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === 0) return 'CREATED';
    return value === 1 ? 'STARTED' : 'ENDED'
  }

}
