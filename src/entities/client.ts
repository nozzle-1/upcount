import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Client {
  @PrimaryGeneratedColumn('uuid')
  id = string;

  @Column()
  name = string;

  @Column('text')
  address = string;

  @Column()
  emails = string;

  @Column()
  phone = string;

  @Column()
  vatin = string;

  @Column()
  website = string;
}

export default Client;
