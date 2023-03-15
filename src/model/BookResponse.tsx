import Book from './Book'

export default interface BookResponse {
    Items: Book[],
    TotalCount: number
}
