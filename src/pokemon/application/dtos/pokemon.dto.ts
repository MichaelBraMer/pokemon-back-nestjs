import { ApiProperty } from "@nestjs/swagger";

export class CreatePokemonDTO {
  @ApiProperty({example: 1})
  readonly id: number;

  @ApiProperty({example: "Bulbasour"})
  readonly name: string;

  @ApiProperty({example: ["Planta", "Veneno"]})
  readonly types: string[];

  @ApiProperty({example: ["Latigo sepa", "Golpe roca"]})
  readonly moves?: string[];

  @ApiProperty({example: 7})
  readonly weight?: number;

  @ApiProperty({example: 1})
  readonly height?: number;
}

export class UpdatePokemonDTO {
  @ApiProperty({example: "Bulbasour"})
  readonly name: string;

  @ApiProperty({example: ["Planta", "Veneno"]})
  readonly types: string[];

  @ApiProperty({example: ["Latigo sepa", "Golpe roca"]})
  readonly moves?: string[];

  @ApiProperty({example: 7})
  readonly weight?: number;

  @ApiProperty({example: 1})
  readonly height?: number;
}