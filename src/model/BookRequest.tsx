import { AuthorBookDetails } from './Author'
import Where from './Where'

export interface  BookRequest {
    PageNumber: number,
    PageLength: number,
    Search?: string,
    Filter: Where[]
}

export interface BookDetailsRequest {
    Id: number,
    Title: string
    Description: string,
    ISBN: string,
    Quantity: number,
    Available: number,
    Cover: string,
    PublishDate: string,
    Authors:AuthorBookDetails[]
}
