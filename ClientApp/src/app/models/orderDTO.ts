import { DiscountDTO } from "./discountDTO";
import { ProductInCart } from "./productInCart";

export class OrderDTO{
    id: number;
    name: string;
    isExecuted: boolean;
    date:Date;
    products:Array<ProductInCart>
    discounts:Array<DiscountDTO>
}