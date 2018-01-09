import { Component, OnInit, ApplicationRef } from '@angular/core'
import { LaravelService } from '../../laravel.service'
import { ActivatedRoute } from '@angular/router'
import { Competencia } from '../competencia'
import { Indicador } from './indicador'
import { ListaComponent } from './lista/lista.component';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {
  loading = true
  public id: number

  public comps: Competencia[]
  public comp: Competencia = { nome: '', descricao: '' }

  _indicadoresOrig: Indicador[]
  _thisCompInds: Indicador[]

  public cargos

  public ind_comps = []
  public ind_cargos = []

  newInd = {
    ind: '',
    cargos: [],
    comp: this.id
  }

  thisComp = false

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
  }

  ngOnInit() {
    this.lara.sessionChecker()
    this.lara.adminOnly()
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

  alterarComp() {
    this.lara.post(this.comp, 'comp/' + this.id, '', () => alert('Alterado'))
  }

  deletarComp() {
    if (confirm('Deseja Realmente Apagar?'))
      this.lara.delete(this.comp.id, 'comp/', '/gestor')
  }

  private _renderLista(cb: any = false) {
    this.loading = false
  }

  private _getDataFromParams() {
    this.route.params.subscribe(params => {
      this.id = params.id
      this.newInd.comp = this.id

      this.lara.getIndsComp(this.id).then((res: Response) => {
        let data: any = res.json()
        this.comp = data.competencia
        this.comp.id = params.id
        this.comps = data.comps
        // Ordem Alfabetica
        this._indicadoresOrig = data.indicadores.sort((a, b) => {
          if (a.nome < b.nome) return -1
          else if (a.nome > b.nome) return 1
          return 0
        })

        const whiteList = []
        this.ind_comps.map(el => {
          if (el.comp_id == this.id) {
            whiteList.push(el.indicador_id)
          }
        })

        this._thisCompInds = this._indicadoresOrig.filter(el => whiteList.includes(el.id))

        this._renderLista()
      })
    })
  }

}
