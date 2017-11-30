import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../laravel.service';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
})
export class CadUsuarioComponent implements OnInit {

  public usuario = {
    nome: '',
    email: '',
    senha: '',
    localidade_id: 0,
    setor_id: 0
  }

  public localidades
  public setores

  constructor(private lara: LaravelService) {

    this.lara.getFormData(res => {
      this.localidades = res.localidades
      this.setores = res.setores.filter(setor => { return setor.nome != 'Ademir' })
    })

  }

  cadastrar() {
    const errors = []

    for (let prop in this.usuario)
      if (this.usuario[prop] == '')
        errors.push(prop)


    if (!errors.length)
      this.lara.postUser(this.usuario)
    else
      alert(`Os seguintes campos estão vazios: ${errors.join(', ')}.`)
  }

  ngOnInit() {
  }

}
