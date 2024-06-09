import Link from "next/link";
import data from '@/lib/data';
import Image from "next/image";
import AddToCart from "@/components/Product/AddToCart";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}) {
  const product = await productService.getById(params.id)
  //console.log('At product id, params.id:', params.id);

  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {Array(fullStars).fill(0).map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      {halfStars === 1 && <FaStarHalfAlt className="text-yellow-500" />}
      {Array(emptyStars).fill(0).map((_, index) => (
        <FaRegStar key={index} className="text-yellow-500" />
      ))}
    </div>
  );
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  // console.log('Params:', params);
  // console.log('Params ID:', params.id);

  const product = await productService.getById(params.id)
  //console.log('At ProductDetails product:', product);

  if (!product) {
    return <div>Product not found</div>;
  }
    
    //console.log('Item:', {...product, qty: 0, color: '', size: ''});

  return (
    <>
      <div className='my-2 text-white text-3xl'>
        <Link href='/'>Back to products</Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3 bg-sky-50 rounded-lg shadow-md p-9'>
        <div className='md:col-span-2'>
          <div style={{ width: '600px', height: '500px', position: 'relative', borderRadius: '10px' }}>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className='object-cover w-full h-full rounded-t-lg border-2'
              priority
            />
          </div>
        </div>
        <div>
          <ul className='space-y-4'>
            <li>
              <h1 className='text-3xl'>{product.name}</h1>
            </li>
            <li>
              <RatingStars rating={product.rating} /> 
              <p>({product.numReviews} reviews)</p>
            </li>
            <li>
              <div className='divider'></div>
            </li>
            <li className='text-lg'>
              Description: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className='card bg-[#8EA4D2] shadow-xl mt-3 md:mt-0'>
            <div className='card-body'>
              <div className='mb-2 flex justify-between'>
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className='mb-2 flex justify-between'>
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className='card-actions justify-center'>
                  <AddToCart
                    item={{...convertDocToObj(product), id: String(product.id), qty: 0, color: '', size: ''}}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
