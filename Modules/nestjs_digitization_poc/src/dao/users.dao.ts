import { Inject, Injectable } from '@nestjs/common';
import { helperErrorHandlerService } from 'src/common/services/errorHandlerHelper.service';
import { PrismaService } from '../prisma/prisma.service';
import {User} from "../dto/auth.dto"
@Injectable()
export class UsersDao {
    @Inject(PrismaService)
    private prisma: PrismaService;

    @Inject()
    private helperErrorHandler:helperErrorHandlerService;

    async find(criteria:any){
        try{
        return await this.prisma.userDetials.findMany({where:criteria})
        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"find");
        }
        
    }
    async findUser(userEmail:string){
        try{
            return await this.prisma.users.findUnique({where:{userEmail}})

        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"findUser");
        }
        
    }

    async createUser(userDetials:User){
        try{
            return  this.prisma.users.create({data:userDetials})

        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createUser");
        }
    }

    async updateUserDetials(data,id ){

        try{
            await this.prisma.users.update({where:{id},data})

        }catch(err){
            this.helperErrorHandler.throwErrorAndException(err,"createUser");
        }

    }

    async getRefreshTokenHash(id:string){
        try{
            return await this.prisma.users.findUnique({
                where: {
                  id,
                },
                select: {
                    refreshToken: true,
                },
              })

        }catch(e){
            throw e
        }

    }

}