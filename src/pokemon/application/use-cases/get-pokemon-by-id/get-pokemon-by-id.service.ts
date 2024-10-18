import { Injectable, Inject } from '@nestjs/common';
import { Pokemon } from '../../../infrastructure/adapters/schema/Pokemon.schema';
import { PokemonRepository } from 'src/pokemon/domain/ports/pokemon.repository';

@Injectable()
export class GetPokemonByIdService {
  constructor(
    @Inject('PokemonRepository') private readonly pokemonRepository : PokemonRepository,
  ) {}

  /**
   * Obtiene un Pokémon por su ID.
   * @param id - El ID del Pokémon a buscar.
   * @returns El Pokémon encontrado o lanza una excepción si no existe.
   */
  public handler(id: number): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.getById(id);
    return pokemon;
  }
}