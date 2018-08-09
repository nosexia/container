import { Pipe, PipeTransform } from '@angular/core';
import { RuleListService } from '../../providers/rule-list/rule-list.service'
@Pipe({
  name: 'rulesetRels'
})
export class RulesetRelsPipe implements PipeTransform {
  constructor(
    private ruleListService: RuleListService
  ) {
    if (!this.ruleListService.ruleData) return
    if (this.ruleListService.ruleData.length === 0) {
      // this.ruleListService.getAllRuleList()
    }
  }
  transform(value: any, args?: any): Array<any> {
    console.log(this.ruleListService.ruleData)
    return this.ruleListService.ruleData
  }
}
