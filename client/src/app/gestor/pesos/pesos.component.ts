import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LaravelService } from '../../laravel.service';

@Component({
  selector: 'app-pesos',
  templateUrl: './pesos.component.html',
  styleUrls: ['./pesos.component.css']
})

export class PesosComponent implements OnInit, AfterViewInit {

  public competencias
  public cargos
  public relacoes

  public loading = true

  constructor(private lara: LaravelService) {
    lara.all('comp').then((data: any) => {
      this.competencias = data.json().competencias
      this.cargos = data.json().cargos
    })
    window['dis'] = this
  }

  getPesoValue(comp, cargo) {
    let found: any = false

    if (typeof this.relacoes != 'undefined' && this.relacoes)
      found = this.relacoes.find(el => el.comp_id == comp && el.cargo_id == cargo)
    else
      this.lara.all('cargo_comp_peso').then((data: any) => {
        this.relacoes = data.json()
        found = data.json().find(el => el.comp_id == comp && el.cargo_id == cargo)
      })

    if (found) return found.peso
    else return null
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loading = false
  }

}
