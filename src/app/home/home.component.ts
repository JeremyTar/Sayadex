import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title!: string;
  description!: string;
  createDate!: Date;
  snaps!: number;
  baseUrl: string = "https://pokeapi.co/api/v2/";
  pokemons!: Array<any>;

  async ngOnInit() {
    this.title = "Hello"
    await fetch(this.baseUrl + "pokemon?limit=1008&offset=0")
    .then(response => response.json())
    .then(data => {
      this.pokemons = data.results
      console.log(data)
    })
  }
  ViewPokemonRoute(id: number) {
    console.log("say hello pokemon", id) 
  }
}
