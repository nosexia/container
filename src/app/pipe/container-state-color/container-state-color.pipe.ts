import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'containerStateColor'
})
export class ContainerStateColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
