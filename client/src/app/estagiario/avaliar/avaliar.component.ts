import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../../laravel.service';
import { ActivatedRoute } from '@angular/router';
import { Estagiario } from '../estagiario';
import { Competencias } from './AvalComps';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.css']
})

export class AvaliarComponent implements OnInit {

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
  ind_count = 0

  public avaliacao: Competencias[]

  private id

  public resultado: object[] = []
  public medias: object[] = []
  public NotaFinal: number = 0

  constructor(
    private lara: LaravelService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {
    this._getRouteParams()

    window.dis = this
  }

  private _getRouteParams() {
    this.route.params.subscribe(params => {
      this.id = params.id

      this.lara.show('estagiario', this.id).subscribe(res => {
        const data = res.json()
        if (!data.avaliado || typeof data.avaliado == 'number') data.avaliado = false
        this.estagiario = data.estagiario

        this.lara.show('avaliacao', this.estagiario.cargo_id).subscribe(res => {
          this.carregando = false
          this.avaliacao = res.json()
          this.ind_count = 0

          this.avaliacao.map(comp => this.ind_count += comp.ind_count)
        })


      })
    })
  }

  atualizarMedias(compID, indID, peso) {
    const pesosSoma = this.avaliacao.reduce((a, b) => a + b.peso, 0)

    // filtrar todos os resultados por comp
    const found: any = this.resultado.filter((el: any) => el.comp_id == compID)

    //tirando media deles
    const media = found.reduce((prev, curr) => (prev + curr.nota), 0) / found.length

    // select no ID do elemento da comp e atribuindo valor
    const mediaElement = this.el.nativeElement.querySelector(`#media-comp-${compID} span`)
    mediaElement.innerHTML = media


    // salva media num array
    let mediaFound: any = this.medias.find((el: any) => el.comp_id == compID)
    if (!mediaFound)
      this.medias.push({
        media: Number(media),
        comp_id: compID,
        ind_id: indID
      })
    else
      mediaFound.media = Number(media)


    // media ponderada
    let pond = this.resultado
      .reduce((prev, curr: any) => prev + (curr.nota * curr.peso), 0) / pesosSoma

    // Atualiza valor no DOM
    const mediaPondElement = this.el.nativeElement.querySelector(`#media-pond`)
    mediaPondElement.innerHTML = pond


    this.NotaFinal = pond
  }

  criarResult(e, compID, indID, peso) {
    let found: any = this.resultado.find((el: any) => el.ind_id == indID)

    if (!found)
      this.resultado.push({
        nota: Number(e.target.value),
        comp_id: compID,
        ind_id: indID,
        peso
      })
    else
      found.nota = Number(e.target.value)


    this.atualizarMedias(compID, indID, peso)
  }

  salvarResult() {
    console.warn(this.resultado)
  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

}
