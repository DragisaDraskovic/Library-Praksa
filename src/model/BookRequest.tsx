import Where from './Where'

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
