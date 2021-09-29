import { PageInfo } from '../page-info.model';

export interface ApiResponse<T> {
    response_code: number;
    messages?: any;
    success: boolean;
    result: T;
    result_info: PageInfo;
}
