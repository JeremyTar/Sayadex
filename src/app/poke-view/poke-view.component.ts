import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonClass, Abilitie, Type, PokemonType, Sensibility, Resistance, TableStat, PokeStat, PokeAbilitie, AbilitieInfo, PokeMove } from "../pokeClass"

import { faStar } from '@fortawesome/free-regular-svg-icons'
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
  tableOfStat: TableStat = new TableStat();
  averageOfStat: TableStat = new TableStat()
  abilitieShow: string | null = null;

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

    this.averageOfStat.hp.base_stat = 74;
    this.averageOfStat.defense.base_stat = 76.5;
    this.averageOfStat.specialDefense.base_stat = 72;
    this.averageOfStat.speed.base_stat = 75;
    this.averageOfStat.specialAttack.base_stat = 76;
    this.averageOfStat.attack.base_stat = 82.5;

    await this.getType()
    await this.getPokemonInfo(this.id)
    await this.calculateAdvantageTypes(this.pokemonInfo)
    await this.getAbilitiesDescription(this.pokemonInfo.abilities)
    this.showTableTypes(this.pokemonSensibility)

    let abilitiesElement = document.querySelectorAll(".pokeView_pokeInfo_talents_talent p")
    abilitiesElement.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const show:any = el.getAttribute("id")
        this.showAbilitie(show)
      })
    })

  }
  showAbilitie(abilitie: string) {
    const containt = document.querySelector(".pokeView_pokeInfo_talents_containt")
    if(containt?.childNodes) {
      let child = containt.childNodes
      child.forEach(el => {
        containt.removeChild(el)
      })
    }
    for( const i in this.pokemonInfo.abilities) {
      if(abilitie == this.pokemonInfo.abilities[i].name) {
        let p = document.createElement("p")
        p.innerText = this.pokemonInfo.abilities[i].description
        containt?.append(p)
      }
    }
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
  async getStat(el: PokeStat) {
    switch (el.stat.name) {
      case "attack" :
        this.tableOfStat.attack.base_stat = el.base_stat
        this.tableOfStat.attack.stat.url = el.stat.url
        break
      case "special-attack":
        this.tableOfStat.specialAttack.base_stat = el.base_stat
        this.tableOfStat.specialAttack.stat.url = el.stat.url
        break
      case "hp":
        this.tableOfStat.hp.base_stat = el.base_stat
        this.tableOfStat.hp.stat.url = el.stat.url
        break
      case "defense":
        this.tableOfStat.defense.base_stat = el.base_stat
        this.tableOfStat.defense.stat.url = el.stat.url
        break
      case "special-defense":
        this.tableOfStat.specialDefense.base_stat = el.base_stat
        this.tableOfStat.specialDefense.stat.url = el.stat.url
        break
      case "speed":
        this.tableOfStat.speed.base_stat = el.base_stat
        this.tableOfStat.speed.stat.url = el.stat.url
        break
    }
  }
  async getAbilitiesDescription(abilitie: PokeAbilitie[]) {
    for(let i: number = 0; i < abilitie.length; i++) {
      const url = abilitie[i].url
      await fetch(url)
        .then(res => res.json())
        .then((data) => {
          data.effect_entries.forEach((el: AbilitieInfo) => {
            if(el.language.name == "en") {
              abilitie[i].description = el.effect
            }
          })
          // 
        })
    }
  }
  async getPokemonInfo(id: number) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        let types: string[] = []
        data.types.forEach((el: PokemonType) => {
          types.push(el.type.name)
        });

        let abilities: PokeAbilitie[] = []
        data.abilities.forEach((el: Abilitie) => {
          const abilitie = new PokeAbilitie(el.ability.name, el.ability.url)
          abilities.push(abilitie)
        })

        data.stats.forEach((el: PokeStat) => {
          this.getStat(el)
        })

        let height: number = data.height * 0.1
        let roundedHeight = height.toFixed(1)

        let weight: number = data.weight * 0.1
        let roundedWeight = weight.toFixed(1)

        let moves: PokeMove[] = []
        data.moves.forEach((el: PokeMove) => {
          let move: PokeMove = {
            move: {
              name: '',
              url: ''
            },
            version_group_details: []
          };
          move.move.name = el.move.name,
          move.move.url = el.move.url
          moves.push(move)
        })
        let pokemon = new PokemonClass(
          data.id,
          data.name,
          types,
          abilities,
          roundedHeight,
          roundedWeight,
          this.tableOfStat,
          moves
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
