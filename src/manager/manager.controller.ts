import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, Req, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { AuthGuard } from "./Auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { ManagerDTO, UpdateManagerDTO } from "./dto/manager.dto";
import { ManagerEntity } from "./entities/manager.entity";
import { SessionGuard } from "./session.guard";


@Controller('manager')
export class ManagerController {

    constructor(private readonly managerService: ManagerService) {}

    //Send mail
    //1
    @UseGuards(SessionGuard)
    @Get('/email')
    sendMail(): void {
    return this.managerService.sendMail();
    }

    //2
    @UseGuards(SessionGuard)
    @Get('/dashboard')
    getmanager(): object {
        try {
            return this.managerService.getAllManager();
        }
        catch {
            return { error: 'invalid' };
        }
    }

    //3
    @UseGuards(SessionGuard)
    @Get('/viewprofile')
    async showProfile(@Session() session): Promise<object> {
        if (!session || !session.email) {
            throw new UnauthorizedException("User is not logged in");
        }
    
        try {
            return await this.managerService.showProfile(session.email);
        } catch (error) {
            throw new InternalServerErrorException("Failed to show profile");
        }
    }

    //4
    @UseGuards(SessionGuard)
    @Put('/update/:id')
    updateUsersById(@Param('id') id: number): object {
        try {
            return this.managerService.remove(id);
        } catch {
            throw new InternalServerErrorException("Failed to update profile");
        }
    }

    //5
    @UseGuards(SessionGuard)
    @Get('/findmanager/:id')
    async getManagerByID(@Param('id', ParseIntPipe) id: number): Promise<ManagerEntity> {
      const res = await this.managerService.getManagerByID(id);
          if (res !== null) {
              return await this.managerService.getManagerByID(id);
          }
          else {
              throw new HttpException("Manager not found", HttpStatus.NOT_FOUND);
          }
    }

    //6
    @Put('/updatemanager/:id')
    @UsePipes(new ValidationPipe())
    updateManagerbyID(@Param('id') id: string, @Body() data:UpdateManagerDTO ): object {
        return this.managerService.updateManagerById(id, data);
    }

    //5
    @UseGuards(SessionGuard)
    @Delete('/delete/:id')
    deleteUserbyId(@Param('id') id: number): object {
        try {
            return this.managerService.remove(id);

        } catch {
            throw new InternalServerErrorException("Failed to delete profile");
        }
    }


    //6
    @UseGuards(SessionGuard)
    @Get('/order')
    getOrderByNameAndId(@Query('name') name: string, @Query('id') id: string): object {
        try {
            return this.managerService.getOrderByNameAndId(name, id);

        } catch {
            throw new InternalServerErrorException("Failed to show order");
        }
    }

    //7
    @UseGuards(SessionGuard)
    @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './upload' })
    }


    //8
    @UseGuards(SessionGuard)
    @Get('fullname/:substring')
    async getUserBySubString(@Param('substring') substring: string): Promise<ManagerEntity[]> {
        

        try {
            return this.managerService.findByFullName(substring);

        } catch {
            throw new InternalServerErrorException("Manager name does not exist.");
        }
    }

    //9
    @UseGuards(SessionGuard)
    @Get('usernames/:username')
    async getUserByUsername(@Param('username') username: string): Promise<ManagerEntity> {
        return this.managerService.findOneByUsername(username);
    }

};