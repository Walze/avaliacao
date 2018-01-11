import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Competencias } from '../avaliar/AvalComps'
import { Estagiario } from '../estagiario'
import { LaravelService } from '../../laravel.service'

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit, AfterViewInit {

  public _ids = {
    estag: 0,
    aval: 0
  }

  public estagiario: Estagiario = {
    id: 0,
    nome: '',
    admissao: '',
    nivel_id: 0,
    cargo_id: 0,
    localidade_id: 0,
    setor_id: 0
  }

  public avaliacao: Competencias[]

  public resultadoInputs: object[] = []
  public medias: object[] = []
  public NotaFinal: number = 0
  public carregando = true

  constructor(
    private lara: LaravelService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {
  }

  private _getRouteParamsData(then) {
    this.route.params.subscribe(params => {
      this._ids.estag = params.estagiario_id
      this._ids.aval = params.aval_id

      this.lara.show('estagiario', this._ids.estag).subscribe(res => {
        const data = res.json()
        if (!data.avaliado || typeof data.avaliado == 'number') data.avaliado = false
        this.estagiario = data.estagiario

        this.lara.show('avaliacao', this.estagiario.cargo_id).subscribe(res => {
          this.avaliacao = res.json()

          this.lara.show('notas', this._ids.aval).subscribe(res => {
            this.resultadoInputs = res.json()
            this.carregando = false

            then()
          })
        })
      })

    })
  }

  private _atualizarMedias(comp_id, ind_id) {
    // filtrar todos os resultados por comp
    const found: any = this.resultadoInputs.filter((el: any) => el.comp_id == comp_id)

    //tirando media deles
    const media = found.reduce((prev, curr) => (prev + curr.nota), 0) / found.length

    // select no ID do elemento da comp e atribuindo valor
    const mediaElement = this.el.nativeElement.querySelector(`#media-comp-${comp_id} span`)
    mediaElement.innerHTML = media

    // salva media num array
    let mediaFound: any = this.medias.find((el: any) => el.comp_id == comp_id)
    if (!mediaFound)
      this.medias.push({
        media: Number(media),
        comp_id,
        ind_id
      })
    else mediaFound.media = Number(media)

    this._atualizarNotaFinal()
  }

  private _atualizarTodasMedias() {
    // Pegar todos os comds e inds
    const inputs = this.el.nativeElement.querySelectorAll('[data-indComp]')

    inputs.forEach(el => {
      const comp = el.dataset.indcomp.split('&')[0]
      const ind = el.dataset.indcomp.split('&')[1]

      this._atualizarMedias(comp, ind)
    })
  }

  private _atualizarNotaFinal() {
    const pesosSoma = this.resultadoInputs.reduce((prev, curr: any) => prev + curr.peso, 0)

    // media ponderada
    let pond = this.resultadoInputs
      .reduce((prev, curr: any) => prev + (curr.nota * curr.peso), 0) / pesosSoma

    this.NotaFinal = Math.round(pond * 100) / 100
  }

  private _atualizarResults() {
    const selects = Array.apply(null, this.el.nativeElement.querySelectorAll('.custom-select.nota'))
    this.resultadoInputs.map((resInput: any) => {
      selects.map(select => {
        if (select.id.split('-')[1] == resInput.ind_id)
          select.value = resInput.nota
      })
    })
  }

  public criarResult(e, comp_id, ind_id, peso) {
    let found: any = this.resultadoInputs.find((el: any) => el.ind_id == ind_id)

    if (!found)
      this.resultadoInputs.push({
        nota: Number(e.target.value),
        comp_id,
        aval_id: Number(this._ids.aval),
        ind_id,
        peso
      })
    else
      found.nota = Number(e.target.value)


    this._atualizarMedias(comp_id, ind_id)
  }

  public salvarResult() {
    const selects: Array<any> = Array.apply(null, this.el.nativeElement.querySelectorAll('.custom-select.nota'))

    if (selects.some(sel => sel.value != 0)) {


      let aval = {
        id: this._ids.aval,
        gestor_id: this.lara.User.id,
        estagiario_id: this.estagiario.id,
        media: this.NotaFinal,
        data: new Date()
      }


      let dados = {
        aval,
        notas: this.resultadoInputs
      }

      this.lara.post(dados, 'EditAval', `/estagiario/${this.estagiario.id}`, res => {
      })
    } else
      alert('Dê uma nota para todos os indicadores.')

  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

  ngAfterViewInit() {
    this._getRouteParamsData(() => {
      this._atualizarNotaFinal()
      this._atualizarResults()
      this._atualizarTodasMedias()
    })
  }
}
