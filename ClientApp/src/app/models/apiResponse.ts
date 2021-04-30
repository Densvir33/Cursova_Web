import { ProductDTO } from "./productDTO";

export class ApiResponse {

    isSuccessful: boolean ;
    message: string;
}

export class ApiCollectionResponse extends ApiResponse{
    data: Array<any>;
}

export class ApiSingleResponse extends ApiResponse{
    data: any;
}

export class ApiLoginResponse{
    isSuccessful: boolean
    token: string;
}