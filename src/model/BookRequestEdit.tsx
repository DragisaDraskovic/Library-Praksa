import { Author } from './Author'

export interface BookRequestForEdit {
    Id: number,
    Title: string
    Description: string
    ISBN: string
    Quantity: number
    Cover: Blob
    PublishDate: string
    AuthorIds: Author[]
}
