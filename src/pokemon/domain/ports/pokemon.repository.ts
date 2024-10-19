import { CreatePokemonDTO, UpdatePokemonDTO } from 'src/pokemon/application/dtos/pokemon.dto';
import { Pokemon } from '../../../pokemon/infrastructure/adapters/schema/Pokemon.schema';

export interface PokemonRepository {
  getAll(): Promise<Pokemon[]>;

  /**
   * Returns product filtered by id
   * @param {number} productId
   * @returns a `Product` object containing the data.
   */
  getById(id: number): Promise<Pokemon>;

  create(pokemon: CreatePokemonDTO): Promise<Pokemon>;

  delete(pokemonId: number): Promise<Pokemon>;

  update(
    pokemonId: number,
    pokemon: UpdatePokemonDTO,
  ): Promise<Pokemon>;

  fetchAndCreate(name: string): Promise<Pokemon>;
}