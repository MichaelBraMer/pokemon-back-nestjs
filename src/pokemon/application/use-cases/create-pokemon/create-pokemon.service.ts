import { Injectable, Inject } from '@nestjs/common';
import { Pokemon } from '../../../infrastructure/adapters/schema/Pokemon.schema';
import { CreatePokemonDTO } from 'src/pokemon/application/dtos/pokemon.dto';
import { PokemonRepository } from 'src/pokemon/domain/ports/pokemon.repository';

@Injectable()
export class CreatePokemonService {
  constructor(
    @Inject('PokemonRepository') private readonly pokemonRepository : PokemonRepository,
  ) {}

  /**
   * Crea un nuevo Pokémon.
   * @param pokemonData - Los datos del Pokémon a crear.
   * @returns El Pokémon que fue creado.
   */
  public async handler(pokemonData: CreatePokemonDTO): Promise<Pokemon> {
    // Aquí podrías aplicar reglas de negocio, como evitar duplicados o verificar algún campo.
    return await this.pokemonRepository.create(pokemonData);
  }
}
