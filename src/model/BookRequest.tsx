import Where from './Where'

export default interface  BookRequest {
    PageNumber: number,
    PageLength: number,
    Where?: Where[]
}
