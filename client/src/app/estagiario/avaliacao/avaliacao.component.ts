import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competencias } from '../avaliar/AvalComps';
import { Estagiario } from '../estagiario';
import { LaravelService } from '../../laravel.service';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  private ids = {
    estag: 0,
    aval: 0
  }

  public estagiario: Estagiario = {
    id: 0,
    nome: '',
    admissao: '',
    avaliado: false,
    nivel_id: 0,
    cargo_id: 0,
    localidade_id: 0,
    setor_id: 0
  }

  public carregando = true

  public avaliacao: Competencias[]

  public resultadoInputs: object[] = []
  public medias: object[] = []
  public NotaFinal: number = 0

  constructor(
    private lara: LaravelService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {
    this._getRouteParamsData()

    window['dis'] = this
  }

  private _getRouteParamsData() {

    this.route.params.subscribe(params => {
      this.ids.estag = params.estagiario_id
      this.ids.aval = params.aval_id

      this.lara.show('estagiario', this.ids.estag).subscribe(res => {
        const data = res.json()
        if (!data.avaliado || typeof data.avaliado == 'number') data.avaliado = false
        this.estagiario = data.estagiario

        this.lara.show('avaliacao', this.estagiario.cargo_id).subscribe(res => {
          this.carregando = false
          this.avaliacao = res.json()

          this.lara.show('notas', this.ids.aval).subscribe(res => {
            this.resultadoInputs = res.json()
            this.atualizarResults()
            this._atualizarNotaFinal()
          })
        })
      })

    })
  }

  private atualizarMedias(comp_id, ind_id) {
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

  private _atualizarNotaFinal() {
    const pesosSoma = this.resultadoInputs.reduce((prev, curr: any) => prev + curr.peso, 0)

    // media ponderada
    let pond = this.resultadoInputs
      .reduce((prev, curr: any) => prev + (curr.nota * curr.peso), 0) / pesosSoma

    this.NotaFinal = pond
  }

  atualizarResults() {
    const selects = Array.apply(null, this.el.nativeElement.querySelectorAll('.custom-select.nota'))

    this.resultadoInputs.map((i: any) =>
      selects.map(i2 => { if (i2.id.split('-')[1] == i.ind_id) i2.value = i.nota })
    )

  }

  criarResult(e, comp_id, ind_id, peso) {
    let found: any = this.resultadoInputs.find((el: any) => el.ind_id == ind_id)

    if (!found)
      this.resultadoInputs.push({
        nota: Number(e.target.value),
        comp_id,
        aval_id: Number(this.ids.aval),
        ind_id,
        peso
      })
    else
      found.nota = Number(e.target.value)


    this.atualizarMedias(comp_id, ind_id)
  }

  salvarResult() {

    let aval = {
      id: this.ids.aval,
      gestor_id: this.lara.User.id,
      estagiario_id: this.estagiario.id,
      media: this.NotaFinal,
      data: new Date()
    }


    let dados = {
      aval,
      notas: this.resultadoInputs
    }

    console.log(dados)
    // `/estagiario/${this.estagiario.id}`
    this.lara.post(dados, 'EditAval', `/estagiario/${this.estagiario.id}`, res => {
      console.log(res)
    })
  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

}
