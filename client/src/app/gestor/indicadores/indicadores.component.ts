import { Component, OnInit } from '@angular/core'
import { LaravelService } from '../../laravel.service'
import { ActivatedRoute } from '@angular/router'
import { Competencia } from '../competencia'
import { Indicador } from './indicador'

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  public id: number

  public comps: Competencia[]
  public comp: Competencia = { nome: '', descricao: '' }

  private _indicadoresOrig: Indicador[]
  public indicadores: Indicador[]

  public cargos

  private ind_comps = []
  private ind_cargos = []

  public toggle = false

  showCurrent: boolean = true

  constructor(private lara: LaravelService, private route: ActivatedRoute) {
    this.lara.all('ind_rels')
      .then((res: any) => {
        this.ind_comps = res.json().ind_comps
        this.ind_cargos = res.json().ind_cargos
      })

    this.lara.all('form')
      .then((res: any) => {
        let data = res.json()
        this.cargos = data.cargos
      })

    window.dis = this

    this._getDataFromParams()
  }

  showHereOnly(e = null) {
    if (e !== null) this.showCurrent = e.target.checked

    if (this.showCurrent) {
      const whiteList = []

      this.ind_comps.map(i => {
        if (i.comp_id == this.id)
          whiteList.push(i.indicador_id)
      })
      this.indicadores = new Array

      this.indicadores = this._indicadoresOrig.filter(i => whiteList.includes(i.id))

    } else this.indicadores = this._indicadoresOrig
  }

  toggleInds(e: HTMLElement) {
    let edits: HTMLElement = e.closest('.list-group-item').querySelector('.edits')
    let toggle: NodeList = e.closest('.list-group-item').querySelectorAll('.toggle')
    let toggleTarget: HTMLElement = e
    console.log(toggleTarget.id)
    if (toggleTarget.id != 'indID') {
      this.toggle = !this.toggle

      if (!Boolean(edits.style.height)) edits.style.height = '0'

      if (edits.style.height == '0px' || edits.style.height == '')
        edits.style.height = '100%'
      else edits.style.height = '0px'

      if (this.toggle) {
        toggle[0].style.display = 'block'
        toggle[1].style.display = 'none'
      } else {
        toggle[1].style.display = 'block'
        toggle[0].style.display = 'none'
      }
    }

  }

  addComp() {
    this.indicadores = this._indicadoresOrig.map(i => {
      let comp = this.ind_comps.filter(ic => ic.indicador_id == i.id)[0]

      if (comp) i.comp_id = comp.comp_id
      else i.comp_id = 0

      return i
    })
    this._indicadoresOrig = this.indicadores
  }

  addCargos() {
    this.indicadores = this._indicadoresOrig.map(i => {
      i.cargo_id = this.ind_cargos
        .filter(ic => ic.indicador_id == i.id)
        .map(i => i.cargo_id)

      return i
    })
    this._indicadoresOrig = this.indicadores
  }

  alterarComp() {

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

    this.lara.post(postData, 'ind_cargo')
  }

  ngOnInit() {
  }

  private _getDataFromParams() {
    this.route.params
      .subscribe(params => {
        this.id = params.id
        this.lara
          .getIndsComp(this.id)
          .then((res: Response) => {
            let data: any = res.json()
            this.comp = data.competencia
            this.comps = data.comps
            // Ordem Alfabetica
            this._indicadoresOrig = data.indicadores
              .sort((a, b) => {
                if (a.nome < b.nome) return -1
                else if (a.nome > b.nome) return 1
                return 0
              })
            this.addComp()
            this.addCargos()
            this.showHereOnly()
          })
      })
  }

}
