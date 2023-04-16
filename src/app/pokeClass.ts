export class PokemonClass {
    id!: number;
    pokemonName!: string;
    type!: Array<string>;
    abilities!: Array<string>;
    height!: number;
    weight!: number;

    constructor( idPoke: number, pokemonName:string, type: Array<string>, abilities: Array<string>, height: any, weight: any) {
        this.id = idPoke;
        this.pokemonName = pokemonName;
        this. type = type;
        this.abilities = abilities;
        this.height = height;
        this.weight = weight;
    }
}

export interface PokemonType {
    slot: number,
    type: {
      name: string,
      url: string
  }
}

export interface Type {
    name: string,
    url: string,
}

export interface TypeDetails {
  
}
export interface Abilitie {
    ability: {
        secret: boolean,
        name: string,
        url: string,
    },
    is_hidden: boolean,
    slot: number,
  }

export interface PokeStatisque {
  name: string,
  value: string,
}