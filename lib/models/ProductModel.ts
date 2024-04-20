import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema)

export default ProductModel

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
