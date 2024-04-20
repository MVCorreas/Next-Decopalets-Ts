export type Product = {
    id: string;
    _id?: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    numReviews: number;
    countInStock: number;
    colors?: []
    sizes?: []
};
