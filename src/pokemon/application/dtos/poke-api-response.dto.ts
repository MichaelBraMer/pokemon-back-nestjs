import { IsString, IsArray, IsOptional, IsInt, Min, isNumber } from 'class-validator';

export class PokemonApiResponseDTO {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  weight: number;

  @IsInt()
  height: number;

  @IsArray()
  types: string[];

  @IsArray()
  moves: string[];
}
