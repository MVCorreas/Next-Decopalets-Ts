/* eslint-disable @next/next/no-img-element */
import data from '@/lib/data';
import ProductItem from '@/components/Product/ProductItem';
import { Metadata } from 'next';
import productService from '@/lib/services/productService';
import Link from 'next/link';
import { convertDocToObj } from '@/lib/utils';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Next Decopalets',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server components, Next auth, daisyui, zustand',
}

export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()

  //console.log('At Home latestProducts:', latestProducts);
  //console.log('At Home featuredProducts:', featuredProducts);

  const randomLatestProducts = latestProducts
    .sort(() => Math.random() - 0.5) // Shuffle the array
    .slice(0, 4); // Select the first four products

  return (
    <>
    <div className="w-full carousel rounded-box mt-4 relative overflow-hidden">
    <div className="carousel-inner flex gap-4 bg-sky-100 p-4" style={{ width: `${randomLatestProducts.length * 100}%` }}>
          {randomLatestProducts.map((product, index) => (
            <div 
              key={product._id}
              id={`slide-${index}`}
              className="carousel-item relative w-full flex-1"
             
            >
              <Link href={`/product/${product._id}`}>
                <img src={product.image} className="w-full h-64" alt={product.name} />
              </Link>
            </div>
          ))}
        </div>
     
    </div>
    <h2 className="text-2xl py-2">Latest products</h2>
    <div className="grid grid-cols-1 pag-4 gap-8 md:grid-cols-3 lg:grid-cols-4">
      {
        latestProducts.map((product) => (
          <ProductItem key={product._id} product={convertDocToObj(product)}/>
        ))}
    </div>
    </>

  );
}
