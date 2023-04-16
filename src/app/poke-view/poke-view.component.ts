import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonClass, Abilitie, Type, PokemonType } from "../pokeClass"

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
    await this.getPokemonInfo(this.id)
    await this.getType()
    await this.calculateAdvantageTypes(this.pokemonInfo)
    
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
    console.log(pokemon.type)
    const myTypes:string[] = pokemon.type
    for(const i in myTypes) {
      await fetch(`https://pokeapi.co/api/v2/type/${myTypes[i]}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
    }
  }
}
