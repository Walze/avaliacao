import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../laravel.service';

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

  constructor(private lara: LaravelService) {
    this.lara.getFormData(res => {
      this.localidades = res.localidades
      this.cargos = res.cargos
      this.setores = res.setores.filter(setor => { return setor.nome != 'Ademir' })
    })
  }

  editarEstagiario() {
    this.lara.post(this.estagiario, 'estagiario', '/home')
  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

}
