import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-res-dto.';
import { plainToClass } from 'class-transformer';
import { timeStamp } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      delete createUserDto.password;
      const hash = await bcrypt.hash(password, 10);
      const userInsert = {
        ...createUserDto,
        password: hash,
      };
      const user = await this.userRepository.save(userInsert);
      const result = plainToClass(UserResponseDto, user);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findAll() {
    const users = await this.userRepository.findAndCount();
    const result = plainToClass(UserResponseDto, users);
    return { result: result[0], totalFound: result[1] };
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne(id);
    const result = plainToClass(UserResponseDto, user);
    return { result: result };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.find({
      where: { email },
    });
    return user[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    try {
      const updateDelete = { is_deleted: true };
      const constrains = {
        id,
        is_deleted: false,
      };
      const userExists = await this.userRepository.find({ where: constrains });
      if (userExists.length) {
        const deleteRes = await this.userRepository.update(
          { id },
          updateDelete,
        );
        if (deleteRes.affected) {
          const user = await this.userRepository.findOne(id);
          const result = plainToClass(UserResponseDto, user);
          return { success: true, result };
        } else {
          throw new Error('Remove User error');
        }
      } else {
        throw new Error('User doesnt exists');
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
