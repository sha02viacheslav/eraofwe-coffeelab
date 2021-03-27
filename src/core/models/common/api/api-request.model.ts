export interface ApiRequest<T> {
    data: T;
    api_call: string;
    token: string;
    method: string;
}
