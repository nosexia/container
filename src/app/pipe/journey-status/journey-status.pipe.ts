import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'journeyStatus'
})
export class JourneyStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value === 1 ? 'Enroute' : 'Arrived'
  }

}
