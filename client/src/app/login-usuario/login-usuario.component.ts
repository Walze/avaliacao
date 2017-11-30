import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../laravel.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  private usuario = {}

  constructor(private lara: LaravelService) { }

  logar() {
    this.lara.login(this.usuario)
  }

  ngOnInit() {
  }

}
