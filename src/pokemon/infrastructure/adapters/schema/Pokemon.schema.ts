import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
    @Prop({required: true})
    id: number

    @Prop({required: true})
    name: string

    @Prop({required: true})
    height: number

    @Prop({required: true})
    weight: number

    @Prop({required: true})
    types: string[]

    @Prop({required: true})
    moves: string[]
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
