import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonClass, Abilitie, Type, PokemonType, Sensibility, Resistance } from "../pokeClass"

import { faLifeRing, faStar } from '@fortawesome/free-regular-svg-icons'
import { faWeight, faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-poke-view',
  templateUrl: './poke-view.component.html',
  styleUrls: ['./poke-view.component.scss']
})
export class PokeViewComponent {
  constructor(private route: ActivatedRoute) { }
  pokemonInfo!: PokemonClass;
  pokemonSensibility!: Sensibility[];
  mainImg!: string;
  shinyImg!: string;
  id!: number;
  types!: Type[];

  faStar = faStar
  faSize = faArrowsUpDownLeftRight
  faWeight = faWeight


  showShiny: boolean = false

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })

    this.pokemonSensibility = [
      {
        name: "bug",
        indice: 0,
        elements: []
      },
      {
        name: "dark",
        indice: 0,
        elements: []
      },
      {
        name: "dragon",
        indice: 0,
        elements: []
      },
      {
        name: "electric",
        indice: 0,
        elements: []
      },
      {
        name: "fairy",
        indice: 0,
        elements: []
      },
      {
        name: "fighting",
        indice: 0,
        elements: []
      },
      {
        name: "fire",
        indice: 0,
        elements: []
      },
      {
        name: "flying",
        indice: 0,
        elements: []
      },
      {
        name: "ghost",
        indice: 0,
        elements: []
      },
      {
        name: "grass",
        indice: 0,
        elements: []
      },
      {
        name: "ground",
        indice: 0,
        elements: []
      },
      {
        name: "ice",
        indice: 0,
        elements: []
      },
      {
        name: "normal",
        indice: 0,
        elements: []
      },
      {
        name: "poison",
        indice: 0,
        elements: []
      },
      {
        name: "psychic",
        indice: 0,
        elements: []
      },
      {
        name: "rock",
        indice: 0,
        elements: []
      },
      {
        name: "steel",
        indice: 0,
        elements: []
      },
      {
        name: "water",
        indice: 0,
        elements: []
      }
    ]

    await this.getPokemonInfo(this.id)
    await this.getType()
    await this.calculateAdvantageTypes(this.pokemonInfo)
    this.showTableTypes(this.pokemonSensibility)


  }
  showShinyButton() {
    if (this.showShiny == false) {
      let icone = document.getElementById("showShiny")
      if (icone) {
        icone.style.color = "yellow"
      }
      this.showShiny = true
    } else {
      let icone = document.getElementById("showShiny")
      if (icone) {
        icone.style.color = "black"
      }
      this.showShiny = false
    }
  }
  async getType() {
    await fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => {
        const typesUnsorted = data.results
        typesUnsorted.pop()
        typesUnsorted.pop()
        let types: Type[] = []
        typesUnsorted.forEach((el: Type) => {
          types.push(el)

        })
        this.types = types
      })
  }
  async getPokemonInfo(id: number) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        let types: string[] = []
        data.types.forEach((el: PokemonType) => {
          types.push(el.type.name)
        });
        let abilities: string[] = []
        data.abilities.forEach((el: Abilitie) => {
          abilities.push(el.ability.name)
        })
        let height: number = data.height * 0.1
        let roundedHeight = height.toFixed(1)

        let weight: number = data.weight * 0.1
        let roundedWeight = weight.toFixed(1)
        let pokemon = new PokemonClass(
          data.id,
          data.name,
          types,
          abilities,
          roundedHeight,
          roundedWeight
        )
        this.pokemonInfo = pokemon
        this.mainImg = data.sprites.other['official-artwork'].front_default
        this.shinyImg = data.sprites.other['official-artwork'].front_shiny
      })
  }
  async calculateAdvantageTypes(pokemon: PokemonClass) {
    const myTypes: string[] = pokemon.type
    for (const i in myTypes) {
      await fetch(`https://pokeapi.co/api/v2/type/${myTypes[i]}`)
        .then(response => response.json())
        .then(data => {
          this.calculateResistance(data.damage_relations.half_damage_from, myTypes[i])
          this.calculateWeakness(data.damage_relations.double_damage_from, myTypes[i])
          this.calculateImmunity(data.damage_relations.no_damage_from, myTypes[i])

        })
    }
  }
  calculateResistance(resistance: Resistance[], myType: string) {
    resistance.forEach((element: Resistance) => {
      let name = element.name
      this.pokemonSensibility.forEach((el) => {
        if (el.name == name) {
          el.indice += 1
          el.elements.push(myType)
        }
      })
    });
  }
  calculateWeakness(weakness: Resistance[], myType: string) {
    weakness.forEach((element: Resistance) => {
      let name = element.name
      this.pokemonSensibility.forEach((el) => {
        if (el.name == name) {
          el.indice -= 1
          el.elements.push(myType)
        }
      })
    });
  }
  calculateImmunity(immunity: Resistance[], myType: string) {
    immunity.forEach((element: Resistance) => {
      let name = element.name
      this.pokemonSensibility.forEach((el) => {
        if (el.name == name) {
          el.indice = 99
          el.elements.push(myType)
        }
      })
    });
  }
  showTableTypes(allElements: Sensibility[]) {
    allElements.forEach((el) => {
      let td = document.querySelector(`#${el.name}`)
      if (td) {
        switch (el.indice) {
          case 1:
            td.setAttribute("class", "resistance")
            break
          case 2:
            td.setAttribute("class", "doubleResistance")
            break
          case -1:
            td.setAttribute("class", "faiblesse")
            break
          case -2:
            td.setAttribute("class", "doublefaiblesse")
            break
          case 99:
            td.setAttribute("class", "immunity")
            break
          default:
            break
        }
      }
      if (el.indice != 0) {
        let td = document.querySelector(`#${el.name}`)
        el.elements.forEach((name) => {
          const img = document.createElement('img')
          img.src = `../../assets/types/icone_size/${name}.png`
          img.alt = `${name} type`
          img.style.height = "20px"
          img.style.width = "20px"
          td?.append(img)
        })
      }
    })
  }
}
