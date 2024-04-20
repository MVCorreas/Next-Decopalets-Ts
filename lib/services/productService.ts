import { cache } from 'react'
import dbConnect from '@/lib/dbConnect'
import ProductModel, { Product } from '@/lib/models/ProductModel'

export const revalidate = 3600

const getLatest = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(6).lean()
  return products as Product[]
})

const getFeatured = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  return products as Product[]
})

const getById = cache(async (_id: string) => {
  await dbConnect()
  const product = await ProductModel.findById({ _id }).lean()
  return product as Product
})



const productService = {
  getLatest,
  getFeatured,
  getById,
}
export default productService