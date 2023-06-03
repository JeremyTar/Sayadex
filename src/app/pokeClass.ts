export class PokemonClass {
    id!: number;
    pokemonName!: string;
    type!: Array<string>;
    abilities!: Array<PokeAbilitie>;
    height!: number;
    weight!: number;
    stat!: TableStat;
    moves!: PokeMove[];

    constructor( idPoke: number, pokemonName:string, type: Array<string>, abilities: Array<PokeAbilitie>, height: any, weight: any, stat: TableStat, moves: PokeMove[] ) {
        this.id = idPoke;
        this.pokemonName = pokemonName;
        this. type = type;
        this.abilities = abilities;
        this.height = height;
        this.weight = weight;
        this.stat = stat;
        this.moves = moves;
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
export interface AbilitieInfo {
  effect: string,
  language: {
    name: string,
  }
}
export class PokeAbilitie {
  name!: string;
  url!: string;
  description!: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
export interface PokeStat {
  base_stat: number,
  stat: {
    name: string,
    url: string,
  }
}
export class TableStat {
  specialAttack: PokeStat = {
    base_stat: 0,
    stat: {
      name: "Spécial attack",
      url: ""
    }
  };
  attack: PokeStat = {
    base_stat: 0,
    stat: {
      name: "Attack",
      url: ""
    }
  };
  hp: PokeStat = {
    base_stat: 0,
    stat: {
      name: "Health points",
      url: ""
    }
  };
  defense: PokeStat = {
    base_stat: 0,
    stat: {
      name: "Defense",
      url: ""
    }
  }
  specialDefense: PokeStat = {
    base_stat: 0,
    stat: {
      name: "Spécial Defense",
      url: ""
    }
  }
  speed: PokeStat = {
    base_stat: 0,
    stat: {
      name: "Speed",
      url: ""
    }
  }
}
export interface datasetChart {
  data: number[],
  backgroundColor: string[] | string,
  borderColor: string[] | string,
}
export interface Move {
  accuracy: number,
  damage_class: {
    name: string,
    url: string,
  },
  type: {
    name: string,
    url: string,
  }
}
export interface PokeMove {
  move: {
    name: string,
    url: string   
  },
  version_group_details: string[]
}

export class SunburstData {
  name: string = "attack"
  children: SunburstTypeClass[] = []
}

export interface SunburstTypeClass {
  name: string 
  value: number
  children: [
    {
      name: "Special",
      value: 0,
      children: SunburstDataValueAttack[]
    },
    {
      name: "Physical",
      value: 0,
      children: SunburstDataValueAttack[]
    },
    {
      name: "Status",
      value: 0,
      children: SunburstDataValueAttack[]
    }
  ]
}

export interface SunburstDataValueDamage {
  name: string
  value: number
  children: SunburstDataValueAttack[]
}

export interface SunburstDataValueAttack {
  name: string,
  value: number
}
