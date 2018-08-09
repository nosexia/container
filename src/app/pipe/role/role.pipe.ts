import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 1) {
      return 'super admin'
    } else if (value === 2) {
      return 'enterprise admin'
    } else if (value === 3) {
      return 'enterprise user'
    }
  }

}
