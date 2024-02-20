export interface TaskDTO {
    _id?: string
    name: string,
    maxValue: number,
    value: number,
    notes: string,
    updatedAt?: Date
}