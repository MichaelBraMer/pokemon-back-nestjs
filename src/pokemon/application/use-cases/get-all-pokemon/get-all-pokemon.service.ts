import { Injectable, Inject } from '@nestjs/common';
import { Pokemon } from '../../../infrastructure/adapters/schema/Pokemon.schema';
import { PokemonRepository } from 'src/pokemon/domain/ports/pokemon.repository';

@Injectable()
export class GetAllPokemonService {
  constructor(
    @Inject('PokemonRepository') private readonly pokemonRepository : PokemonRepository,
  ) {}

  /**
   * Devuelve una lista de todos los Pokémon.
   * @returns Una lista de Pokémon.
   */
  public handler(): Promise<Pokemon[]> {
    return this.pokemonRepository.getAll();
  }
}