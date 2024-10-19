import { Injectable, Inject } from '@nestjs/common';
import { PokemonRepository } from 'src/pokemon/domain/ports/pokemon.repository'; 
import { Pokemon } from '../../../infrastructure/adapters/schema/Pokemon.schema';

@Injectable()
export class FetchAndCreatePokemonService {
  constructor(
    @Inject('PokemonRepository') private readonly pokemonRepository : PokemonRepository,
  ) {}

  /**
   * Crea un nuevo Pokémon.
   * @param name - Los datos del Pokémon a crear.
   * @returns El Pokémon que fue creado.
   */
  public async handler(name: string): Promise<Pokemon> {
    // Aquí podrías aplicar reglas de negocio, como evitar duplicados o verificar algún campo.
    return this.pokemonRepository.fetchAndCreate(name);
  }
}
