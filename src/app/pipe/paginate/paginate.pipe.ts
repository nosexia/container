import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return [];
    let newList = [];
    for (let x = 0; x < Math.ceil(value.length / args.pageSize); x++) {
      let start = x * args.pageSize;
      let end = start + args.pageSize;
      newList.push(value.slice(start, end));
    }
    return newList[args.currentPage - 1];
  }

}
