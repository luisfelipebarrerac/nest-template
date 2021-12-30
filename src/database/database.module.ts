import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/common/enums';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>(Configuration.DB_HOST),
          port: config.get<number>(Configuration.DB_PORT),
          username: config.get<string>(Configuration.DB_USER),
          password: config.get<string>(Configuration.DB_PASSWORD),
          database: config.get<string>(Configuration.DB_SCHEMA),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + './migrations/*{.ts,.js}'],
          synchronize: config.get<boolean>(Configuration.DB_SYNCHRONIZE),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
