import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'uuid',
    nullable: false
  })
  public cart_id: string;

  @Column({
    type: 'uuid',
    nullable: false
  })
  public product_id: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0
  })
  public count: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  cart: Cart
}
