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

  public loading = true

  constructor(private lara: LaravelService, private el: ElementRef) {
    window['dis'] = this
    this._displayData()
  }

  private _getData() {
    return new Promise(then => {
      this.lara.all('comp').then((data: any) => {
        this.competencias = data.json().competencias
        this.cargos = data.json().cargos

        this.lara.all('cargo_comp_peso').then((data: any) => {
          this.relacoes = data.json()
          then()
        })
      })
    })
  }

  private _updateInputs(what, then) {
    const els = this.el.nativeElement.querySelectorAll(`[data-${what}]`)

    els.forEach((el: HTMLInputElement) => {
      const comp_id = Number(el.dataset[what].split('&')[0])
      const cargo_id = Number(el.dataset[what].split('&')[1])

      then(el, comp_id, cargo_id)
    })
  }

  private _getPesoValue(comp, cargo) {
    let found = this.relacoes.find(el => el.comp_id == comp && el.cargo_id == cargo)

    if (found) return found.peso
    else return false
  }

  private _displayData() {
    this._getData().then(() => {
      this._updateInputs('peso', (input, comp, cargo) => input.value = this._getPesoValue(comp, cargo))
      this._updateInputs('check', (input, comp, cargo) => {
        if (this._getPesoValue(comp, cargo)) input.checked = true
      })
      this.loading = false
    })
  }
}
