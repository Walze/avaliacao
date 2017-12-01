import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { LaravelService } from './laravel.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  logged = false

  private User

  constructor(
    private cookie: CookieService,
    private router: Router,
    private lara: LaravelService,
    private cdRef: ChangeDetectorRef
  ) {
    console.log('Cookies', cookie.get('userSession'))

    if (cookie.check('userSession')) {
      this.logged = true
      this.User = this.lara.User
    }
  }


  ngOnInit() {
    this.lara.logged.subscribe(e => {
      this.logged = e
      if (e)
        this.User = this.lara.User
    })
  }

  sair(e) {
    e.preventDefault()
    this.logged = false
    this.lara.loggout()
  }
}
