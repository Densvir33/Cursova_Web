import { DiscountDTO } from "./discountDTO";
import { ProductDTO } from "./productDTO";

export class OrderDTO{
    id: number;
    name: string;
    isExecuted: boolean;
    products:Array<ProductDTO>
    discounts:Array<DiscountDTO>
}