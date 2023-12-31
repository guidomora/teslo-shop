import { ISize } from "./products";
import { IUser } from "./user";

export interface IOrder {
    _id: string;
    user?: IUser | string;
    orderItems: IOrderItem
    shippingAdress: ShippingAdress;
    paymentResult?: string;
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    tax: number;
    total: number;

    isPaid: boolean;
    paidAt?: string
}

export interface IOrderItem {
    _id      : string;
    title    : string;
    size     : ISize;
    quantity : number;
    slug     : string;
    image    : string;
    price    : number;
    gender   : string;
}

export interface ShippingAdress {
    firstName: string;
    lastName: string;
    adress: string;
    adress2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
  }
