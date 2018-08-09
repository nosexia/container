export interface GetDeviceListBody {
    token: String,
    opUserId: Number,
    reqPage?: Number,
    pageSize?: Number,
    enterpriseId?: String,
    deviceId?: Number,
    imei?: String,
    imsi?: String,
    networkModuleSn?: String,
    iccid?: String
}
