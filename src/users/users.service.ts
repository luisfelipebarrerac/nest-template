import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dto/get-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;
    const hash = await bcrypt.hash(password, 10);
    const userInsert = {
      email,
      password: hash,
    };
    const user = await this.userRepository.save(userInsert);
    const result = plainToClass(GetUserDto, user);
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne(id);
    const result = plainToClass(GetUserDto, user);
    return { result: result };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.find({
      where: { email },
    });
    return user[0];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
