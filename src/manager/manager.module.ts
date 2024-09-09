import { Module } from "@nestjs/common";
import { ManagerController } from "./manager.controller";
import { ManagerService } from "./manager.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ManagerEntity } from "./entities/manager.entity";
import { AuthService } from "./Auth/auth.service";
import { MailerModule } from '@nestjs-modules/mailer';
import { OrderEntity } from "./entities/order.entity";
import { ProductEntity } from "./entities/product.entity";
import { ListingEntity } from "./entities/listing.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ManagerEntity, OrderEntity,ProductEntity, ListingEntity]),
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
            user: 'solemates.bd.2024@gmail.com',
            pass: 'adfzrukqegtwdsxu',
          },
        },
      }),
    JwtModule.register({
        global: true,
        secret: "3NP_Backend_Manager",
        signOptions: { expiresIn: '30m' },
    }),
    ],
    controllers: [ManagerController],
    providers: [ManagerService, AuthService],
    exports: [ManagerService],
})

export class ManagerModule { }