import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  ids = {
    estag: 0,
    aval: 0
  }

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      console.log(params)

      this.ids.estag = params.estagiario_id
      this.ids.aval = params.aval_id

      
    })
  }

  ngOnInit() {
  }

}
