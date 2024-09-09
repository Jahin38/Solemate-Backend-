import { HttpException, HttpStatus, Injectable, NotFoundException, ParseIntPipe } from "@nestjs/common";
import { ManagerEntity } from "./entities/manager.entity";
import { ManagerDTO, loginDTO, UpdateManagerDTO } from "./dto/manager.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class ManagerService {
    constructor(@InjectRepository(ManagerEntity)
    private managerRepo: Repository<ManagerEntity>,
    private mailerService: MailerService,
        private jwtService: JwtService

    ) { }
    async addManager(myobj: ManagerEntity): Promise<ManagerEntity> {
        return await this.managerRepo.save(myobj);
    }
    async findOne(logindata: loginDTO): Promise<any> {
        return await this.managerRepo.findOneBy({ email: logindata.email });
    }
    async getAllManager(): Promise<ManagerEntity[]> {
        return await this.managerRepo.find();
    }
    async findOneByUsername(username: string): Promise<ManagerEntity> {
        return this.managerRepo.findOne({
            where: { username: username },
        });
    }
    async showProfile(email: string): Promise<ManagerEntity> {
        const user = await this.managerRepo.findOne({ where: { email } });
    
        if (!user) {
            throw new NotFoundException(`User with username ${email} not found`);
        }
    
        return user;
    }
    


    async updateOrder(id: number, managerDTO: ManagerDTO): Promise<ManagerEntity> {
        await this.managerRepo.update(id, managerDTO);
        return this.getOrderById(id);
    }
    async getOrderById(id: number): Promise<ManagerEntity> {
        const idString = id.toString();
        return this.managerRepo.findOneBy({ managerId: idString });
    }
    async remove(id: number): Promise<void> {
        await this.managerRepo.delete(id);
    }
    getOrderByNameAndId(name, id): object {
        console.log(id, name);
        return { message: "your id is " + id + " and your name is " + name };
    }

    //semd mail
    sendMail() : void {
    this.mailerService.sendMail({
    to: 'meghsimit642@gmail.com', 
    
    from: 'solemates.bd.2024@gmail.com', 
    subject: 'Welcome to Bangladesh\'s premier sneaker marketplace',
    text: 'Welcome', 
    html: '<b>Welcome User, Thank You for signing up.</b>', 
    })
}

    async search(logindata: loginDTO): Promise<ManagerEntity> {
        return await this.managerRepo.findOneBy({ email: logindata.email });
    }

    //DB Find
    async findByFullName(substring: string): Promise<ManagerEntity[]> {
        return this.managerRepo.find({
            where: { name: Like(`%${substring}%`) },
        });
    }

    async findOneByManagerUsername(username: string): Promise<ManagerEntity> {
        return this.managerRepo.findOne({
            where: { username: username },
        });
    }
 
    //
    async getManagerByID(id) {
        const data=await this.managerRepo.findOneBy({ managerId: id });
        console.log(data);
        if(data!==null) {
            return data;
        }
        else 
        {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    
    }
    
    async updateManagerById(id: string, data: UpdateManagerDTO): Promise<ManagerEntity> {
        await this.managerRepo.update(id, data);
        return this.managerRepo.findOneBy({ managerId: id });  
    }

}