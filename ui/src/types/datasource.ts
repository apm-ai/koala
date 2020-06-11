export interface DataSourceResponse<T> {
    data: T;
    readonly status: number;
    readonly statusText: string;
    readonly ok: boolean;
    readonly headers: Headers;
    readonly redirected: boolean;
    readonly type: ResponseType;
    readonly url: string;
    readonly config: any;
  }