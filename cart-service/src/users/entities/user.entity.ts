import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'text',
    nullable: false
  })
  public name: string;

  @Column({
    type: 'text'
  })
  public email: string;

  @Column({
    type: 'text'
  })
  public password: string;
}
