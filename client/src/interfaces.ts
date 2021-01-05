export interface IProduct {
    id: number,
    product_code: string,
    name: string,
    description: string,
    price: number,
    author: string,
    published: number,
    form: number,
    genre: number,
    pages: number,
    publisher: string,
    language: string,
    stock_qty: number,
    path: string,
    quantity: number;
}

export interface ICartProduct {
    id: number,
    price: number,
    quantity: number,
    std_price: number,
    book: IProduct
}

export interface IOrders {
    book: IProduct,
    discount_code: null,
    id: number,
    order: IOrder,
    price: string,
    quantity: number,
    std_price: string,

}

export interface IOrder {
    delivery_address: string,
    delivery_method: string,
    id: string,
    order_time: string,
    total_sum: string
}

export interface ICartProps {
    setSidecart?: boolean;
    sidecart?: boolean;
    showCart?: () => void;
    title?: string;
    path?: string;
}

export interface IUser {
    fullName: string;
    email: string;
    address: string;
    phone: string;
    postalCode: string;
    id: number;
}