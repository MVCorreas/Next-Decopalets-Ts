"use client";
import useCartService from "@/lib/hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      <h1 className="py-4 my-2 text-white text-3xl">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="flex justify-center items-center text-white text-2xl ">
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 bg-sky-50 rounded-lg shadow-md p-9">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead key={items[0]._id}>
                <tr className="text-lg text-[#244999]">
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={`${item._id}-${index}`}>
                    <td>
                      <Link
                        href={`/product/${item._id}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          priority
                          style={{
                            objectFit: "cover", 
                            width: "100px",
                            height: "100px",
                            borderRadius: "10px"
                          }}
                        />
                        <span className="px-2 text-xl">{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn bg-[#8EA4D2] hover:bg-[#2B5F9E] text-white"
                        type="button"
                        onClick={() => decrease(item)}
                      >
                        -
                      </button>
                      <span className="px-2 text-lg">{item.qty}</span>
                      <button
                        className="btn bg-[#8EA4D2] hover:bg-[#2B5F9E] text-white"
                        type="button"
                        onClick={() => increase(item)}
                      >
                        +
                      </button>
                    </td>
                    <td className="text-lg">${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card bg-[#8EA4D2] shadow-xl mt-3 md:mt-0">
              <div className="card-body">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : $
                      {itemsPrice}
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/shipping")}
                      className="btn btn-primary w-full bg-[#244999] hover:bg-[#2B5F9E] text-white text-lg"
                    >
                      Proceed to Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
