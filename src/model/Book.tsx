import Author from './Author'

export interface BookBody {
    Id: number
    Title: string
    Description: string
    Isbn: string
    Quantity: number
    Cover: Blob
    PublishDate: string
    Authors: Author[]
    TotalCount: number
}

export interface BookRequest {
    Title: string
    Description: string
    Isbn: string
    Quantity: number
    Cover: Blob
    PublishDate: string
    AuthorIds: Author[]
}

export interface Book {
    Id: number
    Title: string
    Description: string
    Isbn: string
    Quantity: number
    Cover: Blob
    PublishDate: string
    Authors: Author[]
}
