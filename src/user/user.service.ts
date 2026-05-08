import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as brcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  //a função para criação do usuário tem como parametro um objeto data com os atributos definidos no createUserDTO
  async create(data: CreateUserDto) {
    //função que realiza o hash da senha
    const hashedPassword = await brcrypt.hash(data.password, 10);
    //cria um objeto para o novo usuário
    const newUser = await this.prisma.usuarios.create({
      data:{
        ...data,
        password: hashedPassword,
      }
    });

    //retorna o novo objeto
    return {
      ...newUser,
      password: undefined,
    };
  }

  async findAll() {
    //retorna todos os usuários armazenados até o momento
    return this.prisma.usuarios.findMany();
  }

//a função para buscar um usuário tem como parâmetro um id
  async findbyEmail(email: string) {
    //cria uma constante local e busca o usuário com o id correspondente
    const user = await this.prisma.usuarios.findUnique({
      where: { email },
    });
    //se ele não for encontrado o sistema retorna uma mensagem de usuário não encontrado
    if(!user){
      throw new NotFoundException('Usuário não encontrado')
    }
    //se for encontrado retorna o nome do usuário
    return user;
  }

  //a função para atualizar um usuário tem como parâmetro o id do usuário que será atualizado 
  //e um objeto updateData com os atributos definidos pelo update user dto
  async update(id: number, updateData: UpdateUserDto) {
    //cria uma constante e busca o usuário com o id correspondente
    const user = await this.prisma.usuarios.findUnique({
      where: { id },
    });
    if(!user){
      //se o id não for encontrado, uma mensagem é retornada
      throw new NotFoundException('Usuário não encontrado')
    }
    //faz o update do usuario com id correpondente no banco de dados
    await this.prisma.usuarios.update({
      where: {id},
      data: updateData,
    });

    const updatedUser = await this.prisma.usuarios.findUnique({
      where: { id },
    });

    console.log(`Usuário ${updatedUser?.name} atualizado com sucesso`);
    return updatedUser;
  }

  //tem com parametro o id do usuário a ser deletado
  async remove(id: number) {
    //busca o usuário
    const user = await this.prisma.usuarios.findUnique({
      where: { id },
    });
    //caso não seja encontrado retorna uma msg
    if(!user){
      throw new NotFoundException('Usuário não encontrado')
    }

    await this.prisma.usuarios.delete({
      where: { id },
    });
    //caso seja encontrado, remove o usuário do banco de dados
      return {message: 'Usuário deletado com sucesso'};
    
  }
}
