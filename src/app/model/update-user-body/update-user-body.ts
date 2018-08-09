export interface UpdateUserBody {
    token: String,
    opUserId: String,
    enterpriseName?: String
    enterpriseId?: String,
    username?: String,
    password?: String,
    group?: Number,
    userId?: Number,
    firstName?: String,
    lastName?: String,
    email?: String,
    contactPhone?: String
}
