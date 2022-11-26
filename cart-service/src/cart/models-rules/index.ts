import { CartItem } from "../entities/cart-item.entity";
import { Cart } from "../entities/cart.entity";

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart ? cart.items.reduce((acc: number, { count }: CartItem) => {
    return acc += count;
  }, 0) : 0;
}
