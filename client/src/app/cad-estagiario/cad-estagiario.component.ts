import { Component, OnInit } from '@angular/core'
import { LaravelService } from '../laravel.service'

@Component({
  selector: 'app-cad-estagiario',
  templateUrl: './cad-estagiario.component.html',
  styleUrls: ['./cad-estagiario.component.css']
})
export class CadEstagiarioComponent implements OnInit {

  public estagiario = {
    nome: '',
    admissao: '',
    nivel: 0,
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

  cadEstagiario() {
    this.lara.post(this.estagiario, 'cadastrarEstagiario', '/home')
  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

}
