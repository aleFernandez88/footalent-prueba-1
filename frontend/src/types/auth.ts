export interface IRegisterData {
    name: string;
    email: string;
    password: string;
}

export interface IApiResponse {
    [x: string]: any;
    success: boolean;
    message: string;
    statusCode?: number;
    errors?: string[];
}