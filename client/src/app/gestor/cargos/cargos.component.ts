import { Component } from '@angular/core';
import { LaravelService } from '../../laravel.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})

export class CargosComponent {
  public loading = true

  public cargos

  public newCargo: object = {
    nome: '',
    duracao_meses: 0
  }

  constructor(private lara: LaravelService) {
    this.lara.all('cargos').then((e: any) => {
      this.cargos = e.json()

      this.loading = false
    })
  }
  
  post() {
    console.log(this.newCargo)
    /*this.lara.post(this.newCargo, 'cargo', '', res => {
      alert('Salvo')
      window.location.reload()
    })*/
  }

  put(cargo, input, input2) {
    cargo.nome = input
    cargo.duracao_meses = input2

    this.lara.post(cargo, 'cargoEdit/' + cargo.id, '', res => {
      alert('Salvo')
    })
  }

  delete(id) {
    this.lara.post(null, 'cargoDelete/' + id, '', res => {
      alert('Deletado')
      window.location.reload()
    })
  }
}
