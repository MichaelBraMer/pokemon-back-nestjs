import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon, PokemonDocument } from './schema/Pokemon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreatePokemonDTO, UpdatePokemonDTO } from 'src/pokemon/application/dtos/pokemon.dto';
import { PokemonRepository } from 'src/pokemon/domain/ports/pokemon.repository';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { PokemonApiResponseDTO } from 'src/pokemon/application/dtos/poke-api-response.dto';
import { validate } from 'class-validator';
import { PokeApiMapper } from '../mappers/poke-api.mapper';

@Injectable()
export default class PokemonRepositoryMongo implements PokemonRepository {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel : Model<PokemonDocument>,
    private readonly httpService : HttpService,
    private readonly pokeApiMapper : PokeApiMapper,
  ) {}

  /**
   * Obtiene un Pokémon por su ID.
   * @param id - El ID del Pokémon a buscar.
   * @returns El Pokémon encontrado o lanza una excepción si no existe.
   */
  async getById(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findOne({id}).exec();
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return pokemon;
  }

  /**
   * Devuelve una lista de todos los Pokémon.
   * @returns Una lista de Pokémon.
   */
  async getAll(): Promise<Pokemon[]> {
    return await this.pokemonModel.find().exec();
  }

  /**
   * Crea un nuevo Pokémon.
   * @param pokemonData - Los datos del Pokémon a crear.
   * @returns El Pokémon que fue creado.
   */
  async create(pokemonData: CreatePokemonDTO): Promise<Pokemon> {
    // Aquí podrías aplicar reglas de negocio, como evitar duplicados o verificar algún campo.
    const pokemon = await this.pokemonModel.create(pokemonData)
    const pokemonCreated = await pokemon.save()
    return pokemonCreated;
  }

  /**
   * Actualiza un Pokémon existente.
   * @param id - El ID del Pokémon a actualizar.
   * @param pokemonData - Los datos actualizados del Pokémon.
   * @returns El Pokémon actualizado o lanza una excepción si no existe.
   */
  async update(id: number, pokemonData: UpdatePokemonDTO): Promise<Pokemon> {
    const existingPokemon = await this.pokemonModel.findOne({id}).exec;
    if (!existingPokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return await this.pokemonModel.findOneAndUpdate({id: id}, pokemonData, { new: true}
    ).exec();
  }

  /**
   * Elimina un Pokémon por su ID.
   * @param id - El ID del Pokémon a eliminar.
   * @returns `true` si fue eliminado correctamente, `false` si no existe.
   */
  async delete(id: number): Promise<Pokemon> {
    const existingPokemon = await this.pokemonModel.findOne({id}).exec;
    if (!existingPokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return await this.pokemonModel.findOneAndDelete({id}).exec();
  }

    /**
   * Obtiene un Pokémon por su ID.
   * @param id - El ID del Pokémon a buscar.
   * @returns El Pokémon encontrado o lanza una excepción si no existe.
   */
    async fetchAndCreate(name: string): Promise<Pokemon> {
      try {
          const response: AxiosResponse = await this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`).toPromise();
          const apiResponseDto = new PokemonApiResponseDTO();
          console.log(response.data.moves)
          apiResponseDto.id = response.data.id;
          apiResponseDto.name = response.data.name;
          apiResponseDto.types = response.data.types.map((type) => type.type.name);
          apiResponseDto.moves = response.data.moves.map((move) => move.move.name);
          apiResponseDto.weight = response.data.weight;
          apiResponseDto.height = response.data.height;
  
          const errors = await validate(apiResponseDto);
  
          if (errors.length > 0) {
              throw new BadRequestException('Invalid data from PokeAPI');
          }
  
          // Mapeamos la respuesta a un formato estándar usando el mapper
          const pokemon = this.pokeApiMapper.mapToStandardFormat(response.data);
          const savePokemon = await this.pokemonModel.create(pokemon)
          return await savePokemon.save()
      } catch (error) {
          throw new Error(`Failed to fetch data for Pokémon: ${name}`);
      }
    }
}