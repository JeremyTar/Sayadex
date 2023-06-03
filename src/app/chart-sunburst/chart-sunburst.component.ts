import { Component, Input } from '@angular/core';
import Sunburst from 'sunburst-chart';
import { PokeMove, SunburstData, SunburstTypeClass, SunburstDataValueAttack } from '../pokeClass';

@Component({
  selector: 'app-chart-sunburst',
  templateUrl: './chart-sunburst.component.html',
  styleUrls: ['./chart-sunburst.component.scss']
})

export class ChartSunburstComponent {
  @Input() moves!: PokeMove[];
  public sunburstLoaded: Boolean = false
  public sunburstData: SunburstData = new SunburstData
  private elementsType: string[] = []


  async ngOnInit() {
    await this.initChart()
  }
  async initChart() {
    for (let i = 0; i < this.moves.length; i++) {
      if(i == this.moves.length - 1) {
        this.sunburstLoaded = true
        await this.getMoveDescription(this.moves[i], true)
      } else {
        await this.getMoveDescription(this.moves[i], false)
      }
    }
  }
  async makeChart() {
    const div = document.getElementById('sunburst') as HTMLElement
    const myChart = Sunburst();
    myChart
      .data(this.sunburstData)
      .width(350)
      .height(350)
      .excludeRoot(true)
      .centerRadius(0.5)
      (div)
  }
  async getMoveDescription(mouv: PokeMove, loaded: boolean) {
    console.log("fetch")
    fetch(mouv.move.url)
      .then(res => res.json())
      .then((data) => {
        const type: any = data.type.name
        const damageClass: string = data.damage_class.name

        const mouvSunburts: SunburstDataValueAttack = {
          name: mouv.move.name,
          value: 1,
        }
      this.VerifyPresenceType(type)
      this.addMouvInData(type, damageClass, mouvSunburts)
      if(loaded == true) {
        this.makeChart()
      }      
      })
  }
  async VerifyPresenceType(type: string) {
    let addType = true
    for(let i = 0; i < this.elementsType.length; i++) {
      if(type == this.elementsType[i]) {
        addType = false
      }
    }
    if(addType) {
      this.elementsType.push(type)
      const newType: SunburstTypeClass = {
        name: type,
        value: 0,
        children: [
          {
            name: "Special",
            value: 0,
            children: []
          },
          {
            name: "Physical",
            value: 0,
            children: []
          },
          {
            name: "Status",
            value: 0,
            children: []
          }
        ]
      }
      this.sunburstData.children.push(newType)   
      console.log("j'ajoute")   
    }
  }
  async addMouvInData(type: string, damageClass: string, mouvSunburts: SunburstDataValueAttack) {
    for(let i = 0; i < this.sunburstData.children.length; i++) {
      if(this.sunburstData.children[i].name == type) {
        switch (damageClass) {
          case "special" :
            this.sunburstData.children[i].children[0].value += 1
            this.sunburstData.children[i].children[0].children?.push(mouvSunburts)
            break
          case "physical" : 
            this.sunburstData.children[i].children[1].value += 1
            this.sunburstData.children[i].children[1].children?.push(mouvSunburts)
            break
          case "status" : {
            this.sunburstData.children[i].children[2].value += 1
            this.sunburstData.children[i].children[2].children?.push(mouvSunburts)
          }
        }
        this.sunburstData.children[i].value += 1
      }
    }
  }
}
