import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../../laravel.service';
import { ActivatedRoute } from '@angular/router';
import { Competencia } from '../competencia';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  id
  comp: Competencia = {
    nome: '',
    descricao: ''
  }

  indicadores

  constructor(private lara: LaravelService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params.id

      this.lara.getIndsComp(this.id).then(res => {
        console.log(res)
        this.comp = res.competencia
        this.indicadores = res.indicadores
      })
    })
  }

  alterarComp() {

  }

  ngOnInit() {
  }

}
