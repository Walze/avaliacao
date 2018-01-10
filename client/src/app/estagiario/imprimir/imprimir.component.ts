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

  constructor(
    private lara: LaravelService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {
    this._getRouteParamsData()
  }

  private _getRouteParamsData() {
    this.route.params.subscribe(params => {
      this.id = params.cargo
      this.lara.show('avaliacao', this.id).subscribe(res => {
        this.lara.getFormData(then => {
          this.avaliacao = res.json()

          this.cargo = then.cargos.find(cargo => cargo.id == this.id).nome
          this.carregando = false
        })
      })
    })
  }
}
