import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pokemon'),
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
