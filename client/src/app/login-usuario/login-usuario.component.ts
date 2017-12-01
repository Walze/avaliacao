import { Component, OnInit } from '@angular/core';
import { LaravelService } from '../laravel.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  private usuario = {}

  constructor(private lara: LaravelService, private cookie: CookieService, private router: Router) {
    if (cookie.check('userSession')) {
      this.router.navigate(['/home'])
    }
  }

  logar() {
    this.lara.login(this.usuario)
  }

  ngOnInit() {
  }

}
