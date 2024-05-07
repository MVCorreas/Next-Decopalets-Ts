export type OrderItem = {
    id: string;
    _id?: string;
    name: string;
    qty: number;
    image: string;
    price: number;
    color?: string; // Make color and size optional
    size?: string;
};

export type ShippingAddress = {
    fullName: String;
    address: String;
    city: String;
    postalCode: String;
    country: String;
  }
