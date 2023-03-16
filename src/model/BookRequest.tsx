import Where from './Where'

export default interface  BookRequest {
    PageNumber: number,
    PageLength: number,
    Search: string,
    Filter: Where[]
}
