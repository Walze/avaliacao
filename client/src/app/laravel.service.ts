import { Injectable, Output, EventEmitter } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Http, Headers } from '@angular/http'
import { Router } from '@angular/router'

@Injectable()
export class LaravelService {
  private _User
  @Output() logged: EventEmitter<boolean> = new EventEmitter();

  private headers = new Headers({ 'Content-Type': 'application/json' })

  constructor(private http: Http, private cookie: CookieService, private router: Router) {

    if (!cookie.check('userSession')) {
      this.logged.next(false)
      router.navigate(['/login'])
    } else {
      this.logged.next(true)
      this.User = JSON.parse(cookie.get('userSession'))
      this.User.nome = this.User.nome.charAt(0).toUpperCase() + this.User.nome.slice(1)
    }
  }

  getFormData(then) {
    this.http.get('http://localhost:8000/form', { headers: this.headers })
      .subscribe(res => then(res.json()))
  }

  get User() {
    return this._User
  }

  set User(user) {
    this._User = user
  }

  postUser(user) {
    this.http
      .post('http://localhost:8000/cadastrar', user, { headers: this.headers })
      .subscribe(
      () => this.router.navigate(['/login']),
      error => document.querySelector('html').innerHTML = error.text()
      )
  }

  login(user) {
    this.http
      .post('http://localhost:8000/login', user, { headers: this.headers })
      .subscribe(res => {
        this.User = res.json()
        this.cookie.set('userSession', JSON.stringify(res.json()))
        this.router.navigate(['/home'])
        this.logged.next(true)
      },
      error => {
        this.logged.next(false)
        document.querySelector('html').innerHTML = error.text()
      })
  }

  loggout() {
    this.cookie.delete('userSession')
    this.router.navigate(['/login'])
    this.logged.next(false)
  }

}
