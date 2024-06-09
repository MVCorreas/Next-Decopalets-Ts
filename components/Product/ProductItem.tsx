import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/models/ProductModel';

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className='card bg-sky-100 shadow-xl mb-2 p-2'>
    <figure className="overflow-hidden rounded-t-lg border-b border-gray-300"> 
        <Link href={`/product/${product._id}`}>
          <Image 
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className='object-cover h-48 w-60 border-4 rounded-t-lg' 
            priority
          />
        </Link>
      </figure>
    <div className='card-body bg-[#49516F]'>
        <div className='flex flex-col h-full justify-between'>
          <div>
            <Link href={`/product/${product._id}`}>
              <h2 className='card-title font-bold text-white'>{product.name}</h2>
            </Link>
          </div>
          <div className='mt-auto'> 
            <div className='flex items-center justify-between'>
              <span className='text-md text-white'>${product.price}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}