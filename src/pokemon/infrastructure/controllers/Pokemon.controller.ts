import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpException,
    HttpStatus,
    Res,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger'; 
  import { CreatePokemonDTO, UpdatePokemonDTO } from '../../application/dtos/pokemon.dto';
  import { CreatePokemonService } from 'src/pokemon/application/use-cases/create-pokemon/create-pokemon.service';
  import { DeletePokemonService } from 'src/pokemon/application/use-cases/delete-pokemon/delete-pokemon.service';
  import { GetAllPokemonService } from 'src/pokemon/application/use-cases/get-all-pokemon/get-all-pokemon.service';
  import { GetPokemonByIdService } from 'src/pokemon/application/use-cases/get-pokemon-by-id/get-pokemon-by-id.service';
  import { UpdatePokemonService } from 'src/pokemon/application/use-cases/update-pokemon/update-pokemon.service';
  import { FetchAndCreatePokemonService } from 'src/pokemon/application/use-cases/fetch-and-create-pokemon/fetch-and-create-pokemon.service';

  @Controller('pokemon')
  @ApiTags('Pokemon')

  export class PokemonController {
    constructor(
      private readonly createPokemonService: CreatePokemonService,
      private readonly deletePokemonService: DeletePokemonService,
      private readonly getAllPokemonService: GetAllPokemonService,
      private readonly getPokemonByIdService: GetPokemonByIdService,
      private readonly updatePokemonService: UpdatePokemonService,
      private readonly fetchAndCreatePokemonService: FetchAndCreatePokemonService,
    ) {}
  
    /**
     * Endpoint para obtener todos los Pokémon.
     * @returns Una lista de todos los Pokémon.
     */
    @Get()
    async findAll(@Res() request) {
      const pokemons = await this.getAllPokemonService.handler();
      return request.status(HttpStatus.OK).json(pokemons);
    }
  
    /**
     * Endpoint para obtener un Pokémon por su ID.
     * @param id - El ID del Pokémon.
     * @returns El Pokémon encontrado.
     */
    @Get(':id')
    async findById(@Res() request, @Param('id') id: number) {
      try {
        const pokemon = await this.getPokemonByIdService.handler(id);
        return request.status(HttpStatus.OK).json(pokemon);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  
    /**
     * Endpoint para crear un nuevo Pokémon.
     * @param createPokemonDto - Los datos del Pokémon a crear.
     * @returns El Pokémon creado.
     */
    @Post()
    async create(@Res() request, @Body() createPokemonDto: CreatePokemonDTO) {
      try {
        const pokemon = await this.createPokemonService.handler(createPokemonDto);
        return request.status(HttpStatus.OK).json(pokemon);
      } catch (error) {
        throw new HttpException('Error creating Pokémon', HttpStatus.BAD_REQUEST);
      }
    }
  
    /**
     * Endpoint para actualizar un Pokémon por su ID.
     * @param id - El ID del Pokémon.
     * @param updatePokemonDto - Los datos actualizados del Pokémon.
     * @returns El Pokémon actualizado.
     */
    @Put(':id')
    async update(@Res() request, @Param('id') id: number, @Body() updatePokemonDto: UpdatePokemonDTO) {
      try {
        const pokemon = await this.updatePokemonService.handler(id, updatePokemonDto);
        return request.status(HttpStatus.OK).json(pokemon);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  
    /**
     * Endpoint para eliminar un Pokémon por su ID.
     * @param id - El ID del Pokémon a eliminar.
     * @returns `true` si fue eliminado correctamente.
     */
    @Delete(':id')
    async delete(@Res() request, @Param('id') id: number) {
      try {
        const pokemon = await this.deletePokemonService.handler(id);
        return request.status(HttpStatus.OK).json(pokemon);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }

    /**
     * Endpoint para eliminar un Pokémon por su ID.
     * @param id - El ID del Pokémon a eliminar.
     * @returns `true` si fue eliminado correctamente.
     */
    @Post(':name')
    async fetchAndCreate(@Res() request, @Param('name') name: string) {
      try {
        const pokemon = await this.fetchAndCreatePokemonService.handler(name);
        return request.status(HttpStatus.OK).json(pokemon);
      } catch (error) {
        throw new HttpException('Error creating Pokémon', HttpStatus.BAD_REQUEST);
      }
    }
  }
  