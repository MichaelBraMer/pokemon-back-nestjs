import { Module } from '@nestjs/common';
import PokemonRepositoryMongo from './pokemon/infrastructure/adapters/pokemon.repository.mongo';
import { PokemonController } from './pokemon/infrastructure/controllers/Pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from 'src/pokemon/infrastructure/adapters/schema/Pokemon.schema';
import { CreatePokemonService } from './pokemon/application/use-cases/create-pokemon/create-pokemon.service';
import { DeletePokemonService } from './pokemon/application/use-cases/delete-pokemon/delete-pokemon.service';
import { GetAllPokemonService } from './pokemon/application/use-cases/get-all-pokemon/get-all-pokemon.service';
import { GetPokemonByIdService } from './pokemon/application/use-cases/get-pokemon-by-id/get-pokemon-by-id.service';
import { UpdatePokemonService } from './pokemon/application/use-cases/update-pokemon/update-pokemon.service';
import { FetchAndCreatePokemonService } from './pokemon/application/use-cases/fetch-and-create-pokemon/fetch-and-create-pokemon.service';
import { HttpModule } from '@nestjs/axios'; // Registrar el esquema de Pokémon
import { PokeApiMapper } from './pokemon/infrastructure/mappers/poke-api.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
    HttpModule,
  ],
  controllers: [PokemonController], // Aquí registras el controlador
  providers: [
    CreatePokemonService,
    DeletePokemonService,
    GetAllPokemonService,
    GetPokemonByIdService,
    UpdatePokemonService,
    FetchAndCreatePokemonService,
    PokeApiMapper,
    {
      provide: 'PokemonRepository',
      useClass: PokemonRepositoryMongo,
    }, // Registras el servicio que consume la API externa
  ],
  exports: [
    CreatePokemonService,
    DeletePokemonService,
    GetAllPokemonService,
    GetPokemonByIdService,
    UpdatePokemonService,
    FetchAndCreatePokemonService,
  ]
})
export class PokemonModule {}
