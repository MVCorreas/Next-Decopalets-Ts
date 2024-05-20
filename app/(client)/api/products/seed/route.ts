// import data from '@/lib/data'
// import dbConnect from '@/lib/dbConnect'
// import ProductModel from '@/lib/models/ProductModel'
// import UserModel from '@/lib/models/UserModel'
// import { NextRequest, NextResponse } from 'next/server'

// export const GET = async (request: NextRequest) => {
//   const { users, products } = data
//   //console.log('Users', users)
//   //console.log('Products', products)

//   await dbConnect()
//   await UserModel.deleteMany()
//   await UserModel.insertMany(users)

//   await ProductModel.deleteMany()
//   await ProductModel.insertMany(products)

//   return NextResponse.json({
//     message: 'seeded successfully',
//     users,
//     products,
//   })
// }

import data from '@/lib/data'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
import UserModel from '@/lib/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const { users, products } = data

  // Ensure database connection
  await dbConnect()

  // Delete existing data and insert new data
  try {
    await UserModel.deleteMany()
    await UserModel.insertMany(users)

    await ProductModel.deleteMany()
    await ProductModel.insertMany(products)

    return NextResponse.json({
      message: 'Seed successful',
      users,
      products,
    })
  } catch (error: any) {
    return NextResponse.json({
      message: 'Seed failed',
      error: error.message,
    }, { status: 500 })
  }
}
