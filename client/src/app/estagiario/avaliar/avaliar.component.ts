import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../../laravel.service';
import { ActivatedRoute } from '@angular/router';
import { Estagiario } from '../estagiario';
import { Avaliacao } from './avaliacao';

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

  public avaliacao: Avaliacao

  private id

  constructor(private lara: LaravelService, private route: ActivatedRoute) {

    this._getRouteParams()
  }

  private _getRouteParams() {
    this.route.params.subscribe(params => {
      this.id = params.id

      this.lara.show('estagiario', this.id).subscribe(res => {
        const data = res.json()
        if (!data.avaliado && typeof data.avaliado == 'number') data.avaliado = false
        this.estagiario = data.estagiario

        this.lara.show('avaliacao', this.estagiario.cargo_id).subscribe(res => {
          this.carregando = false
          this.avaliacao = res.json()
        })


      })
    })
  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

}
