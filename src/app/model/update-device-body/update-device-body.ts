export interface UpdateDeviceBody {
    token: String,
    opUserId: Number,
    enterpriseId?: Number,
    deviceName?: String,
    deviceId?: Number,
    rulesetName?: string,
    rulesetId?: number,
    iccid?: String,
    imsi?: String
}
