import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { LaravelService } from './laravel.service'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  user: any = false

  constructor(
    private cookie: CookieService,
    private router: Router,
    private lara: LaravelService
  ) {
    // console.log('Cookie:' + cookie.get('userSession') || 'No Cookie')

    if (cookie.check('userSession')) this.user = this.lara.User
  }

  ngOnInit() {
    this.lara.logged.subscribe(e => {
      if (e) this.user = this.lara.User
      else this.user = false
    })
  }

  sair(e) {
    e.preventDefault()
    this.lara.loggout()
  }
}
