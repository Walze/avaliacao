import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Router, ActivatedRoute, RouterEvent } from '@angular/router'
import { LaravelService } from './laravel.service'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.css'],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  user: any = false

  hideNav = false
  constructor(
    private cookie: CookieService,
    private router: Router,
    private activRoute: ActivatedRoute,
    private lara: LaravelService
  ) {
    if (cookie.check('userSession')) this.user = this.lara.User

    this.router.events.subscribe((val: RouterEvent) => {
      if (typeof val.url != 'undefined')
        if (val.url.indexOf('/imprimir') > -1) this.hideNav = true
        else this.hideNav = false
    })
  }

  ngOnInit() {
    this.lara.logged.subscribe(e => {
      if (e) this.user = this.lara.User
      else this.user = false
    })


  }

  sair(e) {
    e.preventDefault()
    this.lara.loggout(true)
  }
}
