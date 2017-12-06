import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../laravel.service';
import { Gestor } from './gestor';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
})
export class GestorComponent implements OnInit {

  public gestor: Gestor = {
    nome: '',
    email: '',
    localidade_id: 0,
    setor_id: 0,
  }

  public localidades
  public setores

  constructor(private lara: LaravelService) {

    this.lara.getFormData(res => {
      this.localidades = res.localidades
      this.setores = res.setores.filter(setor => { return setor.nome != 'Ademir' })
    })
  }

  alterar() {
    console.log(this.gestor)
  }


  ngOnInit() {
    this.gestor = this.lara.User
  }


}
