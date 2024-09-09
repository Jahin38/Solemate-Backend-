import { Body, Controller, Post, UsePipes, UseInterceptors, UploadedFile, ValidationPipe, Session, HttpException, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';
import { ManagerDTO, loginDTO } from '../dto/manager.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    //10
    @Post('register')
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|gif)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 1200000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myobj: ManagerDTO, @UploadedFile() myfile: Express.Multer.File): Promise<ManagerDTO> {
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(myobj.password, salt);
        myobj.password = hashedpassword;
        myobj.filename = myfile.filename;
        return this.authService.signUp(myobj);
    }

    //11
    @Post('login')
    @UsePipes(new ValidationPipe)
    async signin(@Body() logindata: loginDTO, @Session() session) {

        const result = await this.authService.signIn(logindata);
        if (result) {
            session.email = logindata.email;
            console.log(session.email);

            return result;
        }
        else {
            throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED);
        }
    }

    //12
    @Post('/logout')
    signout(@Req() req) {
        if (req.session.destroy()) {
            return true;
        }
        else {
            throw new UnauthorizedException("invalid actions");
        }

    }
}