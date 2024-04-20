import { create } from 'zustand'
import { round2 } from '../utils'
import { OrderItem } from '../models/OrderModel'
import { persist } from 'zustand/middleware'

type Cart = {
  items: OrderItem[]
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
}

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
}

export const cartStore = create<Cart>(() => initialState) 

export default function useCartService() {
    const {
      items,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = cartStore()
    return {
      items,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
     
      increase: (item: OrderItem) => {
        const exist = items.find((x) => x.id === item.id)
        const updatedCartItems = exist
          ? items.map((x) =>
              x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x
            )
          : [...items, { ...item, qty: 1 }]
        const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
          calcPrice(updatedCartItems)
        cartStore.setState({
          items: updatedCartItems,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        })
      },
      decrease: (item: OrderItem) => {
        const exist = items.find((x) => x.id === item.id)
        if (!exist) return
        const updatedCartItems =
          exist.qty === 1
            ? items.filter((x: OrderItem) => x.id !== item.id)
            : items.map((x) => (item.id ? { ...exist, qty: exist.qty - 1 } : x))
        const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
          calcPrice(updatedCartItems)
        cartStore.setState({
          items: updatedCartItems,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        })
      },
      
     
      clear: () => {
        cartStore.setState({
          items: [],
        })
      },
      init: () => cartStore.setState(initialState),
    }
  }
  
  const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + item.price * item.qty, 0)
      ),
      shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
      taxPrice = round2(Number(0.15 * itemsPrice)),
      totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    return { itemsPrice, shippingPrice, taxPrice, totalPrice }
  }