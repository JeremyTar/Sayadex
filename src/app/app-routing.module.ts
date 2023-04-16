import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokeViewComponent } from "./poke-view/poke-view.component"
import { HomeComponent } from "./home/home.component"


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "focus", component: PokeViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
