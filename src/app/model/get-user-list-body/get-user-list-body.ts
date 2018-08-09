export interface GetUserListBody {
    token: String,
    opUserId: Number,
    reqPage?: Number,
    pageSize?: Number,
    enterpriseId?: Number,
    deviceId?: Number,
    imei?: String,
    imsi?: String,
    networkModuleSn?: String,
    iccid?: String,
    userId?: Number,
    username?: String,
    contactPhone?: String,
    email?: String
}
