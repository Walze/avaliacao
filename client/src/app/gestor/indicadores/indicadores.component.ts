import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../../laravel.service';
import { ActivatedRoute } from '@angular/router';
import { Competencia } from '../competencia';
import { Event } from '_debugger';

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

  comps: Competencia[]

  indicadores

  ind_comps: Array<object> = []

  constructor(private lara: LaravelService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params.id

      this.lara.getIndsComp(this.id).then((res: Response) => {
        let data: any = res.json()
        this.comp = data.competencia
        this.comps = data.comps
        console.log(this.comps)
        this.indicadores = data.indicadores.sort((a, b) => {
          if (a.nome < b.nome)
            return -1;
          if (a.nome > b.nome)
            return 1;
          return 0;
        })
      })
    })

    window.comps = this.ind_comps
  }

  alterarComp() {

  }

  handleCheck(ind, e) {
    if (e.target.checked) {
      this.ind_comps.push({
        ind_id: ind,
        comp_id: Number(e.target.value),
      })
    }
  }

  ngOnInit() {
  }

}
