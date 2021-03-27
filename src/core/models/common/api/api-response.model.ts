import { PageInfo } from '../page-info.model';

export interface ApiResponse<T> {
    messages?: any;
    success: boolean;
    result: T;
    result_info: PageInfo;
}
