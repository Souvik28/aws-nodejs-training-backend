import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async findOneById(userId: string): Promise<User> {
    try {
      return await this.usersRepository.findOne(userId);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOneByName(name: string): Promise<User> {
    try {
      return await this.usersRepository.findOne({ name });
    } catch (error) {
      console.log(error);
      return null;
    }    
  }

  async createOne({ name, password }): Promise<User> {
    const id = v4(v4()) as string;
    const newUser = { id, name, password };

    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
