export interface RulesetItem {
    groupId:  String,
    groupName:  String,
    enterpriseId:  String,
    status:  number,
    ruleGroupRels: Array<any>,
    groupType: number,
    checked?: boolean
}
