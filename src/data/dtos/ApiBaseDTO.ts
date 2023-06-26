export interface ApiBaseDTO<T> {
    message: string;
    data?: T | T[];
    errors?: string[];
}
