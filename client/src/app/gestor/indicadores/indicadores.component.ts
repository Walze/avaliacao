import { Component, OnInit, ApplicationRef } from '@angular/core'
import { LaravelService } from '../../laravel.service'
import { ActivatedRoute } from '@angular/router'
import { Competencia } from '../competencia'
import { Indicador } from './indicador'
import { log } from 'util';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
  //cargo_comp_peso: any;
  loading = true
  public id: number

  public comps: Competencia[]
  public comp: Competencia = { nome: '', descricao: '' }

  private _indicadoresOrig: Indicador[]
  public indicadores: Indicador[]

  public cargos

  private ind_comps = []
  private ind_cargos = []

  newInd = {
    ind: '',
    cargos: [],
    comp: 0
  }

  showCurrent: boolean = true
  sort_word
  constructor(
    private lara: LaravelService,
    private route: ActivatedRoute,
    private app: ApplicationRef
  ) {
    this.lara.all('form').then((res: any) => {
      let data = res.json()
      this.cargos = data.cargos

      this.lara.all('ind_rels')
        .then((res: any) => {
          this.ind_comps = res.json().ind_comps
          this.ind_cargos = res.json().ind_cargos
          this._getDataFromParams()
        })
    })

    window['dis'] = this
  }

  search(word) {
    this.showHereOnly(null, () => {
      this.indicadores = this.indicadores.filter(ind =>
        Object.keys(ind)
          .some(k => (String(ind[k]).toLowerCase().indexOf(word) != -1))
      )
      this.app.tick()
    })
  }

  showHereOnly(e = null, then: any = false) {
    console.log(e, this.showCurrent)
    if (e !== null) this.showCurrent = e.target.checked
    if (this.showCurrent) {
      const whiteList = []

      this.ind_comps.map(i => {
        if (i.comp_id == this.id) whiteList.push(i.indicador_id)
      })
      this.indicadores = []
      this.indicadores = this._indicadoresOrig.filter(i => whiteList.includes(i.id))

    } else {
      this.indicadores = this._indicadoresOrig
      console.log(this._indicadoresOrig)
    }

    if (then) then()
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
    let toggle: Array<HTMLElement> = e.closest('.list-group-item').querySelectorAll('.toggle')
    let toggleTarget: HTMLElement = e.closest('.list-group-item')

    if ((toggleTarget.id != 'indID' || e.type == 'keyup') && e.id != 'delete-ind') {
      if (!Boolean(edits.style.height)) edits.style.height = '0'

      edits.style.height = '0px'
      toggle[1].style.display = 'block'
      toggle[0].style.display = 'none'
    }

  }

  saveIndNome(ind) {
    this.lara.post(ind, `ind/${ind.id}`)
  }

  deletarInd(e, ind) {
    if (confirm('Deseja Realmente Apagar?')) {
      this.lara.delete(ind.id, 'delind/', '', () => {
        this.indicadores = this.indicadores.filter(i => i.id != ind.id)
        this._indicadoresOrig = this._indicadoresOrig.filter(i => i.id != ind.id)
      })
    }
  }

  private _addComp(then: any = false) {
    this.indicadores = this._indicadoresOrig.map(i => {
      let comp = this.ind_comps.filter(ic => ic.indicador_id == i.id)[0]

      if (comp) i.comp_id = comp.comp_id
      else i.comp_id = 0

      return i
    })
    this._indicadoresOrig = this.indicadores
    if (then) then()
  }

  private _addCargos(then: any = false) {
    this.indicadores = this._indicadoresOrig.map(i => {
      i.cargo_id = this.ind_cargos
        .filter(ic => ic.indicador_id == i.id)
        .map(i => i.cargo_id)

      return i
    })
    this._indicadoresOrig = this.indicadores
    if (then) then()
  }

  check(comp, ind) {
    return this.ind_comps.some(el => el.comp_id == comp.id && el.indicador_id == ind.id)
  }

  alterarComp() {
    this.lara.post(this.comp, 'comp/' + this.id, '', () => alert('Alterado'))
  }

  deletarComp() {
    if (confirm('Deseja Realmente Apagar?'))
      this.lara.delete(this.comp.id, 'comp/', '/gestor')
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

  saveNewInd() {
    const indicador = this.newInd.ind,
      comp_id = Number(this.newInd.comp),
      ind_cargos = this.newInd.cargos
        .map((cargo, index) => index)
        .join('').split('')
        .map(i => Number(i)),
      data = {
        indicador,
        comp_id,
        ind_cargos
      }


    this.lara.post(data, 'ind', '', res => {
      window.location.reload()
    })
  }

  ngOnInit() {
    this.lara.sessionChecker()
    this.lara.adminOnly()
  }

  private _renderList(cb: any = false) {
    this._addComp(() =>
      this._addCargos(() =>
        this.showHereOnly(null, () => {
          if (cb) cb()
          this.loading = false
        })
      )
    )
  }

  private _getDataFromParams() {
    this.route.params.subscribe(params => {
      this.id = params.id

      this.lara.getIndsComp(this.id)
        .then((res: Response) => {
          let data: any = res.json()
          this.comp = data.competencia
          this.comp.id = params.id
          this.comps = data.comps
          // Ordem Alfabetica
          this._indicadoresOrig = data.indicadores
            .sort((a, b) => {
              if (a.nome < b.nome) return -1
              else if (a.nome > b.nome) return 1
              return 0
            })

          this._renderList()
        })
    })
  }

}
