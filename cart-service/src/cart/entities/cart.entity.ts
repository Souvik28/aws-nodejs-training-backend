import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'uuid',
    nullable: false
  })
  public user_id: string;

  @Column('date')
  public created_at: string;

  @Column('date')
  public updated_at: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
    items: CartItem[]
}
