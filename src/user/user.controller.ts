import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Patch('update/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Get('me')
    getMe(@CurrentUser() user: User){
        return user;
    }
}
