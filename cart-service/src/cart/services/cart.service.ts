import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { v4 } from 'uuid';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {
  
  constructor(@InjectRepository(Cart) private readonly cartsRepository: Repository<Cart>) { }

  async findByUserId(userId: string): Promise<Cart> {
    try {
      return await this.cartsRepository.findOne({ user_id: userId }, {
        relations: ['items']
    });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createByUserId(userId: string): Promise<Cart> {
    const id = v4(v4());
    const userCart = {
      id,
      user_id: userId,
      items: [],
    };

    try {
      return this.cartsRepository.save(userCart);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      ...userCart,
      items: [ ...items ],
    }

    try {
      return this.cartsRepository.save(updatedCart);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeByUserId(userId): Promise<DeleteResult> {
    try {
      return await this.cartsRepository.delete({ user_id: userId });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
