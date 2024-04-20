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

  return (
    <>
    <div className="w-full carousel rounded-box mt-4 relative overflow-hidden">
      <div className="carousel-inner flex gap-4" style={{ width: `${featuredProducts.length * 100}%` }}>
        {featuredProducts.map((product, index) => (
          <div 
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative flex-shrink-0"
           
          >
            <Link href={`/product/${product._id}`}>
              <img src={product.image} className="w-full h-64" alt={product.name} />
            </Link>
          </div>
        ))}
      </div>
      <a
        href="#prev"
        className="btn btn-circle absolute left-0 top-1/2 transform -translate-y-1/2"
      >
        ❮
      </a>
      <a
        href="#next"
        className="btn btn-circle absolute right-0 top-1/2 transform -translate-y-1/2"
        
      >
        ❯
      </a>
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
