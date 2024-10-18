import { Injectable, Inject } from '@nestjs/common';
import { Pokemon } from '../../../infrastructure/adapters/schema/Pokemon.schema';
import { PokemonRepository } from 'src/pokemon/domain/ports/pokemon.repository';
import { UpdatePokemonDTO } from '../../dtos/pokemon.dto';

@Injectable()
export class UpdatePokemonService {
  constructor(
    @Inject('PokemonRepository') private readonly pokemonRepository : PokemonRepository,
  ) {}

  /**
   * Actualiza un Pokémon existente.
   * @param id - El ID del Pokémon a actualizar.
   * @param pokemonData - Los datos actualizados del Pokémon.
   * @returns El Pokémon actualizado o lanza una excepción si no existe.
   */
  public handler(id: number, pokemonData: UpdatePokemonDTO): Promise<Pokemon> {
    return this.pokemonRepository.update(id, pokemonData);
  }
}