import { Pipe, PipeTransform } from '@angular/core';
import { EnterpriseListService } from '../../providers/enterprise-list/enterprise-list.service';

@Pipe({
  name: 'enterpriseName'
})
export class EnterpriseNamePipe implements PipeTransform {
  constructor (
    private enterpriseListService: EnterpriseListService
  ) {
    if (this.enterpriseListService.enterpriseData.length === 0) {
      this.enterpriseListService.getAllEnterprise()
    }
  }
  transform(id: any, args?: any): String {
    if (id === 0) return 'Super Enterprise'
    const newId = this.enterpriseListService.enterpriseData.filter((item) => {
      return item.enterpriseId === id
    })
    if (newId.length === 0) return '- -'
    return newId[0].enterpriseName
  }

}
