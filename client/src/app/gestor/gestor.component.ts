import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../laravel.service';
import { Gestor } from './gestor';
import { Competencia } from './competencia';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.css']
})
export class GestorComponent implements OnInit {

  public gestor: Gestor = {
    nome: '',
    email: '',
    localidade_id: 0,
    setor_id: 0,
  }

  public cores = [
    '#BF4A67',
    '#3B3C3D',
    '#5991B1',
    '#48569E',
    '#44B39D',
    '#8B4D93',
    '#54ACD2',
    '#E6567A',
    '#47C9AF',
    '#5F7187',
  ]

  public localidades
  public setores

  public competencias: Competencia[]
  public indicadores

  public novaComp: Competencia = {
    nome: '',
    descricao: ''
  }

  constructor(private lara: LaravelService) {

    this.lara.getFormData(res => {
      this.localidades = res.localidades
      this.setores = res.setores.filter(setor => { return setor.nome != 'Ademir' })
    })

    this.lara.getComps()
      .then((res: Response) => {
        let data: any = res.json()
        this.competencias = data.competencias
        this.indicadores = data.indicadores
      })
  }

  alterar() {
    console.log(this.gestor)
  }

  criarComp() {

    new Promise(() => {
      this.competencias.push(this.novaComp)
      this.lara.post(this.novaComp, 'comp', '/gestor')
    }).then(() => {
      this.novaComp.nome = ''
      this.novaComp.descricao = ''
    })


  }


  ngOnInit() {
    this.gestor = this.lara.User
  }


}
