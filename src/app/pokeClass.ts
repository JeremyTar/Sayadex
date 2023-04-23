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

export interface Sensibility {
  indice: number,
  elements: string[]
  name: string
}

export class SensibiltyClass {
  bug: Sensibility = {
    name: "bug",
    indice: 0,
    elements: []
  };
  dark: Sensibility = {
    name: "dark",  
    indice: 0,
      elements: []
  };
  dragon: Sensibility = {
    name: "dragon",
    indice: 0,
    elements: []
  };
  electric: Sensibility = {
    name: "electric",
    indice: 0,
    elements: []
  };
  fairy: Sensibility = {
    name: "fairy",
    indice: 0,
    elements: []
  };
  fighting: Sensibility = {
    name: "fighting",
    indice: 0,
    elements: []
  };
  fire: Sensibility = {
    name: "fire",
    indice: 0,
    elements: []
  };
  flying: Sensibility = {
    name: "flying",
    indice: 0,
    elements: []
  };
  ghost: Sensibility = {
    name: "ghost",
    indice: 0,
    elements: []
  };
  grass: Sensibility = {
    name: "grass",
    indice: 0,
    elements: []
  };
  ground: Sensibility = {
    name: "ground",
    indice: 0,
    elements: []
  };
  ice: Sensibility = {
    name: "ice",
    indice: 0,
    elements: []
  };
  normal: Sensibility = {
    name: "normal",
    indice: 0,
    elements: []
  };
  poison: Sensibility = {
    name: "poison",
    indice: 0,
    elements: []
  };
  psychic: Sensibility = {
    name: "psychic",
    indice: 0,
    elements: []
  };
  rock: Sensibility = {
    name: "rock",
    indice: 0,
    elements: []
  };
  steel: Sensibility = {
    name: "steel",
    indice: 0,
    elements: []
  };
  water: Sensibility = {
    name: "water",
    indice: 0,
    elements: []
  };
}

export interface Resistance {
  name: string;
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