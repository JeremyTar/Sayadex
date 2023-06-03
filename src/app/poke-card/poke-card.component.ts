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

  loaded: boolean = false;

  async ngOnInit() {
    await fetch(this.pokemon)
      .then(response => response.json())
      .then(data => {
        this.imageSrc = data.sprites.front_default
        this.name = data.name
        this.id = data.id
        this.loaded = true
    })
  }
  routeToPokemonPage(id: number) {
    this.route.navigate([`/focus/?${this.id}`])
  }
}
