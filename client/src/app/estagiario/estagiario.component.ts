import { Component, OnInit } from '@angular/core'
import { LaravelService } from '../laravel.service'
import { ActivatedRoute } from '@angular/router'
import { Estagiario } from './estagiario';

@Component({
  selector: 'app-estagiario',
  templateUrl: './estagiario.component.html',
  styleUrls: ['./estagiario.component.css']
})
export class EstagiarioComponent implements OnInit {

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
  private estag_carregado = false

  public avaliacoes
  public tabela_texto = 'Carregando...'

  public localidades
  public setores
  public cargos

  private id

  constructor(private lara: LaravelService, private route: ActivatedRoute) {
    this.lara.getFormData(res => {
      this.localidades = res.localidades
      this.cargos = res.cargos
      this.setores = res.setores.filter(setor => { return setor.nome != 'Ademir' })
    })

    this.route.params.subscribe(params => {
      this.id = params.id

      this.lara.show('estagiario', this.id).subscribe(res => {
        const data = res.json()

        if (!data.avaliado && typeof data.avaliado == 'number') data.avaliado = false

        console.log(data)
        this.estagiario = data.estagiario
        this.estag_carregado = true

        if (data.avaliacoes.length)
          this.avaliacoes = data.avaliacoes
        else
          this.tabela_texto = 'Ainda não avaliado'
      })
    })
  }

  editar() {
    if (confirm("Deseja mesmo fazer isso?"))
      this.lara.post(this.estagiario, 'editEstagiario/' + this.id, '/home')
  }

  deletar() {
    if (confirm("Deseja mesmo fazer isso?"))
      this.lara.delete(this.estagiario.id, 'estagiario/', '/home')
  }

  handleClick(e) {
    console.log(e)
  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

}
