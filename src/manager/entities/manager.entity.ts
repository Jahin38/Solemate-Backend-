// import { ManagerEntity } from "src/manager/manager.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";


@Entity("manager")
export class ManagerEntity {

    @PrimaryGeneratedColumn()
    managerId: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;


    @Column({ type: 'varchar' })
    password: string;
    @Column({ name: 'fullName', type: 'varchar', length: 150 })
    name: string;
    @Column()
    address: string;
    @Column()
    filename: string;

     

}