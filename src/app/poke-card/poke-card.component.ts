import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],

})
export class PokeCardComponent {
  constructor(private route: Router) {}

  @Input() pokemon!: any;

  name!: string;
  imageSrc!: string;
  alt!: string;
  id!: number;

  // url: string = this.pokemon.url
  // name: string = this.pokemon.name

  async ngOnInit() {
    await fetch(this.pokemon)
      .then(response => response.json())
      .then(data => {
        this.imageSrc = data.sprites.front_default
        this.name = data.name
        this.id = data.id
    })
  }
  routeToPokemonPage(id: number) {
    this.route.navigate([`/focus/?${this.id}`])
  }
}
