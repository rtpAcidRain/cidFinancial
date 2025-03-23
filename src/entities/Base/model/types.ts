export interface Base {
    id: string;
    basename?: string;
    password?: string;
    main_currency?: string;
    url: string;
}

export interface BaseSchema {
    bases?: Base[];
}

export interface BaseRequest {
    basename: string;
    password?: string;
    currency?: string;
}
