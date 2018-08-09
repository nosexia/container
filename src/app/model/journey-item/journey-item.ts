export interface JourneyItem {
    enterpriseId: Number,
    journeyId: Number,
    from: number,
    fromCity: String,
    to: number,
    toCity: String,
    startTime: any,
    endTime: any,
    status: Number,
    createDate: String,
    updateDate: String,
    opUserId: Number,
    fromLatitude: String,
    fromLongitude: String,
    toLatitude: String,
    toLongitude: String,
    containerIds?: Array<any>,
    checked: Boolean,
    disabled: Boolean,
    roadmaps?: Array<any>
}
