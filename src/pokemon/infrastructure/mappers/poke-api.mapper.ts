import { Injectable } from '@nestjs/common';

@Injectable()
export class PokeApiMapper {
  /**
   * Mapea la respuesta de PokeAPI a un formato estándar para la aplicación.
   * @param apiResponse - Los datos en bruto obtenidos desde PokeAPI.
   * @returns Un objeto con el formato estándar de Pokémon.
   */
  mapToStandardFormat(apiResponse: any): any {
    // Realizamos el mapeo de los datos crudos de PokeAPI al formato estándar
    return {
      id: apiResponse.id,
      name: apiResponse.name,
      height: apiResponse.height,
      weight: apiResponse.weight,
      types: apiResponse.types.map((type) => type.type.name), // Aseguramos que exista un tipo
      moves: apiResponse.abilities.map((ability) => ability.ability.name),
    };
  }
}
