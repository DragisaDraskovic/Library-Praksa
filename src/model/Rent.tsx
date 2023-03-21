import User from './User'

export interface RentBookHistory {
  Id: number
  User: User
  RentDate: string
  IsReturned: boolean
}

export interface RentUserHistory {
  Book: {
    Id: number
    Title: string
  }
  RentDate: string
  isReturnded: boolean
}
