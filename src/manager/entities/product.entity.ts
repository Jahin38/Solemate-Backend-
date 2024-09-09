import { OrderEntity } from "./order.entity";
import { ListingEntity } from "./listing.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'productId', type: 'int' })
    productId: number;
    
    @Column({ type: 'varchar', unique: true })
    productCode: string;

  @Column({ name: 'brand', type: 'varchar', length: 100 })
  brand: string;

  @Column({ name: 'size', type: 'varchar', length: 10 })
  size: string;

  @Column({ name: 'color', type: 'varchar', length: 10 })
    color: string;

    @Column({ nullable: true, name: 'quantity', type: 'int' })
    productQuantity: number;

  @Column({ nullable: true, name: 'price', type: 'int' })
  price: number;
  
    @ManyToMany(() => OrderEntity, (order) => order.products)
  orders: OrderEntity[];

  @OneToMany(() => ListingEntity, (listing) => listing.product)
    listings: ListingEntity[];   

}
