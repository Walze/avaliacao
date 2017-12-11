import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../../laravel.service';
import { ActivatedRoute } from '@angular/router';
import { Competencia } from '../competencia';
import { Indicador } from './indicador';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  id: Number
  comp: Competencia = {
    nome: '',
    descricao: ''
  }
  comps: Competencia[]
  indicadores: Indicador[]
  indicadoresOrig: Indicador[]
  ind_comps: any

  show_this: boolean = true

  constructor(private lara: LaravelService, private route: ActivatedRoute) {
    this.lara.all('ind_comp').then((res: Response) => {
      this.ind_comps = res.json()
    })

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
            this.indicadoresOrig = data.indicadores
              .sort((a, b) => {
                if (a.nome < b.nome)
                  return -1;
                if (a.nome > b.nome)
                  return 1;
                return 0;
              })

            this.addComp()
            this.showThis()
          })
      })

  }

  showThis(e = null) {
    if (e !== null)
      this.show_this = e.target.checked;

    if (this.show_this) {
      const whiteList = []

      this.ind_comps
        .map(i => {
          if (i.comp_id == this.id)
            whiteList.push(i.indicador_id)
        })
      this.indicadores = new Array


      this.indicadores = this.indicadoresOrig
        .filter(i => whiteList.includes(i.id))

    } else {
      this.indicadores = this.indicadoresOrig
    }

  }

  addComp() {
    this.indicadores = this.indicadoresOrig.map(i => {
      i.comp_id = this.ind_comps
        .filter(ic => ic.indicador_id == i.id)[0]
        .comp_id
      return i
    })
    this.indicadoresOrig = this.indicadores
  }

  alterarComp() {

  }

  handleCheck(ind, comp) {
    const indi = this.ind_comps.find(i => i.indicador_id == ind)
    indi.comp_id = comp

    this.showThis()
    this.lara
      .post({
        indicador_id: Number(ind),
        comp_id: Number(comp),
      }, 'ind_comp')
  }

  ngOnInit() {
  }

}
