import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PokeCardComponent } from './poke-card/poke-card.component';
import { PokeViewComponent } from './poke-view/poke-view.component';
import { FooterComponent } from './footer/footer.component';
import { ChartRadialStatComponent } from './chart-radial-stat/chart-radial-stat.component';
import { ChartBarStatComponent } from './chart-bar-stat/chart-bar-stat.component';
import { ChartSunburstComponent } from './chart-sunburst/chart-sunburst.component';
import { LoaderTypesComponent } from './loader-types/loader-types.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PokeCardComponent,
    PokeViewComponent,
    FooterComponent,
    ChartRadialStatComponent,
    ChartBarStatComponent,
    ChartSunburstComponent,
    LoaderTypesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
