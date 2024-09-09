import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ManagerEntity } from "./manager.entity";
import { ProductEntity } from "./product.entity";

@Entity("listing")
export class ListingEntity {

    @PrimaryGeneratedColumn({ name: 'listingId', type: 'int' })
    listingId: number;



    

    @Column({name: 'productId', type: 'int'})
    productId: number;

    @Column({name: 'sellerId', type: 'int'})
    sellerId: number;

    @Column({ name: 'listingDate', type: 'date' })
    listingDate: Date;

    @Column({name: 'status', type: 'bool'})
    status: boolean;




    

    

    @ManyToOne(() => ProductEntity, (product) => product.listings)
    product: ProductEntity;
}