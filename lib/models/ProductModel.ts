export type Product = {
    _id?: string;
    id?: number;
    name: string;
    slug?: string;
    image: string;
    banner?: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    numReviews?: number;
    countInStock: number;
};
