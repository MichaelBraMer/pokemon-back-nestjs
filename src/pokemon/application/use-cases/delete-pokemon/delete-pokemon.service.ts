import { Injectable, Inject } from '@nestjs/common';
import { Pokemon } from '../../../infrastructure/adapters/schema/Pokemon.schema';
import { PokemonRepository } from 'src/pokemon/domain/ports/pokemon.repository';

@Injectable()
export class DeletePokemonService {
  constructor(
    @Inject('PokemonRepository') private readonly pokemonRepository : PokemonRepository,
  ) {}

  /**
   * Elimina un Pokémon por su ID.
   * @param id - El ID del Pokémon a eliminar.
   * @returns `true` si fue eliminado correctamente, `false` si no existe.
   */
  public handler(id: number): Promise<Pokemon> {
    return this.pokemonRepository.delete(id);
  }
}