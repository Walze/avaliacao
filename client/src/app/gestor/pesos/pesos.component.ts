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

  private _getInputs(what, then, done: any = false) {
    const els = this.el.nativeElement.querySelectorAll(`[data-${what}]`)

    els.forEach((el: HTMLInputElement) => {
      const comp_id = Number(el.dataset[what].split('&')[0])
      const cargo_id = Number(el.dataset[what].split('&')[1])

      then(el, comp_id, cargo_id)
    })

    if (done) done()
  }

  private _getPesoValue(comp, cargo) {
    let found = this.relacoes.find(el => el.comp_id == comp && el.cargo_id == cargo)

    if (found) return found.peso
    else return false
  }

  private _displayData() {
    this._getData().then(() => {
      this._getInputs('peso', (input, comp, cargo) => input.value = this._getPesoValue(comp, cargo))
      this._getInputs('check', (input, comp, cargo) => {
        if (this._getPesoValue(comp, cargo)) input.checked = true
      })
      this.loading = false
    })
  }

  public post(cargo) {
    const data = []

    this._getInputs('peso', (input, comp_id, cargo_id) => {
      if (cargo_id == cargo) {

        let checkboxInput = this.el.nativeElement.querySelector(`[data-check='${comp_id}&${cargo_id}']`)

        if (checkboxInput.checked && input.value)
          data.push({
            peso: input.value,
            comp_id,
            cargo_id
          })
        else if (checkboxInput.checked != input.value) { }
        //alert('Você deve marcar a competência e digitar um peso')

      }

    }, () => {
      if (data.length > 0)
        this.lara.post(data, `cargo_comp_peso/${cargo}`, '', e => {
          alert('Salvo!')
        })

      console.log(data)
    })
  }
}
