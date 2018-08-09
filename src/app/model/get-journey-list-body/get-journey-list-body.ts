export interface GetJourneyListBody {
    token: String,
    opUserId: Number,
    journeyId?: Number,
    enterpriseId?: Number,
    deviceId?: Number,
    containerId?: Number,
    status?: Number,
    startTime?: String,
    endTime?: String,
    from?: String,
    to?: String
}
