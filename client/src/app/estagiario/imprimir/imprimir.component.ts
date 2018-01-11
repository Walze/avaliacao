import { Component, OnInit, ElementRef } from '@angular/core';
import { LaravelService } from '../../laravel.service';
import { ActivatedRoute } from '@angular/router';
import { Estagiario } from '../estagiario';
import { Competencias } from '../avaliar/AvalComps';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent {
  public carregando = true

  public avaliacao: Competencias[]

  private id

  cargo
  cargo_id

  resultadoInputs

  estag: any = false
  avalMedia

  constructor(
    private lara: LaravelService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {
    this._getRouteParamsData(() => this._atualizarResults())
    window['dis'] = this
  }

  private _atualizarResults() {
    const selects = this.el.nativeElement.querySelectorAll('.form-control.nota')
    this.resultadoInputs.map((resInput: any) => {
      selects.forEach(select => {
        if (select.id.split('-')[1] == resInput.ind_id)
          select.value = resInput.nota
      })
    })
  }

  private _getRouteParamsData(done) {
    this.route.params.subscribe(params => {
      this.cargo_id = params.cargo
      this.id = params.id

      this.lara.show('avaliacao', this.cargo_id).subscribe(res => {
        this.lara.getFormData(then => {
          this.avaliacao = res.json()
          this.cargo = then.cargos.find(cargo => cargo.id == this.cargo_id).nome

          if ('aval' in params) {
            this.lara.show('estagiario', this.id).subscribe(res => {
              this.estag = res.json().estagiario
              this.avalMedia = res.json().avaliacoes.find(el => el.id == params.aval)

              this.avalMedia.aprovado = this.avalMedia.media >= 2.8 ? 'Aprovado' : 'Reprovado'

              if (this.avalMedia.media >= 2.8) {
                this.avalMedia.texto = `Aprovado para a bolsa auxílio progressiva nível ${this.estag.nivel_id}`
              } else {
                this.avalMedia.texto = `Reprovado`
              }
              this.lara.show('notas', params.aval).subscribe(res => {
                this.resultadoInputs = res.json()
                this.carregando = false
                done()
              })
            })
          } else this.carregando = false
        })
      })
    })
  }
}
