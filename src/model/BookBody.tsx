import Author from './Author'

export default interface BookBody {
    Id: number
    Title: string
    Description: string
    Isbn: string
    Quantity: number
    Cover: Blob
    PublishDate: string
    AuthorsIds: Author[]
}