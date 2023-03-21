export interface BookRequestForEdit {
    Id : number;
    Title: string;
    Description: string;
    ISBN: string;
    Quantity: number;
    Cover?: string;
    PublishDate: string;
    AuthorIds?: number[]
}
