import Where from './Where'
import { AuthorBookDetails } from './Author'

export interface  BookRequest {
    PageNumber: number,
    PageLength: number,
    Search?: string,
    Filter: Where[]
}

export interface BooksRequest {
    PageNumber: number,
    PageLength: number,
    Where: Where[],
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
