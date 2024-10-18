import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon, PokemonDocument } from './schema/Pokemon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CreatePokemonDTO, UpdatePokemonDTO } from 'src/pokemon/application/dtos/pokemon.dto';
import { PokemonRepository } from 'src/pokemon/domain/ports/pokemon.repository';

@Injectable()
export default class PokemonRepositoryMongo implements PokemonRepository {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel : Model<PokemonDocument>,
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
}