import { Component, OnChanges, ApplicationRef, Input } from '@angular/core';
import { Competencia } from '../../competencia';
import { Indicador } from '../indicador';
import { LaravelService } from '../../../laravel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lista-indicadores',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnChanges {
  @Input() public id: number

  @Input() public comps: Competencia[]

  @Input() INDICADORES: Indicador[]
  public indicadores: Indicador[]

  @Input() public cargos
  @Input() private ind_comps = []
  @Input() private ind_cargos = []

  placeHolder: any

  constructor(
    private lara: LaravelService,
    private route: ActivatedRoute,
    private app: ApplicationRef
  ) {

    window['dis'] = this
  }

  ngOnChanges(log) {
    if (this.INDICADORES && 'INDICADORES' in log) {
      this.indicadores = this.INDICADORES

      this._addCargos()
      this._addComp()
    }

    this.lara.sessionChecker()
    this.lara.adminOnly()
  }

  search(word) {
    this.indicadores = this.INDICADORES.filter(ind =>
      Object.keys(ind)
        .some(k => (String(ind[k]).toLowerCase().indexOf(word) != -1))
    )
    this.app.tick()
  }

  openInds(e, ind) {
    if (e.target.nodeName == 'BUTTON') return false

    let edits: HTMLElement = e.target.closest('.list-group-item').querySelector('.edits')
    let toggle: Array<HTMLElement> = e.target.closest('.list-group-item').querySelectorAll('.toggle')
    let toggleTarget: HTMLElement = e.target

    if ((toggleTarget.id != 'indID' || e.type == 'keyup') && e.target.id != 'delete-ind') {
      if (!Boolean(edits.style.height)) edits.style.height = '0'

      edits.style.height = '100%'
      toggle[0].style.display = 'block'
      toggle[1].style.display = 'none'
    }
  }

  closeInds(e) {
    let edits: HTMLElement = e.closest('.list-group-item').querySelector('.edits')
    let toggleInput: Array<HTMLElement> = e.closest('.list-group-item').querySelectorAll('.toggle')
    let toggleTarget: HTMLElement = e.closest('.list-group-item')

    if ((toggleTarget.id != 'indID' || e.type == 'keyup') && e.id != 'delete-ind') {
      if (!Boolean(edits.style.height)) edits.style.height = '0'

      edits.style.height = '0px'
      toggleInput[1].style.display = 'block'
      toggleInput[0].style.display = 'none'
    }

  }

  saveIndNome(ind) {
    this.lara.post(ind, `ind/${ind.id}`, '', false, true)
  }

  deletarInd(e, ind) {
    if (confirm('Deseja Realmente Apagar?'))
      this.lara.delete(ind.id, 'delind/', '', () => {
        this.indicadores = this.indicadores.filter(i => i.id != ind.id)
        this.INDICADORES = this.INDICADORES.filter(i => i.id != ind.id)
      })
  }

  private _addComp(then: any = false) {
    this.indicadores = this.INDICADORES.map(i => {
      let comp = this.ind_comps.filter(ic => ic.indicador_id == i.id)[0]

      if (comp) i.comp_id = comp.comp_id
      else i.comp_id = 0

      return i
    })
    this.INDICADORES = this.indicadores
    if (then) then()
  }

  private _addCargos(then: any = false) {
    this.indicadores = this.INDICADORES.map(i => {
      i.cargo_id = this.ind_cargos
        .filter(ic => ic.indicador_id == i.id)
        .map(i => i.cargo_id)

      return i
    })
    this.INDICADORES = this.indicadores
    if (then) then()
  }

  check(comp, ind) {
    return this.ind_comps.some(el => el.comp_id == comp.id && el.indicador_id == ind.id)
  }

  handleRadio(ind, comp) {
    const indi = this.ind_comps.find(i => i.indicador_id == ind)
    if (indi) indi.comp_id = comp

    let postData = {
      indicador_id: Number(ind),
      comp_id: Number(comp),
    }

    this.lara.post(postData, 'ind_comp')
  }

  handleCheck(ind, cargo, checked) {
    const postData = {
      indicador_id: Number(ind),
      cargo_id: Number(cargo),
      checked
    }
    const indi = this.ind_cargos
      .find(i => i.indicador_id == ind && i.cargo_id == cargo)

    if (!indi) this.ind_cargos.push(postData)

    this.lara.post(postData, 'ind_cargo', '', false, true)
  }

}
