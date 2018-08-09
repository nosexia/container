export interface UpdateJourneyBody {
    token: String,
    opUserId: Number,
    from: number,
    to: number,
    startTime: String,
    endTime: String,
    containerIds?: String,
    journeyId?: Number,
    roadmaps: Array<any>
}
