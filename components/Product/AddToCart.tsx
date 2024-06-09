'use client'
import useCartService from '@/lib/hooks/useCartStore';
import { OrderItem } from '@/lib/models/OrderModel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddToCart({ item }: { item: OrderItem }) {
    const router = useRouter();
    const {  items, increase, decrease } = useCartService();
    const [existItem, setExistItem] = useState<OrderItem | undefined>();

    useEffect(() => {
        setExistItem(items.find((x) => x._id === item._id))
    }, [item, items])

    const addToCartHandler = () => {
        increase(item)
    }

    return existItem ? (
        <div>
      <button className="btn" type="button" onClick={() => decrease(existItem)}>
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
    ) : (
        <button
            onClick={addToCartHandler}
            className="btn btn-primary w-full bg-[#244999] hover:bg-[#2B5F9E] text-white"
            type='button'
        >
            Add to cart
        </button>
    )

}
