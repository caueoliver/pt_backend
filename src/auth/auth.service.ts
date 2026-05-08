import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly UserService: UserService){}
    
    async validateUser(email: string, password: string) {
        const user = await this.UserService.findbyEmail(email);
        
        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if(isPasswordValid){
                return{
                    ...user,
                    password:undefined,
                }
            }
        }

        throw new Error('Email ou senha incorretos');
    }
}
