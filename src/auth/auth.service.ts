import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto} from './dto/register.auth.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService:UsersService,
    private jwtService:JwtService
  ){}

  async register(registerAuthDto: RegisterAuthDto): Promise<User>{

    const { email, password, userName } = registerAuthDto;

    const existingUser = await this.usersService.findByUserName(userName);
    if(existingUser){
      throw new Error('User alraedy exist')
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUserDto: CreateUserDto = {
      email,
      password: hashPassword,
      userName,
    };

    const user = await this.usersService.createUser(createUserDto);
    return user;
  }

  
  async login(loginAuthDto: LoginAuthDto): Promise<{access_token:string}>{
    const {username, password}= loginAuthDto
    const user= await this.usersService.findByUserName(username);

    if(!user){
      throw new Error('user doesnt exist')
    }

    console.log('data:', password);
    console.log('hash:', user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(! isPasswordValid){
      throw new Error('worng password')
    }

    const payload ={ sub: user._id, userName:user.userName}

    const token = this.jwtService.sign(payload);
    return{access_token: token};
  }
}
