export interface EnterpriseItem {
    enterpriseName: String,
    contactName: String,
    contactNo: String,
    email: String,
    enterpriseId?: Number,
    checked: Boolean,
    disabled: Boolean,
    // 0是private,1是public
    viewType: Number
}
