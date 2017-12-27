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
    nivel_id: 0,
    cargo_id: 0,
    localidade_id: 0,
    setor_id: 0
  }
  public estag_carregado = false

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
      this.setores = res.setores.filter(setor => { return setor.id != 1 })
    })

    this.route.params.subscribe(params => {
      this.id = params.id

      this.lara.show('estagiario', this.id).subscribe(res => {
        const data = res.json()
        console.log(data)
        let avals = data.avaliacoes


        this.estagiario = data.estagiario
        this.estag_carregado = true

        if (avals.length) {
          avals.map(aval => {
            if (aval.media >= 2.8)
              aval.aprovado = "Aprovado"
            else
              aval.aprovado = "Reprovado"
          })
          this.avaliacoes = avals
        }
        else
          this.tabela_texto = 'Ainda não avaliado'
      })
    })
  }

  editar() {
    if (confirm("Deseja mesmo editar?"))
      this.lara.post(this.estagiario, 'editEstagiario/' + this.id, '/home')
  }

  deletar() {
    if (confirm("Deseja mesmo deletar?"))
      this.lara.delete(this.estagiario.id, 'estagiario/', '/home')
  }

  handleClick(e) {
    console.log(e)
  }

  ngOnInit() {
    this.lara.sessionChecker()
  }

}
