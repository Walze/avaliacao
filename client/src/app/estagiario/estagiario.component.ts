import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../laravel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estagiario',
  templateUrl: './estagiario.component.html',
  styleUrls: ['./estagiario.component.css']
})
export class EstagiarioComponent implements OnInit {

  public estagiario = {
    nome: '',
    admissao: '',
    avaliado: false,
    nivel_id: 0,
    cargo_id: 0,
    localidade_id: 0,
    setor_id: 0
  }
  public localidades
  public setores
  public cargos

  id

  constructor(private lara: LaravelService, private route: ActivatedRoute) {
    this.lara.getFormData(res => {
      this.localidades = res.localidades
      this.cargos = res.cargos
      this.setores = res.setores.filter(setor => { return setor.nome != 'Ademir' })
    })

    this.route.params.subscribe(params => {
      this.id = params.id;

      this.lara.show('estagiario', params.id).subscribe(res => {
        const data = res.json();
        this.estagiario = data;
      });
    });
  }

  editarEstagiario() {
    this.lara.post(this.estagiario, 'editEstagiario/' + this.id, '/home')
  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

}
