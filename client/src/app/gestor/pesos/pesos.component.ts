import { Component, ElementRef } from '@angular/core';
import { LaravelService } from '../../laravel.service';
import { Competencia } from '../competencia';

@Component({
  selector: 'app-pesos',
  templateUrl: './pesos.component.html',
  styleUrls: ['./pesos.component.css']
})

export class PesosComponent {

  public competencias: Competencia[]
  public cargos: Array<{}>
  public relacoes = []

  public counter = 0
  public total

  public loading = true

  private _firedOnce = false

  constructor(private lara: LaravelService, private el: ElementRef) {
    window['dis'] = this
    this._getData().then(() => this._start())
  }

  private _getData() {
    return new Promise(then => {
      this.lara.all('comp').then((data: any) => {
        this.competencias = data.json().competencias
        this.cargos = data.json().cargos

        this.total = this.competencias.length * this.cargos.length
        this.lara.all('cargo_comp_peso').then((data: any) => {
          this.relacoes = data.json()
          then()
        })
      })
    })
  }

  _start() {
    if (!this._firedOnce) {
      const els = this.el.nativeElement.querySelectorAll('.peso-input')
      console.log(els)
      if (els.length && this.counter <= 0) {
        this._firedOnce = true
        console.log(els, this.counter)
        els.forEach((el: HTMLInputElement, index) => {
          this.counter++

          if (this.counter >= this.total) this.loading = false

          const comp_id = Number(el.dataset.peso.split('&')[0])
          const cargo_id = Number(el.dataset.peso.split('&')[1])

          el.value = this.getPesoValue(comp_id, cargo_id)
        })
      }
    }
  }
  getPesoValue(comp, cargo) {
    let found: any = false

    found = this.relacoes.find(el => el.comp_id == comp && el.cargo_id == cargo)

    if (found) return found.peso
    else return null
  }
  ngAfterViewChecked() {
  }



}
